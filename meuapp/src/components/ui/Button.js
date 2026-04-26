import React from 'react';
import './Button.css';

export default function Button({ children, variant = 'primary', isLoading, className = '', ...props }) {
  return (
    <button 
      className={`btn btn-${variant} ${isLoading ? 'btn-loading' : ''} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? <span className="loader"></span> : children}
    </button>
  );
}
