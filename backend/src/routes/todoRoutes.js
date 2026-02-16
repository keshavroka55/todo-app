const express = require('express');
const router = express.Router();
const {
    getTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo
} = require('../controllers/todoController');

// Routes for /api/todos
router.route('/')
    .get(getTodos)
    .post(createTodo);

// Routes for /api/todos/:id
router.route('/:id')
    .get(getTodo)
    .put(updateTodo)
    .delete(deleteTodo);

// Toggle completion
router.patch('/:id/toggle', toggleTodo);

module.exports = router;
