
window.onload = function() {
  //var greeting = document.querySelector('#greeting');
  //greeting.innerText = 'Hello, World! It is ' + new Date() + '\n';
  var cpu = document.querySelector('#info');
  chrome.system.cpu.getInfo(function(c) {
    cpu.innerText += c.modelName + '\n';
    cpu.innerText += c.archName + '\n';
    cpu.innerText += c.features + '\n';
  });

  chrome.system.cpu.getInfo(function(c) {
    OldInfo = c;
  });

  window.setInterval(UpdateCpu, 2000);
};

var OldInfo;

function UpdateCpu() {
  var cpu = document.querySelector('#usage');
  cpu.innerText = '';
  chrome.system.cpu.getInfo(function(c) {
    for (var i = 0; i < c.numOfProcessors; i++) {
      var total = c.processors[i].usage.total - OldInfo.processors[i].usage.total;
      var user = c.processors[i].usage.user - OldInfo.processors[i].usage.user;
      cpu.innerText += 'cpu' + i + ': ' + Math.floor(user/total*100) + '\n';
    }
    OldInfo = c;
  });
}
