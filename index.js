const cogmq = require('cogmq').default;
const assert = require('assert');
const isPlainObject = require('lodash.isplainobject');

class Client extends cogmq.Client {
  constructor(options) {
    super(options);
  }

  getCaller() {
    const self = this;
    return new Proxy(this, {
      get(target, property) {
        return (arg) => {
          assert(isPlainObject(arg), 'Expecting argument to be a plain object.');
          return self.send.call(self, { action: property, content: arg });
        }
      }
    });
  }
}

module.exports = (option) => new Client(option).getCaller();
