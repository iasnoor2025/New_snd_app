import React from 'react';

export function AlertDialog({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function AlertDialogTrigger({ children, ...props }: any) {
  return <button {...props}>{children}</button>;
}

export function AlertDialogContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function AlertDialogHeader({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function AlertDialogFooter({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function AlertDialogTitle({ children }: { children: React.ReactNode }) {
  return <h2>{children}</h2>;
}

export function AlertDialogDescription({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>;
}

export const AlertDialogCancel = ({ children, ...props }: any) => (
  <button {...props}>{children || 'Cancel'}</button>
);

export const AlertDialogAction = ({ children, ...props }: any) => (
  <button {...props}>{children || 'Action'}</button>
);
