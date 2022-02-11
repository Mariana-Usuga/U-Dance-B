const { Router } = require('express');

const {
  getAllCoursesHandler,
  createCourseHandler,
  getCourseByIdHandler,
  updateCourseHandler,
  deleteCourseHandler,
} = require('./course.controller');

// const { isAuthenticated, hasRole } = require('../../auth/auth.services');
// hasRole(['user']),

const router = Router();

router.get('/', getAllCoursesHandler);

router.post('/', createCourseHandler);

router.get('/:id', getCourseByIdHandler);

router.patch('/:id', updateCourseHandler);

router.delete('/:id', deleteCourseHandler);

module.exports = router;
