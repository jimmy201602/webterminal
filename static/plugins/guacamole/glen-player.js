/**
 * The controller for the root of the Glyptodon Enterprise session player web
 * application.
 */
angular.module('app').controller('appController', ['$scope', function appController($scope) {

    /**
     * The currently selected recording, or null if no recording is selected.
     *
     * @type {Blob}
     */
    $scope.selectedRecording = null;

    /**
     * Whether the session recording player within the application is currently
     * playing a recording.
     *
     * @type {Boolean}
     */
    $scope.playing = false;

    /**
     * Whether an error prevented the requested recording from being loaded.
     *
     * @type {Boolean}
     */
    $scope.error = false;

    // Clear any errors if a new recording is loading
    $scope.$on('glenPlayerLoading', function loadingStarted() {
        $scope.error = false;
    });

    // Update error status if a failure occurs
    $scope.$on('glenPlayerError', function recordingError() {
        $scope.selectedRecording = null;
        $scope.error = true;
    });

    // Update playing/paused status when playback starts
    $scope.$on('glenPlayerPlay', function playbackStarted() {
        $scope.playing = true;
    });

    // Update playing/paused status when playback stops
    $scope.$on('glenPlayerPause', function playbackStopped() {
        $scope.playing = false;
    });

}]);


/**
 * Module for the Glyptodon Enterprise session recording player web application.
 */
angular.module('app', [
    'file',
    'player',
    'templates-main'
]);

/**
 * Directive which allows the user to manually select a file.
 */
angular.module('file').directive('glenFileChooser', [function glenFileChooser() {

    var config = {
        restrict : 'E',
        templateUrl : 'modules/file/templates/fileChooser.html',
        transclude : true
    };

    config.scope = {

        /**
         * The File object representing the file chosen by the user.
         *
         * @type {File}
         */
        file : '='

    };

    config.controller = ['$scope','$http', '$element', function glenFileChooserController($scope, $http) {
	let params = new URL(window.location.href).searchParams;
        // get recording file from server
        $http.get("/media/"+params.get('media')).then( function(data)  {
            var file = new File([data.data], params.get('media'));
            $scope.file=file;
        });

    }];

    return config;

}]);

/**
 * Module for accessing files which have been explicitly selected by the user.
 */
angular.module('file', [
    'templates-main'
]);

/**
 * Directive which plays back Glyptodon Enterprise / Apache Guacamole session
 * recordings. This directive emits the following events based on state changes
 * within the current recording:
 *
 *     "glenPlayerLoading":
 *         A new recording has been selected and is now loading.
 *
 *     "glenPlayerError":
 *         The current recording cannot be loaded or played due to an error.
 *         The recording may be unreadable (lack of permissions) or corrupt
 *         (protocol error).
 *
 *     "glenPlayerProgress"
 *         Additional data has been loaded for the current recording and the
 *         recording's duration has changed. The new duration in milliseconds
 *         and the number of bytes loaded so far are passed to the event.
 *
 *     "glenPlayerLoaded"
 *         The current recording has finished loading.
 *
 *     "glenPlayerPlay"
 *         Playback of the current recording has started or has been resumed.
 *
 *     "glenPlayerPause"
 *         Playback of the current recording has been paused.
 *
 *     "glenPlayerSeek"
 *         The playback position of the current recording has changed. The new
 *         position within the recording is passed to the event as the number
 *         of milliseconds since the start of the recording.
 */
