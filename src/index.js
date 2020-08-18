var timeoutId = 0;
var timeouts = {};
import Worker from './timeout.worker.js';

var worker = new Worker();
worker.addEventListener("message", function(evt) {
  var data = evt.data,
      id = data.id,
      fn = timeouts[id].fn,
      args = timeouts[id].args;

  fn.apply(null, args);
  delete timeouts[id];
});

window.setTimeout = function(fn, delay) {
  var args = Array.prototype.slice.call(arguments, 2);
  timeoutId += 1;
  delay = delay || 0;
  var id = timeoutId;
  timeouts[id] = {fn: fn, args: args};
  worker.postMessage({command: "setTimeout", id: id, timeout: delay});
  return id;
};

window.clearTimeout = function(id) {
  worker.postMessage({command: "clearTimeout", id: id});
  delete timeouts[id];
};

console.log("hello world");
window.setTimeout(() => console.log("hello world after 5 sec"), 5*1000);