const { Router } = require('express');

const {
  getAllCoursesHandler,
  createCourseHandler,
  getCourseByIdHandler,
  updateCourseHandler,
  deleteCourseHandler,
  updateCoursePaymentIdHandler,
  getAllCoursesByRhythmHandler
} = require('./course.controller');

const { isAuthenticated } = require('../../auth/auth.services');
// const { isAuthenticated, hasRole } = require('../../auth/auth.services');
// hasRole(['user']),
const router = Router();

router.get('/', getAllCoursesHandler);

router.get('/:rhythm', getAllCoursesByRhythmHandler);

router.post('/', createCourseHandler);

router.post('/updatePaymentId', isAuthenticated, updateCoursePaymentIdHandler);

router.get('/:id', getCourseByIdHandler);

router.patch('/:id', updateCourseHandler);

router.delete('/:id', deleteCourseHandler);

module.exports = router;
