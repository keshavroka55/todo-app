import React from 'react';

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in child component tree
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to an error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
            <div className="text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Something went wrong
              </h1>
              <p className="text-gray-600 mb-4">
                {this.state.error?.message || 'An unexpected error occurred'}
              </p>
              {this.props.showDetails && this.state.errorInfo && (
                <details className="text-left text-sm bg-gray-50 p-4 rounded mb-4">
                  <summary className="cursor-pointer text-blue-600 mb-2">
                    Error Details
                  </summary>
                  <pre className="whitespace-pre-wrap text-red-600">
                    {this.state.error?.stack}
                  </pre>
                </details>
              )}
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;