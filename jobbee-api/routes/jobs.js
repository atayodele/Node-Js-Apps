const express = require('express');
const router = new express.Router();
const { 
    getJobs, 
    newJob, 
    getJobsInRadius, 
    updateJob, 
    deleteJob, 
    getJob, 
    jobStats,
    applyJob
} = require('../controllers/jobsController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/jobs').get(getJobs)
router.route('/jobs/:id/:slug').get(getJob)
router.route('/jobs/create').post(isAuthenticatedUser, authorizeRoles('user', 'admin'), newJob)
router.route('/jobs/:zipcode/:distance').get(getJobsInRadius)
router.route('/stats/:topic').get(jobStats)
router.route('/job/:id/apply').put(isAuthenticatedUser, authorizeRoles('user'), applyJob)
router.route('/job/:id')
    .put(isAuthenticatedUser, authorizeRoles('employeer', 'admin'), updateJob)
    .delete(isAuthenticatedUser, authorizeRoles('employeer', 'admin'), deleteJob);

module.exports = router;