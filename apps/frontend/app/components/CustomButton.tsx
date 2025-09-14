import React from "react";
import { uiTheme } from "../uiTheme";

export type CustomButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const baseButtonStyle: React.CSSProperties = {
  background: uiTheme.color.primary,
  color: '#fff',
  border: 'none',
  borderRadius: uiTheme.radius.md,
  padding: `${uiTheme.spacing.xs} ${uiTheme.spacing.md}`,
  boxShadow: uiTheme.shadow.sm,
  fontWeight: uiTheme.font.body,
  cursor: 'pointer',
  transition: 'background 0.2s',
};

const disabledButtonStyle: React.CSSProperties = {
  ...baseButtonStyle,
  opacity: 0.5,
  cursor: 'not-allowed',
};

export const CustomButton: React.FC<CustomButtonProps> = ({ children, disabled, style, ...props }) => (
  <button
    {...props}
    disabled={disabled}
    style={{
      ...(disabled ? disabledButtonStyle : baseButtonStyle),
      ...style,
    }}
  >
    {children}
  </button>
);
