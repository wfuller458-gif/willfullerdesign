import React from 'react';

export function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.75 19.5L8.25 12L15.75 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.25 4.5L15.75 12L8.25 19.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronUp({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.5 15.75L12 8.25L19.5 15.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.5 8.25L12 15.75L4.5 8.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowRight({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      className={className}
      style={style}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 12H19M19 12L12 5M19 12L12 19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.5 19.5L19.5 4.5M19.5 4.5H8.25M19.5 4.5V15.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Close({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 18L18 6M6 6L18 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Menu({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 12H21M3 6H21M3 18H21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WhatsApp({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_82_2118)">
        <path
          d="M19.9319 4.02224C17.9144 2.00474 15.1274 0.756744 12.0487 0.756744C5.8919 0.756744 0.899902 5.74799 0.899902 11.9055C0.899902 13.9545 1.45265 15.8737 2.4164 17.5237L2.3879 17.4712L0.806152 23.2477L6.7154 21.6975C8.25365 22.5517 10.0889 23.0542 12.0419 23.0542H12.0464C18.2032 23.052 23.1929 18.06 23.1929 11.9032C23.1929 8.82599 21.9464 6.04049 19.9312 4.02299L19.9319 4.02224ZM12.0464 21.171H12.0427C10.3034 21.171 8.67515 20.691 7.2854 19.8562L7.3274 19.8795L6.98915 19.6792L3.4829 20.5995L4.41815 17.1802L4.19765 16.83C3.3089 15.4335 2.7809 13.7317 2.7809 11.9062C2.7809 6.78974 6.92915 2.64149 12.0457 2.64149C17.1622 2.64149 21.3104 6.78974 21.3104 11.9062C21.3104 17.0227 17.1637 21.171 12.0464 21.171ZM17.1284 14.2327C16.8502 14.0932 15.4807 13.4205 15.2257 13.3267C14.9699 13.2337 14.7839 13.188 14.5979 13.467C14.4134 13.7452 13.8794 14.3722 13.7167 14.5582C13.5547 14.745 13.3912 14.7675 13.1129 14.6287C12.2504 14.2792 11.5094 13.8135 10.8652 13.2397L10.8727 13.2465C10.2734 12.6915 9.75965 12.0562 9.3449 11.3557L9.3239 11.3167C9.1619 11.0385 9.30665 10.8877 9.4454 10.749C9.57065 10.6245 9.7244 10.4235 9.86315 10.2615C9.97265 10.1272 10.0664 9.97349 10.1377 9.80849L10.1422 9.79574C10.1744 9.73049 10.1932 9.65475 10.1932 9.57374C10.1932 9.47549 10.1654 9.38399 10.1174 9.30599L10.1189 9.30824C10.0484 9.16875 9.4919 7.79774 9.26015 7.23974C9.03365 6.69674 8.8034 6.77099 8.63315 6.76199C8.47115 6.75449 8.28515 6.75299 8.09915 6.75299C7.8029 6.76049 7.53965 6.89399 7.35815 7.10024L7.3574 7.10174C6.7559 7.67249 6.3824 8.47724 6.3824 9.36899C6.3824 9.38849 6.3824 9.40874 6.38315 9.42824V9.42525C6.4814 10.5255 6.8939 11.5132 7.5284 12.318L7.5194 12.3067C8.7224 14.091 10.3259 15.5182 12.2077 16.4797L12.2782 16.512C12.6892 16.698 13.2157 16.8967 13.7542 17.067L13.8659 17.0977C14.1974 17.2027 14.5792 17.2635 14.9752 17.2635C15.2024 17.2635 15.4259 17.2432 15.6419 17.205L15.6187 17.208C16.4204 17.0407 17.0857 16.557 17.4914 15.8962L17.4982 15.8835C17.6219 15.609 17.6939 15.2887 17.6939 14.952C17.6939 14.8132 17.6819 14.6775 17.6587 14.5455L17.6609 14.5597C17.5919 14.4435 17.4059 14.3745 17.1269 14.2342L17.1284 14.2327Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_82_2118">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
