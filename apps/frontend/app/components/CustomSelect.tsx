import React from "react";
import { uiTheme } from "../uiTheme";

export type CustomSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  children: React.ReactNode;
};

const baseSelectStyle: React.CSSProperties = {
  border: `1px solid ${uiTheme.color.border}`,
  borderRadius: uiTheme.radius.md,
  padding: `${uiTheme.spacing.xs} ${uiTheme.spacing.sm}`,
  fontSize: '1rem',
  background: uiTheme.color.card,
  color: uiTheme.color.text,
  outline: 'none',
  boxShadow: uiTheme.shadow.sm,
  transition: 'border-color 0.2s, box-shadow 0.2s, background 0.2s',
  width: '100%',
  minWidth: '120px',
  margin: '0',
  appearance: 'none',
  cursor: 'pointer',
  backgroundImage:
    "url('data:image/svg+xml;utf8,<svg fill=\'gray\' height=\'16\' viewBox=\'0 0 20 20\' width=\'16\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7.293 7.293a1 1 0 011.414 0L10 8.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z\'/></svg>')",
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 0.5rem center',
  backgroundSize: '1.25em',
};

const disabledSelectStyle: React.CSSProperties = {
  ...baseSelectStyle,
  background: uiTheme.color.bg,
  color: uiTheme.color.muted,
  cursor: 'not-allowed',
  opacity: 0.6,
};

export const CustomSelect: React.FC<CustomSelectProps> = ({ children, disabled, style, ...props }) => (
  <select
    {...props}
    disabled={disabled}
    style={{
      ...(disabled ? disabledSelectStyle : baseSelectStyle),
      ...style,
    }}
  >
    {children}
  </select>
);