angular.module('player').directive('glenPlayer', ['$injector', function glenPlayer($injector) {

    // Required types
    var SessionRecording = $injector.get('SessionRecording');

    var config = {
        restrict : 'E',
        templateUrl : 'modules/player/templates/player.html'
    };

    config.scope = {

        /**
         * A Blob containing the Guacamole session recording to load.
         *
         * @type {Blob}
         */
        blob : '='

    };

    config.controller = ['$scope', '$element', '$injector',
        function glenPlayerController($scope) {

        /**
         * SessionRecording instance to be used to playback the session
         * recording given via $scope.src. If the recording has not yet been
         * loaded, this will be null.
         *
         * @type {SessionRecording}
         */
        $scope.recording = null;

        /**
         * The current playback position, in milliseconds. If a seek request is
         * in progress, this will be the desired playback position of the
         * pending request.
         *
         * @type {Number}
         */
        $scope.playbackPosition = 0;

        /**
         * Human-readable text describing the operation currently running in
         * the background, or null if no such operation is running.
         *
         * @type {String}
         */
        $scope.operationText = null;

        /**
         * The current progress toward completion of the operation running in
         * the background, where 0 represents no progress and 1 represents full
         * completion. If no such operation is running, this value has no
         * meaning.
         *
         * @type {Number}
         */
        $scope.operationProgress = 0;

        /**
         * The position within the recording of the current seek operation, in
         * milliseconds. If a seek request is not in progress, this will be
         * null.
         *
         * @type {Number}
         */
        $scope.seekPosition = null;

        /**
         * Whether a seek request is currently in progress. A seek request is
         * in progress if the user is attempting to change the current playback
         * position (the user is manipulating the playback position slider).
         *
         * @type {Boolean}
         */
        var pendingSeekRequest = false;

        /**
         * Whether playback should be resumed (play() should be invoked on the
         * recording) once the current seek request is complete. This value
         * only has meaning if a seek request is pending.
         *
         * @type {Boolean}
         */
        var resumeAfterSeekRequest = false;

        /**
         * Formats the given number as a decimal string, adding leading zeroes
         * such that the string contains at least two digits. The given number
         * MUST NOT be negative.
         *
         * @param {Number} value
         *     The number to format.
         *
         * @returns {String}
         *     The decimal string representation of the given value, padded
         *     with leading zeroes up to a minimum length of two digits.
         */
        var zeroPad = function zeroPad(value) {
            return value > 9 ? value : '0' + value;
        };

        /**
         * Formats the given quantity of milliseconds as days, hours, minutes,
         * and whole seconds, separated by colons (DD:HH:MM:SS). Hours are
         * included only if the quantity is at least one hour, and days are
         * included only if the quantity is at least one day. All included
         * groups are zero-padded to two digits with the exception of the
         * left-most group.
         *
         * @param {Number} value
         *     The time to format, in milliseconds.
         *
         * @returns {String}
         *     The given quantity of milliseconds formatted as "DD:HH:MM:SS".
         */
        $scope.formatTime = function formatTime(value) {

            // Round provided value down to whole seconds
            value = Math.floor((value || 0) / 1000);

            // Separate seconds into logical groups of seconds, minutes,
            // hours, etc.
            var groups = [ 1, 24, 60, 60 ];
            for (var i = groups.length - 1; i >= 0; i--) {
                var placeValue = groups[i];
                groups[i] = zeroPad(value % placeValue);
                value = Math.floor(value / placeValue);
            }

            // Format groups separated by colons, stripping leading zeroes and
            // groups which are entirely zeroes, leaving at least minutes and
            // seconds
            var formatted = groups.join(':');
            return /^[0:]*([0-9]{1,2}(?::[0-9]{2})+)$/.exec(formatted)[1];

        };

        /**
         * Pauses playback and decouples the position slider from current
         * playback position, allowing the user to manipulate the slider
         * without interference. Playback state will be resumed following a
         * call to commitSeekRequest().
         */
        $scope.beginSeekRequest = function beginSeekRequest() {

            // If a recording is present, pause and save state if we haven't
            // already done so
            if ($scope.recording && !pendingSeekRequest) {
                resumeAfterSeekRequest = $scope.recording.isPlaying();
                $scope.recording.pause();
            }

            // Flag seek request as in progress
            pendingSeekRequest = true;

        };

        /**
         * Restores the playback state at the time beginSeekRequest() was
         * called and resumes coupling between the playback position slider and
         * actual playback position.
         */
        $scope.commitSeekRequest = function commitSeekRequest() {

            // If a recording is present and there is an active seek request,
            // restore the playback state at the time that request began and
            // begin seeking to the requested position
            if ($scope.recording && pendingSeekRequest) {

                $scope.seekPosition = null;
                $scope.operationText = 'Seeking to the requested position. Please wait...';
                $scope.operationProgress = 0;

                // Cancel seek when requested, updating playback position if
                // that position changed
                $scope.cancelOperation = function abortSeek() {
                    $scope.recording.cancel();
                    $scope.playbackPosition = $scope.seekPosition || $scope.playbackPosition;
                };

                resumeAfterSeekRequest && $scope.recording.play();
                $scope.recording.seek($scope.playbackPosition, function seekComplete() {
                    $scope.operationText = null;
                    $scope.$evalAsync();
                });

            }

            // Flag seek request as completed
            pendingSeekRequest = false;

        };

        /**
         * Toggles the current playback state. If playback is currently paused,
         * playback is resumed. If playback is currently active, playback is
         * paused. If no recording has been loaded, this function has no
         * effect.
         */
        $scope.togglePlayback = function togglePlayback() {
            if ($scope.recording) {
                if ($scope.recording.isPlaying())
                    $scope.recording.pause();
                else
                    $scope.recording.play();
            }
        };

        // Automatically load the requested session recording
        $scope.$watch('blob', function blobChanged(blob) {

            // Reset position and seek state
            pendingSeekRequest = false;
            $scope.playbackPosition = 0;

            // Stop loading the current recording, if any
            if ($scope.recording) {
                $scope.recording.pause();
                $scope.recording.abort();
            }

            // If no recording is provided, reset to empty
            if (!blob)
                $scope.recording = null;

            // Otherwise, begin loading the provided recording
            else {

                $scope.recording = new SessionRecording(blob);

                // Notify listeners when the recording is completely loaded
                $scope.recording.onload = function recordingLoaded() {
                    $scope.operationText = null;
                    $scope.$emit('glenPlayerLoaded');
                    $scope.$evalAsync();
                };

                // Notify listeners if an error occurs
                $scope.recording.onerror = function recordingFailed(message) {
                    $scope.operationText = null;
                    $scope.$emit('glenPlayerError', message);
                    $scope.$evalAsync();
                };

                // Notify listeners when additional recording data has been
                // loaded
                $scope.recording.onprogress = function recordingLoadProgressed(duration, current) {
                    $scope.operationProgress = current / blob.size;
                    $scope.$emit('glenPlayerProgress', duration, current);
                    $scope.$evalAsync();
                };

                // Notify listeners when playback has started/resumed
                $scope.recording.onplay = function playbackStarted() {
                    $scope.$emit('glenPlayerPlay');
                    $scope.$evalAsync();
                };

                // Notify listeners when playback has paused
                $scope.recording.onpause = function playbackPaused() {
                    $scope.$emit('glenPlayerPause');
                    $scope.$evalAsync();
                };

                // Notify listeners when current position within the recording
                // has changed
                $scope.recording.onseek = function positionChanged(position, current, total) {

                    // Update current playback position while playing
                    if ($scope.recording.isPlaying())
                        $scope.playbackPosition = position;

                    // Update seek progress while seeking
                    else {
                        $scope.seekPosition = position;
                        $scope.operationProgress = current / total;
                    }

                    $scope.$emit('glenPlayerSeek', position);
                    $scope.$evalAsync();

                };

                $scope.operationText = 'Your recording is now being loaded. Please wait...';
                $scope.operationProgress = 0;

                $scope.cancelOperation = function abortLoad() {
                    $scope.recording.abort();
                    $scope.operationText = null;
                };

                $scope.$emit('glenPlayerLoading');

            }

        });

    }];

    return config;

}]);


