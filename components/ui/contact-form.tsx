import React, { useState } from 'react';
import { FormInput } from './form-input';
import { FormTextarea } from './form-textarea';
import { Button } from './button';

export interface ContactFormProps {
  onClose?: () => void;
  onSubmit?: (data: ContactFormData) => void;
  onBack?: () => void;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  project: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  onClose,
  onSubmit,
  onBack
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [project, setProject] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (isSubmitting) return;

    // Basic validation
    if (!name || !email || !phone || !project) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          project,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Call the original onSubmit callback to show success message
      onSubmit?.({
        name,
        email,
        phone,
        project
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        width: '531px',
        height: 'calc(100vh - 32px)',
        position: 'relative',
        borderRadius: '8px',
        overflow: 'hidden'
      }}
    >
      {/* Background with blur */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(30, 30, 28, 0.7)',
          backdropFilter: 'blur(15px)',
          WebkitBackdropFilter: 'blur(15px)',
          borderRadius: '8px',
          pointerEvents: 'none'
        }}
      />

      {/* SVG gradient stroke overlay */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 10
        }}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="contactStroke" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1D1D1D" />
            <stop offset="50%" stopColor="#51514C" />
            <stop offset="100%" stopColor="#1E1E1C" />
          </linearGradient>
        </defs>
        <rect
          x="2"
          y="2"
          width="calc(100% - 4px)"
          height="calc(100% - 4px)"
          rx="8"
          fill="none"
          stroke="url(#contactStroke)"
          strokeWidth="4"
        />
      </svg>

      {/* Scrollable content wrapper */}
      <div
        style={{
          width: '100%',
          height: '100%',
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'auto',
          zIndex: 1
        }}
      >
        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            marginBottom: '32px'
          }}
        >
          {/* Header with title and close button */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              width: '100%'
            }}
          >
            <h1
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 300,
                fontSize: '64px',
                lineHeight: '1',
                color: 'var(--brand-white)',
                textTransform: 'capitalize',
                margin: 0,
                letterSpacing: 0
              }}
            >
              Contact
            </h1>

            <button
              onClick={onClose}
              style={{
                width: '32px',
                height: '32px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Close contact form"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  color: 'var(--brand-white)'
                }}
              >
                <path
                  d="M24 8L8 24M8 8L24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Form fields */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}
          >
            <FormInput
              label="Name"
              placeholder="Name"
              value={name}
              onChange={setName}
            />

            <FormInput
              label="Email"
              placeholder="Email"
              value={email}
              onChange={setEmail}
            />

            <FormInput
              label="Phone"
              placeholder="Phone number"
              value={phone}
              onChange={setPhone}
            />

            <FormTextarea
              label="Tell Us About Your Project"
              placeholder="Your project"
              value={project}
              onChange={setProject}
            />
          </div>
        </div>

        {/* Back and Submit buttons */}
        <div
          style={{
            display: 'flex',
            justifyContent: onBack ? 'space-between' : 'flex-end',
            width: '100%'
          }}
        >
          {onBack && (
            <button
              onClick={onBack}
              className="group"
              style={{
                border: '1px solid var(--brand-white)',
                borderRadius: '100px',
                padding: '16px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 300,
                fontSize: '20px',
                color: 'var(--brand-white)',
                lineHeight: 'normal',
                letterSpacing: 0,
                transition: 'background-color 200ms'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {/* Animated back arrow icon */}
              <span className="relative overflow-hidden inline-flex items-center justify-center w-6 h-6">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 transition-transform duration-[750ms] ease-[cubic-bezier(0.16,1.2,0.3,1)] group-hover:-translate-x-full"
                >
                  <path
                    d="M9 15L3 9M3 9L9 3M3 9H15C16.5913 9 18.1174 9.63214 19.2426 10.7574C20.3679 11.8826 21 13.4087 21 15C21 16.5913 20.3679 18.1174 19.2426 19.2426C18.1174 20.3679 16.5913 21 15 21H12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 absolute translate-x-full transition-transform duration-[750ms] ease-[cubic-bezier(0.16,1.2,0.3,1)] group-hover:translate-x-0"
                >
                  <path
                    d="M9 15L3 9M3 9L9 3M3 9H15C16.5913 9 18.1174 9.63214 19.2426 10.7574C20.3679 11.8826 21 13.4087 21 15C21 16.5913 20.3679 18.1174 19.2426 19.2426C18.1174 20.3679 16.5913 21 15 21H12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              {/* Animated text */}
              <span className="relative overflow-hidden inline-block whitespace-nowrap">
                <span className="inline-block whitespace-nowrap transition-transform duration-[750ms] ease-[cubic-bezier(0.16,1.2,0.3,1)] group-hover:-translate-y-full">
                  Back
                </span>
                <span className="absolute inset-0 inline-block whitespace-nowrap translate-y-full transition-transform duration-[750ms] ease-[cubic-bezier(0.16,1.2,0.3,1)] group-hover:translate-y-0">
                  Back
                </span>
              </span>
            </button>
          )}

          <Button variant="secondary-white" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </div>
    </div>
  );
};
