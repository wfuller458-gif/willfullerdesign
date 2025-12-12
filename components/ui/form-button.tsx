import React from 'react';

export interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  variant?: 'date' | 'time';
}

export const FormButton: React.FC<FormButtonProps> = ({
  selected = false,
  disabled = false,
  variant = 'time',
  children,
  onClick,
  ...props
}) => {
  const baseStyles: React.CSSProperties = {
    border: selected ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '4px',
    padding: '8px 16px',
    fontFamily: 'Inter, sans-serif',
    fontWeight: selected ? 600 : 400,
    color: 'var(--brand-white)',
    background: selected ? 'rgba(255, 255, 255, 0.3)' : 'transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.3 : 1,
    transition: 'background-color 0.2s ease, opacity 0.2s ease, border-color 0.2s ease, font-weight 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: '140%',
    letterSpacing: 0
  };

  const dateStyles: React.CSSProperties = {
    ...baseStyles,
    width: '73px',
    gap: '4px'
  };

  const timeStyles: React.CSSProperties = {
    ...baseStyles,
    minWidth: 'auto',
    flexGrow: 1,
    flexBasis: 0
  };

  const styles = variant === 'date' ? dateStyles : timeStyles;

  return (
    <button
      style={styles}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
