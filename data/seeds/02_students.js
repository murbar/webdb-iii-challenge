const faker = require('faker');

const createStudentSeed = () => ({
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  cohort_id: faker.random.number({
    min: 1,
    max: 5
  })
});

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('students')
    .truncate()
    .then(function() {
      // Inserts seed entries
      const students = [];
      const seedsCount = 50;
      for (let i = 0; i < seedsCount; i++) {
        students.push(createStudentSeed());
      }
      return knex('students').insert(students);
    });
};
