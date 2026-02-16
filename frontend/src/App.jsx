// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TodoProvider } from './context/TodoContext';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Footer from './components/Footer';

// Import all your pages
import Home from './pages/Home';
import AddTodo from './pages/AddTodo';
import EditTodo from './pages/EditTodo';
import Completed from './pages/Completed';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <TodoProvider>
          <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />
            
            <main className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                {/* Home Route - Main todo list */}
                <Route path="/" element={<Home />} />
                
                {/* Add Todo Route - Form to create new todo */}
                <Route path="/add" element={<AddTodo />} />
                
                {/* Edit Todo Route - Dynamic route with ID parameter */}
                <Route path="/edit/:id" element={<EditTodo />} />
                
                {/* Completed Tasks Route - Filtered view */}
                <Route path="/completed" element={<Completed />} />
                
                {/* 404 Not Found Route */}
                <Route path="/404" element={<NotFound />} />
                
                {/* Redirect any unknown routes to 404 */}
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </main>
            
            <Footer />
          </div>
        </TodoProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;