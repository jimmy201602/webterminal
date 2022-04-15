export default {
  IDLE: 0,
  CONNECTING: 1,
  WAITING: 2,
  CONNECTED: 3,
  DISCONNECTING: 4,
  DISCONNECTED: 5,
  0: {
    name: 'SUCCESS',
    text: 'The operation succeeded. No error.'
  },
  1: {
    name: 'CONNECTING',
    text: 'Connecting to Guacamole.'
  },
  2: {
    name: 'WAITING',
    text: 'Connected to Guacamole. Waiting for response...'
  },
  3: {
    name: 'CONNECTED',
    text: 'Connect to the server success.'
  },
  4: {
    name: 'DISCONNECTING',
    text: 'The user manually disconnect the server connection.'
  },
  5: {
    name: 'DISCONNECTED',
    text: 'Disconnected from the server.'
  },
  256: {
    name: 'UNSUPPORTED',
    text: 'The requested operation is unsupported.'
  },
  512: {
    name: 'SERVER_ERROR',
    text: 'An internal error occurred, and the operation could not be performed.'
  },
  513: {
    name: 'SERVER_BUSY',
    text: 'The operation could not be performed because the server is busy.'
  },
  514: {
    name: 'UPSTREAM_TIMEOUT',
    text: 'The upstream server is not responding. In most cases, the upstream server is the remote desktop server.'
  },
  515: {
    name: 'UPSTREAM_ERROR',
    text: 'The upstream server encountered an error. In most cases, the upstream server is the remote desktop server.'
  },
  516: {
    name: 'RESOURCE_NOT_FOUND',
    text: 'An associated resource, such as a file or stream, could not be found, and thus the operation failed.'
  },
  517: {
    name: 'RESOURCE_CONFLICT',
    text: 'A resource is already in use or locked, preventing the requested operation.'
  },
  518: {
    name: 'RESOURCE_CLOSED',
    text: 'The requested operation cannot continue because the associated resource has been closed.'
  },
  519: {
    name: 'UPSTREAM_NOT_FOUND',
    text: 'The upstream server does not appear to exist, or cannot be reached over the network. In most cases, the upstream server is the remote desktop server.'
  },
  520: {
    name: 'UPSTREAM_UNAVAILABLE',
    text: 'The upstream server is refusing to service connections. In most cases, the upstream server is the remote desktop server.'
  },
  521: {
    name: 'SESSION_CONFLICT',
    text: 'The session within the upstream server has ended because it conflicts with another session. In most cases, the upstream server is the remote desktop server.'
  },
  522: {
    name: 'SESSION_TIMEOUT',
    text: 'The session within the upstream server has ended because it appeared to be inactive. In most cases, the upstream server is the remote desktop server.'
  },
  523: {
    name: 'SESSION_CLOSED',
    text: 'The session within the upstream server has been forcibly closed. In most cases, the upstream server is the remote desktop server.'
  },
  768: {
    name: 'CLIENT_BAD_REQUEST',
    text: 'The parameters of the request are illegal or otherwise invalid.'
  },
  769: {
    name: 'CLIENT_UNAUTHORIZED',
    text: 'Permission was denied, because the user is not logged in. Note that the user may be logged into Guacamole, but still not logged in with respect to the remote desktop server.'
  },
  771: {
    name: 'CLIENT_FORBIDDEN',
    text: 'Permission was denied, and logging in will not solve the problem.'
  },
  776: {
    name: 'CLIENT_TIMEOUT',
    text: 'The client (usually the user of Guacamole or their browser) is taking too long to respond.'
  },
  781: {
    name: 'CLIENT_OVERRUN',
    text: 'The client has sent more data than the protocol allows.'
  },
  783: {
    name: 'CLIENT_BAD_TYPE',
    text: 'The client has sent data of an unexpected or illegal type.'
  },
  797: {
    name: 'CLIENT_TOO_MANY',
    text: 'The client is already using too many resources. Existing resources must be freed before further requests are allowed.'
  }

}
