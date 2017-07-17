const cogmq = require('cogmq').default;

class Client extends cogmq.Client {
  constructor(options) {
    super(options);
  }

  getCaller() {
    const self = this;
    return new Proxy(this, {
      get(target, property) {
        return (arg) => {
          return self.send.call(self, { action: property, content: arg });
        }
      }
    });
  }
}

module.exports = (option) => new Client(option).getCaller();
