module.exports = {

    getRemoteAddress(req) {
        let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
        let host = req.get('host')
        
        if(ip === "127.0.0.1" || ip === "::ffff:127.0.0.1" || ip === "::1" || host.indexOf("localhost") !== -1)
          return "localhost"
        else return ip
    },
    getClientInfo(req) {
        let clientInfo = {
          clientIPaddr: null,
          clientProxy: null
        }
      
        // is client going through a proxy?
        if (req.headers['via']) {
          clientInfo.clientIPaddr = req.headers['x-forwarded-for']
          clientInfo.clientProxy = req.headers['via']
        } else {
          clientInfo.clientIPaddr = req.connection.remoteAddress
          clientInfo.clientProxy = "none"
        }
        clientInfo.userAgent = req.headers['user-agent']
        
        return clientInfo
    }

}
