const express = require('express');
const db = require('../data/cohorts');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const cohorts = await db.getAll();
    res.status(200).json(cohorts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Cannot get cohorts.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const cohort = await db.getById(id);
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

router.post('/', async (req, res) => {
  try {
    const { body: cohort } = req;
    if (!cohort.name) {
      res.status(400).json({ error: 'Please provide a name for the cohort.' });
    } else {
      const [newCohortId] = await db.create(cohort);
      const newCohort = await db.getById(newCohortId);
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
      const updatedCount = await db.update(id, cohortUpdates);
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
    const cohort = await db.getById(id);
    if (!cohort) {
      res.status(404).json({ error: 'The cohort with the specified ID does not exist.' });
    } else {
      await db.delete(id);
      res.status(204).end();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Cannot delete cohort.' });
  }
});

module.exports = router;
