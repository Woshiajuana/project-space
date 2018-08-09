var express = require('express');
var path = require('path');
var os = require('os');

var app = express();
var port = 80;

app.use(express.static(__dirname + '/ajuan/dist'));

router(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send('Error');
});

app.listen(port, function(){
  var log = '服务已经运行，请访问 '+GetLocalIP(null, 'ipv4')+(port==80?'':':'+port);
  console.log(log);
});

// 路由函数
function router(app){
  app.get('/:name', function(req, res){
    var filename = req.params.name;
    res.sendFile(path.join(__dirname, filename), function(err){
      if (err) {
        console.log(err);
        res.status(err.status).end();
      }
      else{
        console.log('Sent:', filename);
      }
    });
  });
}

/** 
 * 获取指定网卡的IP 
 * @param name 网卡名 
 * @param family IP版本 IPv4 or IPv5 
 * @returns ip 
 */  
function GetLocalIP(name, family) {  
    //所有的网卡  
    var ifaces = os.networkInterfaces();  
    //移除loopback,没多大意义  
    for (var dev in ifaces) {  
        if (dev.toLowerCase().indexOf('loopback') != -1) {  
            delete  ifaces[dev];  
            continue;  
        }  
    }  
  
    var ip = null;  
    family = family.toUpperCase();  
  
    var iface = null;  
    if (name == null) {  
        for (var dev in ifaces) {  
            ifaces[dev].forEach(function (details) {  
                if (details.family.toUpperCase() === family) {  
                    ip = details.address;  
                }  
            });  
            break;  
        }  
        return ip;  
    }  
    var nameList = name.split(',');  
    for (var i = 0, j = nameList.length; i < j; i++) {  
        var key = nameList[i];  
  
  
        //指定的链接不存在  
        if (ifaces[key] == null) {  
            continue;  
        }  
  
  
        ifaces[key].forEach(function (details) {  
            if (details.family.toUpperCase() === family) {  
                ip = details.address;  
            }  
        });  
        if (ip != null) {  
            break;  
        }  
    }  
    if (ip == null) {  
        ip = '127.0.0.1';  
        logger.error('get ip error, return 127.0.0.1, please check');  
    }  
  
  
    return ip;  
}  