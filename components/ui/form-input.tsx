import React, { useState } from 'react';

export interface FormInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  error?: string;
  onChange?: (value: string) => void;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  placeholder = 'Input Field',
  value = '',
  onChange,
  error,
  disabled = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputId = React.useId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <>
      <style>
        {`
          #${inputId}:-webkit-autofill,
          #${inputId}:-webkit-autofill:hover,
          #${inputId}:-webkit-autofill:focus,
          #${inputId}:-webkit-autofill:active {
            -webkit-background-clip: text;
            -webkit-text-fill-color: #ffffff;
            transition: background-color 5000s ease-in-out 0s;
            box-shadow: inset 0 0 20px 20px rgba(0, 0, 0, 0.2);
          }
        `}
      </style>
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
            htmlFor={inputId}
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
        <input
          id={inputId}
          type="text"
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
            height: '56px',
            boxSizing: 'border-box',
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
    </>
  );
};
