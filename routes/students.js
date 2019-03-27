const express = require('express');
const studentsDb = require('../data/students');

const router = express.Router();

const verifyStudent = studentData => studentData.name && studentData.cohort_id;

router.get('/', async (req, res) => {
  try {
    const students = await studentsDb.getAll();
    res.status(200).json(students);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Cannot get students.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const student = await studentsDb.getById(id);
    if (!student) {
      res.status(404).json({ error: 'No student with that ID.' });
    } else {
      res.status(200).json(student);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Cannot get student.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { body: student } = req;
    if (!verifyStudent(student)) {
      res.status(400).json({ error: 'Please provide a name and cohort_id for the student.' });
    } else {
      const [newStudentId] = await studentsDb.create(student);
      const newStudent = await studentsDb.getById(newStudentId);
      res.status(201).json(newStudent);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Cannot create student.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { body: studentUpdates } = req;
    if (!verifyStudent(studentUpdates)) {
      res.status(400).json({ error: 'Please provide a name and cohort_id for the student.' });
    } else {
      const updatedCount = await studentsDb.update(id, studentUpdates);
      if (!updatedCount) {
        res.status(404).json({ error: 'The student with the specified ID does not exist.' });
      } else {
        res.status(204).end();
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Cannot update student.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const student = await studentsDb.getById(id);
    if (!student) {
      res.status(404).json({ error: 'The student with the specified ID does not exist.' });
    } else {
      await studentsDb.delete(id);
      res.status(204).end();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Cannot delete student.' });
  }
});

module.exports = router;
