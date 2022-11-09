import React from "react";

export interface ButtonProps {
  children: string | React.ReactNode;
  type: string;
  active?: boolean;
  onclick: (e: React.MouseEvent<HTMLElement> | string) => void;
  loading?: boolean;
  to?: string;
}
