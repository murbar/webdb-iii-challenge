exports.up = function(knex) {
  return knex.schema.createTable('cohorts', tbl => {
    tbl.increments();
    tbl
      .string('name', 255)
      .notNullable()
      .unique();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cohorts');
};
