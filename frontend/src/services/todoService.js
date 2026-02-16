import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

class TodoService {
    /**
     * Get all todos with optional filters
     * @param {Object} filters - Filter parameters
     * @returns {Promise} Promise with todos data
     */
    async getTodos(filters = {}) {
        try {
            const params = new URLSearchParams();

            if (filters.completed !== undefined) {
                params.append('completed', filters.completed);
            }
            if (filters.priority) {
                params.append('priority', filters.priority);
            }
            if (filters.search) {
                params.append('search', filters.search);
            }

            const queryString = params.toString();
            const url = `${API_ENDPOINTS.TODOS}${queryString ? `?${queryString}` : ''}`;

            const response = await api.get(url);
            // Return the data array from backend { success: true, data: [...] }
            return response.data.data || [];
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Get a single todo by ID
     * @param {string} id - Todo ID
     * @returns {Promise} Promise with todo data
     */
    async getTodoById(id) {
        try {
            const response = await api.get(API_ENDPOINTS.TODO_BY_ID(id));
            return response.data.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Create a new todo
     * @param {Object} todoData - Todo data
     * @returns {Promise} Promise with created todo
     */
    async createTodo(todoData) {
        try {
            const response = await api.post(API_ENDPOINTS.TODOS, todoData);
            return response.data.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Update an existing todo
     * @param {string} id - Todo ID
     * @param {Object} todoData - Updated todo data
     * @returns {Promise} Promise with updated todo
     */
    async updateTodo(id, todoData) {
        try {
            const response = await api.put(API_ENDPOINTS.TODO_BY_ID(id), todoData);
            return response.data.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Delete a todo
     * @param {string} id - Todo ID
     * @returns {Promise} Promise with deletion result
     */
    async deleteTodo(id) {
        try {
            const response = await api.delete(API_ENDPOINTS.TODO_BY_ID(id));
            return response.data.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Toggle todo completion status
     * @param {string} id - Todo ID
     * @returns {Promise} Promise with updated todo
     */
    async toggleTodoComplete(id) {
        try {
            const response = await api.patch(API_ENDPOINTS.TOGGLE_TODO(id));
            return response.data.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Handle API errors
     * @param {Error} error - Error object
     * @returns {Error} Formatted error
     */
    handleError(error) {
        if (error.response) {
            // Server returned an error response
            const message = error.response.data?.message || 'Server error occurred';
            return new Error(message);
        } else if (error.request) {
            // Request was made but no response
            return new Error('Unable to connect to server. Please check your internet connection.');
        } else {
            // Something else happened
            return new Error(error.message || 'An unexpected error occurred');
        }
    }
}

// Create and export a single instance
const todoService = new TodoService();
export default todoService;