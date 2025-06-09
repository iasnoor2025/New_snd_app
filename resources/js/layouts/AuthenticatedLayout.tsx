import React from 'react';

const AuthenticatedLayout = ({ children, ...props }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default AuthenticatedLayout;
