/*jslint browser:true */

var jQuery;
var geometry = {};

jQuery(function($){

    Terminal.applyAddon(fullscreen);
    Terminal.applyAddon(fit);
    Terminal.applyAddon(attach);
    Terminal.applyAddon(zmodem);

    function uploadfile(zsession) {
        var uploadHtml = "<div>" +
            "<label class='upload-area' style='width:100%;text-align:center;' for='fupload'>" +
            "<input id='fupload' name='fupload' type='file' style='display:none;' multiple='true'>" +
            "<i class='fa fa-cloud-upload fa-3x'></i>" +
            "<br />" +
            "Upload" +
            "</label>" +
            "<br />" +
            "<span style='margin-left:5px !important;' id='fileList'></span>" +
            "</div><div class='clearfix'></div>";

        bootbox.dialog({
            message: uploadHtml,
            title: "File Upload",
            buttons: {
                success: {
                    label: "Upload",
                    className: "btn-default",
                    callback: function (res) {
                        // what you wanna do here ...
                    }
                }
            }
        });

        // var fileList = ;
        // fileList.addEventListener("change", function (e) {
        //     var list = "";
        //     for (var i = 0; i < this.files.length; i++) {
        //         list += this.files[i].name
        //     }
        //
        //     $("#fileList").text(list);
        // }, false);
        var file_el = document.getElementById("fupload");

        function _hide_progress(){
            console.log(11);
        }

        function _show_progress(){
            console.log(222);
        }

        function _update_progress(xfer){
            console.log(333,xfer);
        }


        var promise = new Promise( (res) => {
            file_el.onchange = function(e) {
                var files_obj = file_el.files;

                Zmodem.Browser.send_files(
                    zsession,
                    files_obj,
                    {
                        on_offer_response(obj, xfer) {
                            if (xfer) _show_progress();
                            console.log("offer", xfer ? "accepted" : "skipped");
                        },
                        on_progress(obj, xfer) {
                            _update_progress(xfer);
                        },
                        on_file_complete(obj) {
                            console.log("COMPLETE", obj);
                            // _hide_progress();
                        },
                    }
                ).then(_hide_progress).then(
                    zsession.close.bind(zsession),
                    console.error.bind(console)
                ).then( () => {
                    //_hide_file_info();
                    //_hide_progress();
                    res();
                } );
            };
        } );

        return promise;
    };

    function make_terminal(element, size, ip, id) {

        var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
        var ws_url = ws_scheme + '://' + window.location.host + '/ws/';

        var term = new Terminal({
            // cols: size.cols,
            // rows: size.rows,
            screenKeys: true,
            useStyle: true,
            cursorBlink: true,  // Blink the terminal's cursor
        });
        term.open(element, false);
        term.fit();
        term.focus();
        term.toggleFullScreen(true);


        function parse_xterm_style() {
            var text = $('.xterm-helpers style').text();
            var arr = text.split('xterm-normal-char{width:');
            style.width = parseFloat((window.innerWidth/17)+1);
            arr = text.split('div{height:');
            style.height = parseFloat((window.innerHeight/17)+1);

        }


        function format_geometry(cols, rows) {
            return JSON.stringify({'cols': cols, 'rows': rows});
        }

        function _save_to_disk(xfer, buffer) {
            return Zmodem.Browser.save_to_disk(buffer, xfer.get_details().name);
        };

        function resize_terminal(term) {
            term.on_resize(parseInt((window.innerWidth/9)+0),parseInt((window.innerHeight/17)+0));
            geometry['cols'] = parseInt((window.innerWidth/9)+0);
            geometry['rows'] = parseInt((window.innerHeight/17)+0);
        }



        term.on_resize = function(cols, rows) {
            if (cols !== geometry['cols'] || rows !== geometry['rows']) {
                console.log('Resizing terminal to geometry: ' + format_geometry(cols, rows));
                if (term){
                    term.resize(cols,rows);
                    ws.send(JSON.stringify(['set_size',rows, cols, cols, rows]));
                }
            }
        };

        function _handle_receive_session(zsession) {
            zsession.on("offer", function(xfer) {
                current_receive_xfer = xfer;

                function on_form_submit() {
                    var FILE_BUFFER = [];
                    xfer.on("input", (payload) => {
                        //_update_progress(xfer);
                        FILE_BUFFER.push( new Uint8Array(payload) );
                    });
                    xfer.accept().then(
                        () => {
                            _save_to_disk(xfer, FILE_BUFFER);
                        },
                        console.error.bind(console)
                    );
                };

                on_form_submit();

            } );

            var promise = new Promise( (res) => {
                zsession.on("session_end", () => {
                    res();
                    console.log('session end');
                } );
            } );

            zsession.start();

            return promise;
        };

        var ws = new WebSocket(ws_url);

        term.on("zmodemDetect", (detection) => {
            term.detach();
            let zsession = detection.confirm();

            var promise;

            if (zsession.type === "receive") {
                promise = _handle_receive_session(zsession);
            }else {
                promise = uploadfile(zsession);
            }

            promise.catch( console.error.bind(console) ).then( () => {
                term.attach(ws);
            } );
        });

        ws.onopen = function (event) {
            //set terminal width and height
            //zmodem attach
            //$('.container').hide();

            //fit terminal
            term.resize(parseInt((window.innerWidth/9)+0),parseInt((window.innerHeight/17)+0));
            ws.send(JSON.stringify(["ip", ip,term.cols, term.rows, id]));

            ws.send(JSON.stringify(['set_size',parseInt((window.innerHeight/17)+0), parseInt((window.innerWidth/9)+0), parseInt((window.innerWidth/9)+0), parseInt((window.innerHeight/17)+0)]));

            //set terminal fit resize function
            // term.on('resize', function (size) {
            //     ws.send(JSON.stringify(["set_size", size.rows, size.cols]));
            // });

            term.on('title', function (title) {
                document.title = title;
            });

            //attach websocket to terminal
            term.attach(ws);
            term._initialized = true;

            term.zmodemAttach(ws, {
                noTerminalWriteOutsideSession: true,
            } );

            $(window).resize(function(){
                if (term) {
                    resize_terminal(term);
                }
            });

        };

        // ws.onclose = function(e) {
        //     term.destroy();
        // };

        return {socket: ws, term: term};
    }

    $(document).ready(function () {
        make_terminal(document.getElementById("terminal"), {"cols":146,"rows":43}, $("#terminal").attr("ip"), $("#terminal").attr("server_id"));
    })
});
