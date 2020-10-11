const httpProxy = require('http-proxy')
const fs = require('fs')

httpProxy
  .createServer({
    // changeOrigin: true,
    target: 'http://localhost:3000',
    ssl: {
      key: fs.readFileSync('certs/cert.key'),
      cert: fs.readFileSync('certs/cert.crt')
    },
    ws: true
  })
  .listen(3333)

require('http')
  .createServer((req, res) => {
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="cloverRootCA.pem"'
    )
    res.writeHead(200)
    res.end(fs.readFileSync('certs/rootCACert.pem'))
  })
  .listen(3003)
