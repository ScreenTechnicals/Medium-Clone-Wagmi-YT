import React, { ComponentProps } from "react";
import { twJoin } from "tailwind-merge";
import { ImSpinner2 } from "react-icons/im";

type ButtonProps = ComponentProps<"button"> & {
  color: string;
  loading?: boolean;
  block?: boolean;
};

export const Button = ({
  children,
  className,
  color,
  loading,
  block,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={twJoin(
        "text-base md:text-xl font-medium p-2 md:p-3 hover:bg-[#fff] hover:text-black transition-colors rounded-md flex items-center gap-1 justify-center",
        block ? `bg-[${color}]` : `border border-[${color}]`,
        loading &&
          "bg-[#494949] hover:text-white hover:bg-[#494949] disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {loading && <ImSpinner2 size={30} className="animate-spin" />}
    </button>
  );
};
