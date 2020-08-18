const _ = require("lodash");
var timers = new Map();

function fireTimeout(id) {
    self.postMessage({ id: id });
    timers.delete(id);
}

self.onmessage = (evt) => {
    var data = evt.data;

    switch (data.command) {
        case "setTimeout":
            var time = _.toInteger(data.timeout),
                timer = setTimeout(fireTimeout.bind(null, data.id), time);
            timers.set(data.id, timer);
            break;
        case "clearTimeout":
            var timer = timers.get(data.id);
            if (!_.isNil(timer)) {
                clearTimeout(timer);
            }
            timers.delete(data.id);
            break;
    }
};