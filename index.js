const dgram = require('dgram');
const server = dgram.createSocket('udp4');
var BufferOffset = require('buffer-offset');

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (rawBuffer, rinfo) => {
    var self = this;
    // check for DATA@
    if (rawBuffer.toString('ascii', 0, 5) == 'DATA*') {
      var dataBuffer = rawBuffer.slice(5, 5 + rawBuffer.length - (rawBuffer.length % 36))
        , buf = dataBuffer.slice(0, 36);
      for (var offset = 0; offset < dataBuffer.length; offset += 36, buf = dataBuffer.slice(offset, offset+36)) {
        // emit sentence event
        self.emit('sentence', buf);
        console.log(`server got: ${buf} from ${rinfo.address}:${rinfo.port}`);
      }
    }
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(49000);
// server listening 0.0.0.0:41234