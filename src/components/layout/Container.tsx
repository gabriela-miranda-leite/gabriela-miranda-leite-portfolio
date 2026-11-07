import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className = '' }: ContainerProps) {
  return (
    <div
      className={className}
      style={{
        maxWidth: '1120px',
        marginInline: 'auto',
        paddingInline: '1rem',
        width: '100%',
      }}
    >
      {children}
    </div>
  );
}
