import React, { useState } from 'react';

export interface FormTextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  label?: string;
  error?: string;
  onChange?: (value: string) => void;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  placeholder = 'Input Field',
  value = '',
  onChange,
  error,
  disabled = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        width: '100%'
      }}
    >
      {label && (
        <label
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '140%',
            color: 'var(--brand-white)',
            letterSpacing: 0
          }}
        >
          {label}
        </label>
      )}
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={disabled}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          border: error
            ? '1px solid #ff4444'
            : isFocused
              ? '1px solid rgba(255, 255, 255, 0.6)'
              : '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '4px',
          padding: '16px',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 300,
          fontSize: '20px',
          lineHeight: '140%',
          color: value ? 'var(--brand-white)' : 'rgba(255, 255, 255, 0.5)',
          outline: 'none',
          transition: 'border-color 0.2s ease',
          width: '100%',
          height: '150px',
          boxSizing: 'border-box',
          resize: 'none',
          letterSpacing: 0
        }}
        {...props}
      />
      {error && (
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 300,
            fontSize: '12px',
            lineHeight: '140%',
            color: '#ff4444',
            margin: 0,
            letterSpacing: 0
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
};
