const { Router } = require('express');

const {
  getAllUsersHandler,
  createUserHandler,
  getUserByIdHandler,
  updateUserHandler,
  deleteUserHandler,
  updateUserCourseIdHandler,
  updateUserPaymentIdHandler,
  getUserMeHandler
} = require('./user.controller');
const { everyDayHandler } = require('./user.service');
const { isAuthenticated } = require('../../auth/auth.services')
// const { isAuthenticated, hasRole } = require('../../auth/auth.services');
// hasRole(['user']),

const router = Router();

router.get('/', getAllUsersHandler);

// router.get('/everyDay', everyDayHandler);

router.get('/me', isAuthenticated, getUserMeHandler);

router.post('/updateCourseId/:id', isAuthenticated, updateUserCourseIdHandler);

router.post('/updatePaymentId/:id', isAuthenticated, updateUserPaymentIdHandler);

router.post('/', createUserHandler);

router.get('/:id', getUserByIdHandler);

router.patch('/:id', updateUserHandler);

router.delete('/:id', deleteUserHandler);

module.exports = router;
