const fs = require('fs');
const cart = require('./cart');
const moment = require('moment')

const actions = {
  add: cart.add,
  change: cart.change,
  dell: cart.del
};

const handler = (req, res, action, file) => {
  fs.readFile(file, 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      const newCart = actions[action](JSON.parse(data), req);
      fs.writeFile(file, newCart, (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      });
      const time = moment()
      const log = {
        action: action,
        product: req.body.product_name,
        time: time.format('h:mm:ss')
      }
      fs.appendFile('./server/db/stats.json', `\n${JSON.stringify(log)}`, () => {})
    }
  });
};

module.exports = handler;
