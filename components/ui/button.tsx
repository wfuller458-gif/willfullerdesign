import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowUpRight, WhatsApp, Menu, ArrowRight } from "./icons";

const buttonVariants = cva(
  "group inline-flex items-center gap-2 font-sans transition-colors disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        "primary-black": "justify-center rounded-full border border-brand-black text-brand-black hover:bg-brand-orange px-4 py-4 text-xl font-light",
        "secondary-black": "justify-center rounded-full border border-brand-black text-brand-black hover:bg-brand-white px-4 py-4 text-xl font-light",
        "primary-white": "justify-center rounded-full border border-brand-white text-brand-white hover:bg-brand-orange hover:text-brand-black hover:border-brand-black px-4 py-4 text-xl font-light",
        "secondary-white": "justify-center rounded-full border border-brand-white text-brand-white hover:bg-brand-white-30 px-4 py-4 text-xl font-light",
        "whatsapp": "justify-center rounded-full border border-brand-white text-brand-white hover:bg-brand-whatsapp hover:text-brand-black hover:border-brand-black px-4 py-4 text-xl font-light",
        "menu": "text-brand-black text-base font-medium",
        "text-icon": "text-brand-black text-xl font-light",
      },
      size: {
        default: "",
      }
    },
    defaultVariants: {
      variant: "primary-black",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, asChild, ...props }, ref) => {
    const isWhatsApp = variant === "whatsapp";
    const isMenu = variant === "menu";
    const isTextIcon = variant === "text-icon";
    const hasAnimatedIcon = variant === "primary-black" || variant === "primary-white" ||
                            variant === "secondary-black" || variant === "secondary-white";

    return (
      <button
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      >
        {isMenu && (
          <span className="relative overflow-hidden inline-flex items-center justify-center w-6 h-6">
            <Menu className="w-6 h-6 transition-transform duration-[750ms] ease-[cubic-bezier(0.16,1.2,0.3,1)] group-hover:-translate-y-full" />
            <Menu className="w-6 h-6 absolute translate-y-full transition-transform duration-[750ms] ease-[cubic-bezier(0.16,1.2,0.3,1)] group-hover:translate-y-0" />
          </span>
        )}

        {isWhatsApp && (
          <span className="relative overflow-hidden inline-flex items-center justify-center w-6 h-6">
            <WhatsApp className="w-6 h-6 transition-transform duration-[750ms] ease-[cubic-bezier(0.16,1.2,0.3,1)] group-hover:-translate-y-full" />
            <WhatsApp className="w-6 h-6 absolute translate-y-full transition-transform duration-[750ms] ease-[cubic-bezier(0.16,1.2,0.3,1)] group-hover:translate-y-0" />
          </span>
        )}

        <span className="relative overflow-hidden inline-block whitespace-nowrap">
          <span className="inline-block whitespace-nowrap transition-transform duration-[750ms] ease-[cubic-bezier(0.16,1.2,0.3,1)] group-hover:-translate-y-full">
            {children}
          </span>
          <span className="absolute inset-0 inline-block whitespace-nowrap translate-y-full transition-transform duration-[750ms] ease-[cubic-bezier(0.16,1.2,0.3,1)] group-hover:translate-y-0">
            {children}
          </span>
        </span>

        {isTextIcon && (
          <span className="relative overflow-hidden inline-flex items-center justify-center w-6 h-6">
            <ArrowRight className="w-6 h-6 transition-transform duration-[750ms] ease-[cubic-bezier(0.16,1.2,0.3,1)] group-hover:translate-x-[100%]" />
            <ArrowRight className="w-6 h-6 absolute -translate-x-[100%] transition-transform duration-[750ms] ease-[cubic-bezier(0.16,1.2,0.3,1)] group-hover:translate-x-0" />
          </span>
        )}

        {!isWhatsApp && !isMenu && !isTextIcon && hasAnimatedIcon && (
          <span className="relative overflow-hidden inline-flex items-center justify-center w-6 h-6">
            <ArrowUpRight className="w-6 h-6 transition-transform duration-[750ms] ease-[cubic-bezier(0.16,1.2,0.3,1)] group-hover:translate-x-[100%] group-hover:-translate-y-[100%]" />
            <ArrowUpRight className="w-6 h-6 absolute -translate-x-[100%] translate-y-[100%] transition-transform duration-[750ms] ease-[cubic-bezier(0.16,1.2,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0" />
          </span>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
