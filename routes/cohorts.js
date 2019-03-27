const express = require('express');
const cohortsDb = require('../data/cohorts');
const studentsDb = require('../data/students');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const cohorts = await cohortsDb.getAll();
    res.status(200).json(cohorts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Cannot get cohorts.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const cohort = await cohortsDb.getById(id);
    if (!cohort) {
      res.status(404).json({ error: 'No cohort with that ID.' });
    } else {
      res.status(200).json(cohort);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Cannot get cohort.' });
  }
});

router.get('/:id/students', async (req, res) => {
  try {
    const { id } = req.params;
    const students = await studentsDb.getByCohortId(id);
    res.status(200).json(students);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Cannot get students.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { body: cohort } = req;
    if (!cohort.name) {
      res.status(400).json({ error: 'Please provide a name for the cohort.' });
    } else {
      const [newCohortId] = await cohortsDb.create(cohort);
      const newCohort = await cohortsDb.getById(newCohortId);
      res.status(201).json(newCohort);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Cannot create cohort.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { body: cohortUpdates } = req;
    if (!cohortUpdates.name) {
      res.status(400).json({ error: 'Please provide a name for the cohort.' });
    } else {
      const updatedCount = await cohortsDb.update(id, cohortUpdates);
      if (!updatedCount) {
        res.status(404).json({ error: 'The cohort with the specified ID does not exist.' });
      } else {
        res.status(204).end();
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Cannot update cohort.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const cohort = await cohortsDb.getById(id);
    if (!cohort) {
      res.status(404).json({ error: 'The cohort with the specified ID does not exist.' });
    } else {
      await cohortsDb.delete(id);
      res.status(204).end();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Cannot delete cohort.' });
  }
});

module.exports = router;
