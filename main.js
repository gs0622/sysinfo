
window.onload = function() {
  var greeting = document.querySelector('#greeting');
  greeting.innerText = 'Hello, World! It is ' + new Date() + '\n';
  chrome.system.cpu.getInfo(function(c) {
    for (var i = 0; i < c.numOfProcessors; i++) {
      var user = c.processors[i].usage.user/c.processors[i].usage.total;
      greeting.innerText += 'cpu' + i + ':' + Math.floor(user*100) + '\n';
    }
  });
  //window.setInterval(UpdateCpu, 3000);
};