/**
 * Directive which contains a given Guacamole.Display, automatically scaling
 * the display to fit available space.
 */
angular.module('player').directive('glenPlayerDisplay', [function glenPlayerDisplay() {

    var config = {
        restrict : 'E',
        templateUrl : 'modules/player/templates/playerDisplay.html'
    };

    config.scope = {

        /**
         * The Guacamole.Display instance which should be displayed within the
         * directive.
         *
         * @type {Guacamole.Display}
         */
        display : '='

    };

    config.controller = ['$scope', '$element', function glenPlayerDisplayController($scope, $element) {

        /**
         * The root element of this instance of the glenPlayerDisplay
         * directive.
         *
         * @type {Element}
         */
        var element = $element[0];

        /**
         * The element which serves as a container for the root element of the
         * Guacamole.Display assigned to $scope.display.
         *
         * @type {HTMLDivElement}
         */
        var container = $element.find('.glen-player-display-container')[0];

        /**
         * The object element contained within this directive which functions
         * as a source of resize events tied to the size of the available
         * space.
         *
         * @type {HTMLObjectElement}
         */
        var resizeSensor = $element.find('.glen-resize-sensor')[0];

        /**
         * Rescales the Guacamole.Display currently assigned to $scope.display
         * such that it exactly fits within this directive's available space.
         * If no display is currently assigned or the assigned display is not
         * at least 1x1 pixels in size, this function has no effect.
         */
        var fitDisplay = function fitDisplay() {

            // Ignore if no display is yet present
            if (!$scope.display)
                return;

            var displayWidth = $scope.display.getWidth();
            var displayHeight = $scope.display.getHeight();

            // Ignore if the provided display is not at least 1x1 pixels
            if (!displayWidth || !displayHeight)
                return;

            // Fit display within available space
            $scope.display.scale(Math.min(element.offsetWidth / displayWidth,
                element.offsetHeight / displayHeight));

        };

        // Automatically add/remove the Guacamole.Display as $scope.display is
        // updated
        $scope.$watch('display', function displayChanged(display, oldDisplay) {

            // Clear out old display, if any
            if (oldDisplay) {
                container.innerHTML = '';
                oldDisplay.onresize = null;
            }

            // If a new display is provided, add it to the container, keeping
            // its scale in sync with changes to available space and display
            // size
            if (display) {
                container.appendChild(display.getElement());
                display.onresize = fitDisplay;
                fitDisplay();
            }

        });

        // Rescale display whenever the resize sensor detects that the
        // available space has changed
        resizeSensor.onload = function resizeSensorLoaded() {
            resizeSensor.contentDocument.defaultView.addEventListener('resize', fitDisplay);
            fitDisplay();
        };

    }];

    return config;

}]);


/**
 * Module for the Glyptodon Enterprise session recording player.
 */
angular.module('player', [
    'templates-main'
]);


/**
 * Directive which displays an indicator showing the current progress of an
 * arbitrary operation.
 */
angular.module('player').directive('glenPlayerProgressIndicator', [function glenPlayerProgressIndicator() {

    var config = {
        restrict : 'E',
        templateUrl : 'modules/player/templates/progressIndicator.html'
    };

    config.scope = {

        /**
         * A value between 0 and 1 inclusive which indicates current progress,
         * where 0 represents no progress and 1 represents finished.
         *
         * @type {Number}
         */
        progress : '='

    };

    config.controller = ['$scope', function glenPlayerProgressIndicatorController($scope) {

        /**
         * The current progress of the operation as a percentage. This value is
         * automatically updated as $scope.progress changes.
         *
         * @type {Number}
         */
        $scope.percentage = 0;

        /**
         * The CSS transform which should be applied to the bar portion of the
         * progress indicator. This value is automatically updated as
         * $scope.progress changes.
         *
         * @type {String}
         */
        $scope.barTransform = null;

        // Keep percentage and bar transform up-to-date with changes to
        // progress value
        $scope.$watch('progress', function progressChanged(progress) {
            progress = progress || 0;
            $scope.percentage = Math.floor(progress * 100);
            $scope.barTransform = 'rotate(' + (360 * progress - 45) + 'deg)';
        });

    }];

    return config;

}]);
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 * Defines the SessionRecording class.
 */
