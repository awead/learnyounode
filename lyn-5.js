var fs = require('fs');
var regex = new RegExp("\." + process.argv[3] + "$", "g");
fs.readdir(process.argv[2], function (err, list) {
  if (err) throw err;
  for (var i = 0, len = list.length; i < len; i++) {
    if ( list[i].match(regex) )
      console.log(list[i]);
  }
});