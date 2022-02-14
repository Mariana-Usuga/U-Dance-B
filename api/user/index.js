const { Router } = require('express');

const {
  getAllUsersHandler,
  createUserHandler,
  getUserByIdHandler,
  updateUserHandler,
  deleteUserHandler,
} = require('./user.controller');

// const { isAuthenticated, hasRole } = require('../../auth/auth.services');
// hasRole(['user']),

const router = Router();

router.get('/', getAllUsersHandler);

router.post('/', createUserHandler);

router.get('/:id', getUserByIdHandler);

router.patch('/:id', updateUserHandler);

router.delete('/:id', deleteUserHandler);

module.exports = router;
