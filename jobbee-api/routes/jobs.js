const express = require('express');
const router = new express.Router();
const { getJobs, newJob, getJobsInRadius } = require('../controllers/jobsController')

router.route('/jobs').get(getJobs)
router.route('/jobs/create').post(newJob)
router.route('/jobs/:zipcode/:distance').get(getJobsInRadius)

module.exports = router;