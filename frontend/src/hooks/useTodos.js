import { useState, useEffect, useCallback } from 'react';
import todoService from '../services/todoService';

/**
 * Custom hook for managing todos
 * Provides todo state and all CRUD operations
 */
export const useTodos = (initialFilters = {}) => {
    // State
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState(initialFilters);
    const [stats, setStats] = useState({
        total: 0,
        completed: 0,
        pending: 0,
    });

    // Update stats whenever todos change
    useEffect(() => {
        setStats({
            total: todos.length,
            completed: todos.filter(t => t.completed).length,
            pending: todos.filter(t => !t.completed).length,
        });
    }, [todos]);

    /**
     * Load todos with current filters
     */
    const loadTodos = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await todoService.getTodos(filters);
            // Normalize _id to id for consistency
            const normalizedTodos = data.map(todo => ({
                ...todo,
                id: todo._id || todo.id
            }));
            setTodos(normalizedTodos);
        } catch (err) {
            setError(err.message);
            console.error('Error loading todos:', err);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    // Load todos on mount and when filters change
    useEffect(() => {
        loadTodos();
    }, [loadTodos]);

    /**
     * Add a new todo
     * @param {Object} todoData - Todo data to add
     * @returns {Object} Result with success status and data/error
     */
    const addTodo = async (todoData) => {
        setLoading(true);
        setError(null);

        try {
            const data = await todoService.createTodo(todoData);
            const normalizedTodo = { ...data, id: data._id || data.id };
            setTodos(prev => [normalizedTodo, ...prev]);
            return { success: true, data: normalizedTodo };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    /**
     * Update an existing todo
     * @param {string} id - Todo ID
     * @param {Object} todoData - Updated data
     * @returns {Object} Result with success status and data/error
     */
    const updateTodo = async (id, todoData) => {
        setLoading(true);
        setError(null);

        try {
            const data = await todoService.updateTodo(id, todoData);
            const normalizedTodo = { ...data, id: data._id || data.id };
            setTodos(prev =>
                prev.map(todo => (todo.id === id || todo._id === id) ? normalizedTodo : todo)
            );
            return { success: true, data: normalizedTodo };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    /**
     * Delete a todo
     * @param {string} id - Todo ID to delete
     * @returns {Object} Result with success status
     */
    const deleteTodo = async (id) => {
        setLoading(true);
        setError(null);

        try {
            await todoService.deleteTodo(id);
            setTodos(prev => prev.filter(todo => (todo.id !== id && todo._id !== id)));
            return { success: true };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    /**
     * Toggle todo completion status
     * @param {string} id - Todo ID
     * @returns {Object} Result with success status and data/error
     */
    const toggleTodo = async (id) => {
        try {
            const data = await todoService.toggleTodoComplete(id);
            const normalizedTodo = { ...data, id: data._id || data.id };
            setTodos(prev =>
                prev.map(todo => (todo.id === id || todo._id === id) ? normalizedTodo : todo)
            );
            return { success: true, data: normalizedTodo };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        }
    };

    /**
     * Update filters
     * @param {Object} newFilters - New filter values
     */
    const updateFilters = (newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    /**
     * Clear all filters
     */
    const clearFilters = () => {
        setFilters({});
    };

    // Return all state and functions
    return {
        // State
        todos,
        loading,
        error,
        filters,
        stats,

        // CRUD Operations
        addTodo,
        updateTodo,
        deleteTodo,
        toggleTodo,

        // Filter Operations
        updateFilters,
        clearFilters,
        refreshTodos: loadTodos,
    };
};