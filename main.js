var old; // Old CpuInfo
var sys = chrome.system;

window.onload = function() {
  var cpu = document.querySelector('#info');
  var htm = '<tr><th width="25%">model name</th><td>NaN</td></tr>' +
            '<tr><th>arch name</th><td>NaN</td></tr>' +
            '<tr><th>feature</th><td>NaN</td></tr>';
  try {
    //throw "cpu";
    sys.cpu.getInfo(function(c) {
      htm = '<tr><th width="25%">model name</th><td>' +
            c.modelName + '</td></tr><tr><th>arch name</th><td>' +
            c.archName + '</td></tr><tr><th>feature</th><td>' +
            c.features + '</td></tr>';
      old = c;
      var nav = navigator;
      htm += '<tr><th>user agent</th><td>' + nav.userAgent +
             '</td></tr><tr><th>platform</th><td>' + nav.platform +
             '</td></tr>';
      cpu.innerHTML = htm;
    });
  }
  catch (err) {
    // chrome.system.cpu not supported
  }
  cpu.innerHTML = htm;
  UpdateAll();
  window.setInterval(UpdateAll, 1000);
};

function Byte2MiB(byte) {
  return byte/1048576;
}

function Byte2GiB(byte) {
  return byte/1073741824;
}

function UpdateCpu() {
  var cpu = document.querySelector('#usage');
  var htm = '<tr><th width="25%">cpu</th>' +
                  '<th width="25%">user</th>' +
                  '<th width="25%">kernel</th>' +
                  '<th width="25%">idle</th></tr>';
  try {
    //throw "cpu";
    sys.cpu.getInfo(function(c) {
      for (var i = 0; i < c.numOfProcessors; i++) {
        var total = c.processors[i].usage.total - old.processors[i].usage.total;
        var user = c.processors[i].usage.user - old.processors[i].usage.user;
        var kernel = c.processors[i].usage.kernel -
                     old.processors[i].usage.kernel;
        var idle = c.processors[i].usage.idle - old.processors[i].usage.idle;
        htm += '<tr><th>' + i + '</th>' +
               '<td>' + Math.round(user/total*100) + '</td>' +
               '<td>' + Math.round(kernel/total*100) + '</td>' +
               '<td>' + Math.round(idle/total*100) + '</td></tr>';
      }
      cpu.innerHTML = htm;
      old = c;
    });
  }
  catch (err) {
    // chrome.system.cpu not supported
    cpu.innerHTML = htm + '<tr><td colspan="4">NaN</td></tr>';
  }
}

function UpdateMem() {
  var mem = document.querySelector('#memory');
  var htm = '<tr><th width="50%">total (MiB)'+
                  '</th><th>available (MiB)</th></tr>';
  try {
    //throw "memory";
    sys.memory.getInfo(function(m) {
      htm += '<tr><td>' + Math.round(m.capacity/1048576) +
                       '</td><td>' + Math.round(m.availableCapacity/1048576) +
                       '</td></tr>';
      mem.innerHTML = htm;
    });
  }
  catch (err) {
    // chrome.system.memory not supported
    mem.innerHTML = htm + '<tr><td colspan="4">NaN</td></tr>';
  }
}

function UpdateStorage() {
  var sto = document.querySelector('#storage');
  var htm = '<tr><th width="40%">id</th>' +
                  '<th width="20%">name</th>' +
                  '<th width="20%">type</th>' +
                  '<th width="20%">capacity (MiB)</th></tr>';
  try {
    sys.storage.getInfo(function(s) {
      for (var i = 0; i < s.length; i++) {
        htm += '<tr><td>' + s[i].id +
                         '</td><td>' + s[i].name +
                         '</td><td>' + s[i].type +
                         '</td><td>' + Math.round(Byte2MiB(s[i].capacity)) +
                         '</td></tr>';
      }
      sto.innerHTML = htm;
    });
  }
  catch (err) {
    // chrome.system.storage not supported
    sto.innerHTML = htm + '<tr><td colspan="4">NaN</td></tr>';
  }
}

function UpdateDisplay() {
  var lcd = document.querySelector('#display');
  var htm = '<tr><th width="25%">primary</th><th width="25%">name</th>' +
                  '<th width="25%">resolution</th>' +
                  '<th width="25%">dpi</th>';
  try {
    //throw "display";
    sys.display.getInfo(function(d) {
      for (var i = 0; i < d.length; i++) {
        htm += '<tr><td>' + d[i].isPrimary +
                         '</td><td>' + d[i].name +
                         '</td><td>' + d[i].bounds.width +
                         'x' + d[i].bounds.height +
                         '</td><td>' + d[i].dpiX + '</td></tr>';
      }
      lcd.innerHTML = htm;
    });
  }
  catch (err) {
    // chrome.system.display not supported
    lcd.innerHTML = htm + '<tr><td colspan="4">NaN</td></tr>';
  }
}

function UpdateNetwork() {
  var net = document.querySelector('#network');
  var htm = '<tr><th width="50%">name</th><th>address</th></tr>';
  try {
    //throw "network";
    sys.network.getNetworkInterfaces(function(n) {
      for (var i = 0; i < n.length; i++) {
        htm += '<tr><td>' + n[i].name + '</td><td>' + n[i].address +
               '</td></tr>';
      }
      net.innerHTML = htm;
    });
  }
  catch (err) {
    // chrome.system.network not supported
    net.innerHTML = htm + '<tr><td colspan="2">NaN</td></tr>';
  }
}

function UpdateAll() {
  UpdateCpu();
  UpdateMem();
  UpdateStorage();
  UpdateDisplay();
  UpdateNetwork();
}
