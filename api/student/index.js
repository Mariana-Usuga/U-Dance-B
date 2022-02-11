const { Router } = require('express');

const {
  getAllStudentsHandler,
  createStudentHandler,
  getStudentByIdHandler,
  updateStudentHandler,
  deleteStudentHandler,
} = require('./student.controller');

// const { isAuthenticated, hasRole } = require('../../auth/auth.services');
// hasRole(['user']),

const router = Router();

router.get('/', getAllStudentsHandler);

router.post('/', createStudentHandler);

router.get('/:id', getStudentByIdHandler);

router.patch('/:id', updateStudentHandler);

router.delete('/:id', deleteStudentHandler);

module.exports = router;
