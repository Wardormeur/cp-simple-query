const path = require('path');

module.exports = bookshelf =>
  new Promise((resolve, reject) => {
    // Default "migrate" will take js files in the ./migrations folder
    bookshelf.knex.migrate
      .latest({ directory: path.join(__dirname, '/migrations') })
      .then(() => {
        return Promise.resolve();
      })
      .then(() => {
        resolve(bookshelf);
      })
      .catch(reject);
  });


