var old; // Old CpuInfo
var sys = chrome.system;

window.onload = function() {
  var cpu = document.querySelector('#info');
  sys.cpu.getInfo(function(c) {
    cpu.innerHTML += '<tr><th width="25%">model name</th><td>' + c.modelName +
                     '</td></tr>';
    cpu.innerHTML += '<tr><th>arch name</th><td>' + c.archName + '</td></tr>';
    cpu.innerHTML += '<tr><th>feature</th><td>' + c.features + '</td></tr>';
    old = c;
    var nav = navigator;
    cpu.innerHTML += '<tr><th>user agent</th><td>' + nav.userAgent +
                     '</td></tr><tr><th>platform</th><td>' + nav.platform +
                     '</td></tr>';
  });

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

function UpdateMem() {
  var mem = document.querySelector('#memory');
  var htm = '<tr><th width="50%">total (MiB)'+
                  '</th><th>available (MiB)</th></tr>';
  sys.memory.getInfo(function(m) {
    htm += '<tr><td>' + Math.round(m.capacity/1048576) +
                     '</td><td>' + Math.round(m.availableCapacity/1048576) +
                     '</td></tr>';
    mem.innerHTML = htm;
  });
}

function UpdateStorage() {
  var sto = document.querySelector('#storage');
  var htm = '<tr><th width="40%">id</th>' +
                  '<th width="20%">name</th>' +
                  '<th width="20%">type</th>' +
                  '<th width="20%">capacity (MiB)</th></tr>';
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

function UpdateDisplay() {
  var lcd = document.querySelector('#display');
  var htm = '<tr><th width="25%">primary</th><th width="25%">name</th>' +
                  '<th width="25%">resolution</th>' +
                  '<th width="25%">dpi</th>';
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

function UpdateAll() {
  UpdateCpu();
  UpdateMem();
  UpdateStorage();
  UpdateDisplay();
}
