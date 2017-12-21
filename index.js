const migrate = require('./database/migrate');
const bookshelf = require('./database/index');

return migrate(bookshelf)

