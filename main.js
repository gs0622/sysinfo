var old; // Old CpuInfo

window.onload = function() {
  var cpu = document.querySelector('#info');
  chrome.system.cpu.getInfo(function(c) {
    cpu.innerHTML += '<tr><th width="25%">model name</th><td>' + c.modelName +
                     '</td></tr>';
    cpu.innerHTML += '<tr><th>arch name</th><td>' + c.archName + '</td></tr>';
    cpu.innerHTML += '<tr><th>feature</th><td>' + c.features + '</td></tr>';
  });

  chrome.system.cpu.getInfo(function(c) {
    old = c;
  });
  UpdateAll();
  window.setInterval(UpdateAll, 2000);
};

function Byte2MiB(byte) {
  return byte/1048576;
}

function Byte2GiB(byte) {
  return byte/1073741824;
}

function UpdateCpu() {
  var cpu = document.querySelector('#usage');
  cpu.innerHTML = '<tr><th width="25%">cpu</th>' +
                  '<th width="25%">user</th>' +
                  '<th width="25%">kernel</th>' +
                  '<th width="25%">idle</th></tr>';
  chrome.system.cpu.getInfo(function(c) {
    for (var i = 0; i < c.numOfProcessors; i++) {
      var total = c.processors[i].usage.total - old.processors[i].usage.total;
      var user = c.processors[i].usage.user - old.processors[i].usage.user;
      var kernel = c.processors[i].usage.kernel -
                   old.processors[i].usage.kernel;
      var idle = c.processors[i].usage.idle - old.processors[i].usage.idle;
      cpu.innerHTML += '<tr><th>' + i + '</th>' +
                       '<td>' + Math.round(user/total*100) + '</td>' +
                       '<td>' + Math.round(kernel/total*100) + '</td>' +
                       '<td>' + Math.round(idle/total*100) + '</td></tr>';
    }
    old = c;
  });
}

function UpdateMem() {
  var mem = document.querySelector('#memory');
  mem.innerHTML = '<tr><th width="50%">total (MiB)'+
                  '</th><th>available (MiB)</th></tr>';
  chrome.system.memory.getInfo(function(m) {
    mem.innerHTML += '<tr><td>' + Math.round(m.capacity/1048576) +
                     '</td><td>' + Math.round(m.availableCapacity/1048576) +
                     '</td></tr>';
  });
}

function UpdateSto() {
  var sto = document.querySelector('#storage');
  sto.innerHTML = '<tr><th width="40%">uuid</th>' +
                  '<th width="20%">name</th>' +
                  '<th width="20%">type</th>' +
                  '<th width="20%">capacity (MiB)</th></tr>';
  chrome.system.storage.getInfo(function(s) {
    for (var i = 0; i < s.length; i++) {
      sto.innerHTML += '<tr><td>' + s[i].id +
                       '</td><td>' + s[i].name +
                       '</td><td>' + s[i].type +
                       '</td><td>' + Math.round(Byte2MiB(s[i].capacity)) +
                       '</td></tr>';
    }
  });
}

function UpdateAll() {
  UpdateCpu();
  UpdateMem();
  UpdateSto();
}