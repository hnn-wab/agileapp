import React from "react";
import { uiTheme } from "../uiTheme";

export type CustomBadgeProps = {
  type?: "default" | "success" | "warning";
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const baseBadgeStyle: React.CSSProperties = {
  background: uiTheme.color.primary + '20',
  color: uiTheme.color.primary,
  borderRadius: uiTheme.radius.sm,
  padding: `${uiTheme.spacing.xs} ${uiTheme.spacing.sm}`,
  fontSize: '0.75rem',
  fontWeight: 500,
  display: 'inline-block',
};

const successBadgeStyle: React.CSSProperties = {
  ...baseBadgeStyle,
  background: uiTheme.color.secondary + '20', // グレー系
  color: uiTheme.color.secondary,
};

const warningBadgeStyle: React.CSSProperties = {
  ...baseBadgeStyle,
  background: uiTheme.color.primary + '10', // 薄い黒系
  color: uiTheme.color.primary,
};

export const CustomBadge: React.FC<CustomBadgeProps> = ({ type = "default", children, style }) => {
  let badgeStyle = baseBadgeStyle;
  if (type === "success") badgeStyle = successBadgeStyle;
  if (type === "warning") badgeStyle = warningBadgeStyle;
  return <span style={{ ...badgeStyle, ...style }}>{children}</span>;
};
