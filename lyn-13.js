var http = require('http')
var url = require('url')

function parseResponse(req) {
  uo = url.parse(req.url, true);
  if ( uo.pathname.match(/api\/parsetime/) ) {
    return parseTime(uo.query);
  }
  else if ( uo.pathname.match(/api\/unixtime/) ) {
    return unixTime(uo.query);
  } 
  else {
    return {};
  }
}

function parseTime(query) {
  if (query.iso) {
    var date = new Date(query.iso)
    return { "hour": date.getHours(), "minute": date.getMinutes(), "second": date.getSeconds() }
  }
  else {
    return {}
  }
}

function unixTime(query) {
  if (query.iso) {
    var date = new Date(query.iso)
    return { "unixtime": date.getTime() }
  }
  else {
    return {}
  }
}


var server = http.createServer(function (req, res) {
  var result = parseResponse(req);
  res.writeHead(200, { 'content-type': 'application/json' })
  res.write(JSON.stringify(result));
  res.end();
})
server.listen(process.argv[2])

/* the official solution

  var http = require('http')
  var url = require('url')
  
  function parsetime (time) {
    return {
      hour: time.getHours(),
      minute: time.getMinutes(),
      second: time.getSeconds()
    }
  }
  
  function unixtime (time) {
    return { unixtime : time.getTime() }
  }
  
  var server = http.createServer(function (req, res) {
    var parsedUrl = url.parse(req.url, true)
    var time = new Date(parsedUrl.query.iso)
    var result
  
    if (/^\/api\/parsetime/.test(req.url))
      result = parsetime(time)
    else if (/^\/api\/unixtime/.test(req.url))
      result = unixtime(time)
  
    if (result) {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(result))
    } else {
      res.writeHead(404)
      res.end()
    }
  })
  server.listen(Number(process.argv[2]))

*/
