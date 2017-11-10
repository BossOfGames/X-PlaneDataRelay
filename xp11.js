var XPlane = require('xplane');

xplane = new XPlane({
  port: {
    in: 49000 // default port for X-Plane UDP data 
  }
});
xplane.on('sentence', function(data) {
console.log('IAS: ' + xplane.data.airspeed.indicated + ' kts');
console.log('N1 Eng 1: ' + xplane.data.n1[1] + ' N1 Eng 2: ' + xplane.data.n1[2]);
});
xplane.listen();