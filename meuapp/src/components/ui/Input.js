import React from 'react';
import './Input.css';

export default function Input({ label, error, icon: Icon, className = '', ...props }) {
  return (
    <div className={`input-wrapper ${className}`}>
      {label && <label className="input-label" htmlFor={props.id}>{label}</label>}
      <div className="input-container">
        {Icon && <Icon className="input-icon" size={18} />}
        <input 
          className={`input-field ${Icon ? 'with-icon' : ''} ${error ? 'input-error' : ''}`} 
          {...props} 
        />
      </div>
      {error && <span className="error-text">{error}</span>}
    </div>
  );
}
