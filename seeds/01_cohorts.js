exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cohorts')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('cohorts').insert([
        { name: 'WEB14' },
        { name: 'WEB15' },
        { name: 'WEB16' },
        { name: 'WEB17' },
        { name: 'WEB18' }
      ]);
    });
};