angular.module('player').factory('SessionRecording', [function defineSessionRecording() {

    /**
     * A recording of a Guacamole session. Given a Blob, the SessionRecording
     * automatically parses Guacamole instructions within the Blob as it plays
     * back the recording. Playback of the recording may be controlled through
     * function calls to the SessionRecording. Parsing of the contents of the
     * Blob will begin immediately and automatically after this constructor is
     * invoked.
     *
     * @constructor
     * @param {Blob} recordingBlob
     *     The Blob from which the instructions of the recording should
     *     be read.
     */
    var SessionRecording = function SessionRecording(recordingBlob) {

        /**
         * Reference to this SessionRecording.
         *
         * @private
         * @type {SessionRecording}
         */
        var recording = this;

        /**
         * The number of bytes that this SessionRecording should attempt to
         * read from the given blob in each read operation. Larger blocks will
         * generally read the blob more quickly, but may result in excessive
         * time being spent within the parser, making the page unresponsive
         * while the recording is loading.
         *
         * @private
         * @constant
         * @type {Number}
         */
        var BLOCK_SIZE = 262144;

        /**
         * The minimum number of characters which must have been read between
         * keyframes.
         *
         * @private
         * @constant
         * @type {Number}
         */
        var KEYFRAME_CHAR_INTERVAL = 16384;

        /**
         * The minimum number of milliseconds which must elapse between keyframes.
         *
         * @private
         * @constant
         * @type {Number}
         */
        var KEYFRAME_TIME_INTERVAL = 5000;

        /**
         * All frames parsed from the provided blob.
         *
         * @private
         * @type {SessionRecording._Frame[]}
         */
        var frames = [];

        /**
         * The timestamp of the last frame which was flagged for use as a keyframe.
         * If no timestamp has yet been flagged, this will be 0.
         *
         * @private
         * @type {Number}
         */
        var lastKeyframe = 0;

        /**
         * Tunnel which feeds arbitrary instructions to the client used by this
         * SessionRecording for playback of the session recording.
         *
         * @private
         * @type {SessionRecording._PlaybackTunnel}
         */
        var playbackTunnel = new SessionRecording._PlaybackTunnel();

        /**
         * Guacamole.Client instance used for visible playback of the session
         * recording.
         *
         * @private
         * @type {Guacamole.Client}
         */
        var playbackClient = new Guacamole.Client(playbackTunnel);

        /**
         * The current frame rendered within the playback client. If no frame is
         * yet rendered, this will be -1.
         *
         * @private
         * @type {Number}
         */
        var currentFrame = -1;

        /**
         * The timestamp of the frame when playback began, in milliseconds. If
         * playback is not in progress, this will be null.
         *
         * @private
         * @type {Number}
         */
        var startVideoTimestamp = null;

        /**
         * The real-world timestamp when playback began, in milliseconds. If
         * playback is not in progress, this will be null.
         *
         * @private
         * @type {Number}
         */
        var startRealTimestamp = null;

        /**
         * An object containing a single "aborted" property which is set to
         * true if the in-progress seek operation should be aborted. If no seek
         * operation is in progress, this will be null.
         *
         * @private
         * @type {Object}
         */
        var activeSeek = null;

        /**
         * The byte offset within the recording blob of the first character of
         * the first instruction of the current frame. Here, "current frame"
         * refers to the frame currently being parsed when the provided
         * recording is initially loading. If the recording is not being
         * loaded, this value has no meaning.
         *
         * @private
         * @type {Number}
         */
        var frameStart = 0;

        /**
         * The byte offset within the recording blob of the character which
         * follows the last character of the most recently parsed instruction
         * of the current frame. Here, "current frame" refers to the frame
         * currently being parsed when the provided recording is initially
         * loading. If the recording is not being loaded, this value has no
         * meaning.
         *
         * @private
         * @type {Number}
         */
        var frameEnd = 0;

        /**
         * Whether the initial loading process has been aborted. If the loading
         * process has been aborted, no further blocks of data should be read
         * from the recording.
         *
         * @private
         * @type {Boolean}
         */
        var aborted = false;

        /**
         * The function to invoke when the seek operation initiated by a call
         * to seek() is cancelled or successfully completed. If no seek
         * operation is in progress, this will be null.
         *
         * @private
         * @type {Function}
         */
        var seekCallback = null;

        /**
         * Parses all Guacamole instructions within the given blob, invoking
         * the provided instruction callback for each such instruction. Once
         * the end of the blob has been reached (no instructions remain to be
         * parsed), the provided completion callback is invoked. If a parse
         * error prevents reading instructions from the blob, the onerror
         * callback of the SessionRecording is invoked, and no further data is
         * handled within the blob.
         *
         * @private
         * @param {Blob} blob
         *     The blob to parse Guacamole instructions from.
         *
         * @param {Function} [instructionCallback]
         *     The callback to invoke for each Guacamole instruction read from
         *     the given blob. This function must accept the same arguments
         *     as the oninstruction handler of Guacamole.Parser.
         *
         * @param {Function} [completionCallback]
         *     The callback to invoke once all instructions have been read from
         *     the given blob.
         */
        var parseBlob = function parseBlob(blob, instructionCallback, completionCallback) {

            // Do not read any further blocks if loading has been aborted
            if (aborted && blob === recordingBlob)
                return;

            // Prepare a parser to handle all instruction data within the blob,
            // automatically invoking the provided instruction callback for all
            // parsed instructions
            var parser = new Guacamole.Parser();
            parser.oninstruction = instructionCallback;

            var offset = 0;
            var reader = new FileReader();

            /**
             * Reads the block of data at offset bytes within the blob. If no
             * such block exists, then the completion callback provided to
             * parseBlob() is invoked as all data has been read.
             *
             * @private
             */
            var readNextBlock = function readNextBlock() {

                // Do not read any further blocks if loading has been aborted
                if (aborted && blob === recordingBlob)
                    return;

                // Parse all instructions within the block, invoking the
                // onerror handler if a parse error occurs
                if (reader.readyState === 2 /* DONE */) {
                    try {
                        parser.receive(reader.result);
                    }
                    catch (parseError) {
                        if (recording.onerror) {
                            recording.onerror(parseError.message);
                        }
                        return;
                    }
                }

                // If no data remains, the read operation is complete and no
                // further blocks need to be read
                if (offset >= blob.size) {
                    if (completionCallback)
                        completionCallback();
                }

                // Otherwise, read the next block
                else {
                    var block = blob.slice(offset, offset + BLOCK_SIZE);
                    offset += block.size;
                    reader.readAsText(block);
                }

            };

            // Read blocks until the end of the given blob is reached
            reader.onload = readNextBlock;
            readNextBlock();

        };

        /**
         * Calculates the size of the given Guacamole instruction element, in
         * Unicode characters. The size returned includes the characters which
         * make up the length, the "." separator between the length and the
         * element itself, and the "," or ";" terminator which follows the
         * element.
         *
         * @private
         * @param {String} value
         *     The value of the element which has already been parsed (lacks
         *     the initial length, "." separator, and "," or ";" terminator).
         *
         * @returns {Number}
         *     The number of Unicode characters which would make up the given
         *     element within a Guacamole instruction.
         */
        var getElementSize = function getElementSize(value) {

            var valueLength = value.length;

            // Calculate base size, assuming at least one digit, the "."
            // separator, and the "," or ";" terminator
            var protocolSize = valueLength + 3;

            // Add one character for each additional digit that would occur
            // in the element length prefix
            while (valueLength >= 10) {
                protocolSize++;
                valueLength = Math.floor(valueLength / 10);
            }

            return protocolSize;

        };

        // Start playback client connected
        playbackClient.connect();

        // Hide cursor unless mouse position is received
        playbackClient.getDisplay().showCursor(false);

        // Read instructions from provided blob, extracting each frame
        parseBlob(recordingBlob, function handleInstruction(opcode, args) {

            // Advance end of frame by overall length of parsed instruction
            frameEnd += getElementSize(opcode);
            for (var i = 0; i < args.length; i++)
                frameEnd += getElementSize(args[i]);

            // Once a sync is received, store all instructions since the last
            // frame as a new frame
            if (opcode === 'sync') {

                // Parse frame timestamp from sync instruction
                var timestamp = parseInt(args[0]);

                // Add a new frame containing the instructions read since last frame
                var frame = new SessionRecording._Frame(timestamp, frameStart, frameEnd);
                frames.push(frame);
                frameStart = frameEnd;

                // This frame should eventually become a keyframe if enough data
                // has been processed and enough recording time has elapsed, or if
                // this is the absolute first frame
                if (frames.length === 1 || (frameEnd - frames[lastKeyframe].start >= KEYFRAME_CHAR_INTERVAL
                        && timestamp - frames[lastKeyframe].timestamp >= KEYFRAME_TIME_INTERVAL)) {
                    frame.keyframe = true;
                    lastKeyframe = frames.length - 1;
                }

                // Notify that additional content is available
                if (recording.onprogress)
                    recording.onprogress(recording.getDuration(), frameEnd);

            }

        }, function recordingLoaded() {

            // Notify that recording has fully loaded
            if (recording.onload)
                recording.onload();

        });

        /**
         * Converts the given absolute timestamp to a timestamp which is relative
         * to the first frame in the recording.
         *
         * @private
         * @param {Number} timestamp
         *     The timestamp to convert to a relative timestamp.
         *
         * @returns {Number}
         *     The difference in milliseconds between the given timestamp and the
         *     first frame of the recording, or zero if no frames yet exist.
         */
        var toRelativeTimestamp = function toRelativeTimestamp(timestamp) {

            // If no frames yet exist, all timestamps are zero
            if (frames.length === 0)
                return 0;

            // Calculate timestamp relative to first frame
            return timestamp - frames[0].timestamp;

        };

        /**
         * Searches through the given region of frames for the frame having a
         * relative timestamp closest to the timestamp given.
         *
         * @private
         * @param {Number} minIndex
         *     The index of the first frame in the region (the frame having the
         *     smallest timestamp).
         *
         * @param {Number} maxIndex
         *     The index of the last frame in the region (the frame having the
         *     largest timestamp).
         *
         * @param {Number} timestamp
         *     The relative timestamp to search for, where zero denotes the first
         *     frame in the recording.
         *
         * @returns {Number}
         *     The index of the frame having a relative timestamp closest to the
         *     given value.
         */
        var findFrame = function findFrame(minIndex, maxIndex, timestamp) {

            // Do not search if the region contains only one element
            if (minIndex === maxIndex)
                return minIndex;

            // Split search region into two halves
            var midIndex = Math.floor((minIndex + maxIndex) / 2);
            var midTimestamp = toRelativeTimestamp(frames[midIndex].timestamp);

            // If timestamp is within lesser half, search again within that half
            if (timestamp < midTimestamp && midIndex > minIndex)
                return findFrame(minIndex, midIndex - 1, timestamp);

            // If timestamp is within greater half, search again within that half
            if (timestamp > midTimestamp && midIndex < maxIndex)
                return findFrame(midIndex + 1, maxIndex, timestamp);

            // Otherwise, we lucked out and found a frame with exactly the
            // desired timestamp
            return midIndex;

        };

        /**
         * Replays the instructions associated with the given frame, sending those
         * instructions to the playback client.
         *
         * @private
         * @param {Number} index
         *     The index of the frame within the frames array which should be
         *     replayed.
         *
         * @param {Function} callback
         *     The callback to invoke once replay of the frame has completed.
         */
        var replayFrame = function replayFrame(index, callback) {

            var frame = frames[index];

            // Replay all instructions within the retrieved frame
            parseBlob(recordingBlob.slice(frame.start, frame.end), function handleInstruction(opcode, args) {
                playbackTunnel.receiveInstruction(opcode, args);
            }, function replayCompleted() {

                // Store client state if frame is flagged as a keyframe
                if (frame.keyframe && !frame.clientState) {
                    playbackClient.exportState(function storeClientState(state) {
                        frame.clientState = state;
                    });
                }

                // Update state to correctly represent the current frame
                currentFrame = index;

                if (callback)
                    callback();

            });

        };

        /**
         * Moves the playback position to the given frame, resetting the state of
         * the playback client and replaying frames as necessary. The seek
         * operation will proceed asynchronously. If a seek operation is already in
         * progress, that seek is first aborted. The progress of the seek operation
         * can be observed through the onseek handler and the provided callback.
         *
         * @private
         * @param {Number} index
         *     The index of the frame which should become the new playback
         *     position.
         *
         * @param {function} callback
         *     The callback to invoke once the seek operation has completed.
         *
         * @param {Number} [delay=0]
         *     The number of milliseconds that the seek operation should be
         *     scheduled to take.
         */
        var seekToFrame = function seekToFrame(index, callback, delay) {

            // Abort any in-progress seek
            abortSeek();

            // Note that a new seek operation is in progress
            var thisSeek = activeSeek = {
                aborted : false
            };

            var startIndex;

            // Back up until startIndex represents current state
            for (startIndex = index; startIndex >= 0; startIndex--) {

                var frame = frames[startIndex];

                // If we've reached the current frame, startIndex represents
                // current state by definition
                if (startIndex === currentFrame)
                    break;

                // If frame has associated absolute state, make that frame the
                // current state
                if (frame.clientState) {
                    playbackClient.importState(frame.clientState);
                    currentFrame = index;
                    break;
                }

            }

            // Replay any applicable incremental frames
            var continueReplay = function continueReplay() {

                // Notify of changes in position
                if (recording.onseek && currentFrame > startIndex) {
                    recording.onseek(toRelativeTimestamp(frames[currentFrame].timestamp),
                        currentFrame - startIndex, index - startIndex);
                }

                // Cancel seek if aborted
                if (thisSeek.aborted)
                    return;

                // If frames remain, replay the next frame
                if (!thisSeek.aborted && currentFrame < index)
                    replayFrame(currentFrame + 1, continueReplay);

                // Otherwise, the seek operation is completed
                else
                    callback();

            };

            // Continue replay after requested delay has elapsed, or
            // immediately if no delay was requested
            if (delay)
                window.setTimeout(continueReplay, delay);
            else
                continueReplay();

        };

        /**
         * Aborts the seek operation currently in progress, if any. If no seek
         * operation is in progress, this function has no effect.
         *
         * @private
         */
        var abortSeek = function abortSeek() {
            if (activeSeek) {
                activeSeek.aborted = true;
                activeSeek = null;
            }
        };

        /**
         * Advances playback to the next frame in the frames array and schedules
         * playback of the frame following that frame based on their associated
         * timestamps. If no frames exist after the next frame, playback is paused.
         *
         * @private
         */
        var continuePlayback = function continuePlayback() {

            // If frames remain after advancing, schedule next frame
            if (currentFrame + 1 < frames.length) {

                // Pull the upcoming frame
                var next = frames[currentFrame + 1];

                // Calculate the real timestamp corresponding to when the next
                // frame begins
                var nextRealTimestamp = next.timestamp - startVideoTimestamp + startRealTimestamp;

                // Calculate the relative delay between the current time and
                // the next frame start
                var delay = Math.max(nextRealTimestamp - new Date().getTime(), 0);

                // Advance to next frame after enough time has elapsed
                seekToFrame(currentFrame + 1, function frameDelayElapsed() {
                    continuePlayback();
                }, delay);

            }

            // Otherwise stop playback
            else
                recording.pause();

        };

        /**
         * Fired when loading of this recording has completed and all frames
         * are available.
         *
         * @event
         */
        this.onload = null;

        /**
         * Fired when an error occurs which prevents the recording from being
         * played back.
         *
         * @event
         * @param {String} message
         *     A human-readable message describing the error that occurred.
         */
        this.onerror = null;

        /**
         * Fired when further loading of this recording has been explicitly
         * aborted through a call to abort().
         *
         * @event
         */
        this.onabort = null;

        /**
         * Fired when new frames have become available while the recording is
         * being downloaded.
         *
         * @event
         * @param {Number} duration
         *     The new duration of the recording, in milliseconds.
         *
         * @param {Number} parsedSize
         *     The number of bytes that have been loaded/parsed.
         */
        this.onprogress = null;

        /**
         * Fired whenever playback of the recording has started.
         *
         * @event
         */
        this.onplay = null;

        /**
         * Fired whenever playback of the recording has been paused. This may
         * happen when playback is explicitly paused with a call to pause(), or
         * when playback is implicitly paused due to reaching the end of the
         * recording.
         *
         * @event
         */
        this.onpause = null;

        /**
         * Fired whenever the playback position within the recording changes.
         *
         * @event
         * @param {Number} position
         *     The new position within the recording, in milliseconds.
         *
         * @param {Number} current
         *     The number of frames that have been seeked through. If not
         *     seeking through multiple frames due to a call to seek(), this
         *     will be 1.
         *
         * @param {Number} total
         *     The number of frames that are being seeked through in the
         *     current seek operation. If not seeking through multiple frames
         *     due to a call to seek(), this will be 1.
         */
        this.onseek = null;

        /**
         * Aborts the loading process, stopping further processing of the
         * provided blob.
         */
        this.abort = function abort() {
            if (!aborted) {
                aborted = true;
                if (recording.onabort)
                    recording.onabort();
            }
        };

        /**
         * Returns the underlying display of the Guacamole.Client used by this
         * SessionRecording for playback. The display contains an Element
         * which can be added to the DOM, causing the display (and thus playback of
         * the recording) to become visible.
         *
         * @return {Guacamole.Display}
         *     The underlying display of the Guacamole.Client used by this
         *     SessionRecording for playback.
         */
        this.getDisplay = function getDisplay() {
            return playbackClient.getDisplay();
        };

        /**
         * Returns whether playback is currently in progress.
         *
         * @returns {Boolean}
         *     true if playback is currently in progress, false otherwise.
         */
        this.isPlaying = function isPlaying() {
            return !!startVideoTimestamp;
        };

        /**
         * Returns the current playback position within the recording, in
         * milliseconds, where zero is the start of the recording.
         *
         * @returns {Number}
         *     The current playback position within the recording, in milliseconds.
         */
        this.getPosition = function getPosition() {

            // Position is simply zero if playback has not started at all
            if (currentFrame === -1)
                return 0;

            // Return current position as a millisecond timestamp relative to the
            // start of the recording
            return toRelativeTimestamp(frames[currentFrame].timestamp);

        };

        /**
         * Returns the duration of this recording, in milliseconds. If the
         * recording is still being downloaded, this value will gradually increase.
         *
         * @returns {Number}
         *     The duration of this recording, in milliseconds.
         */
        this.getDuration = function getDuration() {

            // If no frames yet exist, duration is zero
            if (frames.length === 0)
                return 0;

            // Recording duration is simply the timestamp of the last frame
            return toRelativeTimestamp(frames[frames.length - 1].timestamp);

        };

        /**
         * Begins continuous playback of the recording downloaded thus far.
         * Playback of the recording will continue until pause() is invoked or
         * until no further frames exist. Playback is initially paused when a
         * SessionRecording is created, and must be explicitly started through
         * a call to this function. If playback is already in progress, this
         * function has no effect. If a seek operation is in progress, playback
         * resumes at the current position, and the seek is aborted as if
         * completed.
         */
        this.play = function play() {

            // If playback is not already in progress and frames remain,
            // begin playback
            if (!recording.isPlaying() && currentFrame + 1 < frames.length) {

                // Notify that playback is starting
                if (recording.onplay)
                    recording.onplay();

                // Store timestamp of playback start for relative scheduling of
                // future frames
                var next = frames[currentFrame + 1];
                startVideoTimestamp = next.timestamp;
                startRealTimestamp = new Date().getTime();

                // Begin playback of video
                continuePlayback();

            }

        };

        /**
         * Seeks to the given position within the recording. If the recording is
         * currently being played back, playback will continue after the seek is
         * performed. If the recording is currently paused, playback will be
         * paused after the seek is performed. If a seek operation is already in
         * progress, that seek is first aborted. The seek operation will proceed
         * asynchronously.
         *
         * @param {Number} position
         *     The position within the recording to seek to, in milliseconds.
         *
         * @param {function} [callback]
         *     The callback to invoke once the seek operation has completed.
         */
        this.seek = function seek(position, callback) {

            // Do not seek if no frames exist
            if (frames.length === 0)
                return;

            // Abort active seek operation, if any
            recording.cancel();

            // Pause playback, preserving playback state
            var originallyPlaying = recording.isPlaying();
            recording.pause();

            // Restore playback when seek is completed or cancelled
            seekCallback = function restorePlaybackState() {

                // Seek is no longer in progress
                seekCallback = null;

                // Restore playback state
                if (originallyPlaying) {
                    recording.play();
                    originallyPlaying = null;
                }

                // Notify that seek has completed
                if (callback)
                    callback();

            };

            // Perform seek
            seekToFrame(findFrame(0, frames.length - 1, position), seekCallback);

        };

        /**
         * Cancels the current seek operation, setting the current frame of the
         * recording to wherever the seek operation was able to reach prior to
         * being cancelled. If a callback was provided to seek(), that callback
         * is invoked. If a seek operation is not currently underway, this
         * function has no effect.
         */
        this.cancel = function cancel() {
            if (seekCallback) {
                abortSeek();
                seekCallback();
            }
        };

        /**
         * Pauses playback of the recording, if playback is currently in progress.
         * If playback is not in progress, this function has no effect. If a seek
         * operation is in progress, the seek is aborted. Playback is initially
         * paused when a SessionRecording is created, and must be explicitly
         * started through a call to play().
         */
        this.pause = function pause() {

            // Abort any in-progress seek / playback
            abortSeek();

            // Stop playback only if playback is in progress
            if (recording.isPlaying()) {

                // Notify that playback is stopping
                if (recording.onpause)
                    recording.onpause();

                // Playback is stopped
                startVideoTimestamp = null;
                startRealTimestamp = null;

            }

        };

    };

    /**
     * A single frame of Guacamole session data. Each frame is made up of the set
     * of instructions used to generate that frame, and the timestamp as dictated
     * by the "sync" instruction terminating the frame. Optionally, a frame may
     * also be associated with a snapshot of Guacamole client state, such that the
     * frame can be rendered without replaying all previous frames.
     *
     * @private
     * @constructor
     * @param {Number} timestamp
     *     The timestamp of this frame, as dictated by the "sync" instruction which
     *     terminates the frame.
     *
     * @param {Number} start
     *     The byte offset within the blob of the first character of the first
     *     instruction of this frame.
     *
     * @param {Number} end
     *     The byte offset within the blob of character which follows the last
     *     character of the last instruction of this frame.
     */
    SessionRecording._Frame = function _Frame(timestamp, start, end) {

        /**
         * Whether this frame should be used as a keyframe if possible. This value
         * is purely advisory. The stored clientState must eventually be manually
         * set for the frame to be used as a keyframe. By default, frames are not
         * keyframes.
         *
         * @type {Boolean}
         * @default false
         */
        this.keyframe = false;

        /**
         * The timestamp of this frame, as dictated by the "sync" instruction which
         * terminates the frame.
         *
         * @type {Number}
         */
        this.timestamp = timestamp;

        /**
         * The byte offset within the blob of the first character of the first
         * instruction of this frame.
         *
         * @type {Number}
         */
        this.start = start;

        /**
         * The byte offset within the blob of character which follows the last
         * character of the last instruction of this frame.
         *
         * @type {Number}
         */
        this.end = end;

        /**
         * A snapshot of client state after this frame was rendered, as returned by
         * a call to exportState(). If no such snapshot has been taken, this will
         * be null.
         *
         * @type {Object}
         * @default null
         */
        this.clientState = null;

    };

    /**
     * A read-only Guacamole.Tunnel implementation which streams instructions
     * received through explicit calls to its receiveInstruction() function.
     *
     * @private
     * @constructor
     * @augments {Guacamole.Tunnel}
     */
    SessionRecording._PlaybackTunnel = function _PlaybackTunnel() {

        /**
         * Reference to this SessionRecording._PlaybackTunnel.
         *
         * @private
         * @type {SessionRecording._PlaybackTunnel}
         */
        var tunnel = this;

        this.connect = function connect(data) {
            // Do nothing
        };

        this.sendMessage = function sendMessage(elements) {
            // Do nothing
        };

        this.disconnect = function disconnect() {
            // Do nothing
        };

        /**
         * Invokes this tunnel's oninstruction handler, notifying users of this
         * tunnel (such as a Guacamole.Client instance) that an instruction has
         * been received. If the oninstruction handler has not been set, this
         * function has no effect.
         *
         * @param {String} opcode
         *     The opcode of the Guacamole instruction.
         *
         * @param {String[]} args
         *     All arguments associated with this Guacamole instruction.
         */
        this.receiveInstruction = function receiveInstruction(opcode, args) {
            if (tunnel.oninstruction)
                tunnel.oninstruction(opcode, args);
        };

    };

    return SessionRecording;

}]);angular.module('templates-main', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('modules/file/templates/fileChooser.html',
	"<label>\n" +
	"    <ng-transclude></ng-transclude>\n" +
	"</label>");
	$templateCache.put('modules/player/templates/player.html',
	"<!-- Actual playback display -->\n" +
	"<glen-player-display display=\"recording.getDisplay()\"\n" +
	"                     ng-click=\"togglePlayback()\"></glen-player-display>\n" +
	"\n" +
	"<!-- Player controls -->\n" +
	"<div class=\"glen-player-controls\" ng-show=\"recording\">\n" +
	"\n" +
	"    <!-- Playback position slider -->\n" +
	"    <input class=\"glen-player-seek\" type=\"range\" min=\"0\" step=\"1\"\n" +
	"           ng-attr-max=\"{{ recording.getDuration() }}\"\n" +
	"           ng-change=\"beginSeekRequest()\"\n" +
	"           ng-model=\"playbackPosition\"\n" +
	"           ng-on-change=\"commitSeekRequest()\">\n" +
	"\n" +
	"    <!-- Play button -->\n" +
	"    <button class=\"glen-player-play\"\n" +
	"            title=\"Play\"\n" +
	"            ng-click=\"recording.play()\"\n" +
	"            ng-hide=\"recording.isPlaying()\"><i class=\"fas fa-play\"></i></button>\n" +
	"\n" +
	"    <!-- Pause button -->\n" +
	"    <button class=\"glen-player-pause\"\n" +
	"            title=\"Pause\"\n" +
	"            ng-click=\"recording.pause()\"\n" +
	"            ng-show=\"recording.isPlaying()\"><i class=\"fas fa-pause\"></i></button>\n" +
	"\n" +
	"    <!-- Playback position and duration -->\n" +
	"    <span class=\"glen-player-position\">\n" +
	"        {{ formatTime(playbackPosition) }}\n" +
	"        :\n" +
	"        {{ formatTime(recording.getDuration()) }}\n" +
	"    </span>\n" +
	"\n" +
	"</div>\n" +
	"\n" +
	"<!-- Modal status indicator -->\n" +
	"<div class=\"glen-player-status\" ng-show=\"operationText\">\n" +
	"    <glen-player-progress-indicator progress=\"operationProgress\"></glen-player-progress-indicator>\n" +
	"    <p>{{ operationText }}</p>\n" +
	"    <button class=\"glen-player-button\" ng-show=\"cancelOperation\"\n" +
	"            ng-click=\"cancelOperation()\"><i class=\"fas fa-stop\"></i> Cancel</button>\n" +
	"</div>");
	$templateCache.put('modules/player/templates/playerDisplay.html',
	"<div class=\"glen-player-display-container\"></div>\n" +
	"<object class=\"glen-resize-sensor\" type=\"text/html\"\n" +
	"        data=\"resize-sensor.html\"\n" +
	"        aria-hidden=\"true\" alt=\"\"></object>");
	$templateCache.put('modules/player/templates/progressIndicator.html',
	"<div class=\"glen-player-progress-text\">{{ percentage }}%</div>\n" +
	"<div class=\"glen-player-progress-bar-container\" ng-class=\"{\n" +
	"        'past-halfway' : progress > 0.5\n" +
	"    }\">\n" +
	"    <div class=\"glen-player-progress-bar\" ng-style=\"{\n" +
	"        '-webkit-transform' : barTransform,\n" +
	"        '-moz-transform' : barTransform,\n" +
	"        '-ms-transform' : barTransform,\n" +
	"        '-o-transform' : barTransform,\n" +
	"        'transform' : barTransform\n" +
	"    }\"></div>\n" +
	"</div>");
	$templateCache.put('resize-sensor.html',
	"<!DOCTYPE html>\n" +
	"<html lang=\"en\">\n" +
	"    <head>\n" +
	"        <meta charset=\"utf-8\">\n" +
	"        <meta http-equiv=\"x-ua-compatible\" content=\"IE=edge\">\n" +
	"    </head>\n" +
	"    <body></body>\n" +
	"</html>");
}]);
