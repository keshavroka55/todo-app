import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTodo } from '../context/TodoContext';
import Loader from '../components/Loader';
import { PRIORITY_LEVELS } from '../utils/constants';

const EditTodo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { todos, updateTodo, loading } = useTodo();

  // Find the todo to edit
  const existingTodo = todos.find(t => t.id === id);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: PRIORITY_LEVELS.MEDIUM,
    completed: false
  });

  const [pageLoading, setPageLoading] = useState(true);
  const [errors, setErrors] = useState({});

  // Load todo data
  useEffect(() => {
    if (existingTodo) {
      setFormData({
        title: existingTodo.title,
        description: existingTodo.description || '',
        priority: existingTodo.priority || PRIORITY_LEVELS.MEDIUM,
        completed: existingTodo.completed
      });
    }
    setPageLoading(false);
  }, [existingTodo]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = await updateTodo(id, formData);
    if (result.success) {
      navigate('/');
    }
  };

  // If todo not found
  if (!pageLoading && !existingTodo) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="card max-w-md mx-auto">
          <div className="text-6xl mb-4">❓</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Task Not Found</h1>
          <p className="text-gray-600 mb-6">
            The task you're looking for doesn't exist or has been deleted.
          </p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (pageLoading) return <Loader />;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="card mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Edit Task</h1>
        <p className="text-gray-600">
          Update your task details below
        </p>
      </div>

      {/* Form */}
      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              disabled={loading}
              className={`input-field ${errors.title ? 'border-red-500' : ''}`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          {/* Description field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              disabled={loading}
              className="input-field"
            />
          </div>

          {/* Priority field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              disabled={loading}
              className="input-field"
            >
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </select>
          </div>

          {/* Status checkbox */}
          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
            <input
              type="checkbox"
              name="completed"
              id="completed"
              checked={formData.completed}
              onChange={handleChange}
              disabled={loading}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="completed" className="ml-2 text-sm text-gray-700">
              Mark as completed
            </label>
          </div>

          {/* Form actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => navigate('/')}
              disabled={loading}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              {loading ? 'Updating...' : 'Update Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTodo;