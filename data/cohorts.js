const db = require('./db');

const table = 'cohorts';

module.exports = {
  getAll: function() {
    return db(table);
  },
  getById: function(id) {
    return db(table)
      .where({ id })
      .first();
  },
  create: function(record) {
    return db(table).insert(record);
  },
  update: function(id, record) {
    return db(table)
      .where({ id })
      .update(record);
  },
  delete: function(id) {
    return db(table)
      .where({ id })
      .del();
  }
};
