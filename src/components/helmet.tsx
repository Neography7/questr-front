import React from 'react';
import { Helmet as ReactHelmet } from 'react-helmet';

interface HelmetProps {
    title?: string,
    children?: React.ReactNode
}

const Helmet: React.FC<HelmetProps> = ({ title, children }) => {

    const siteName = "Questr"
    const pageTitle = title ? `${title} - ${siteName}` : `${siteName}`

  return (
    <ReactHelmet>
      <title>{pageTitle}</title>
      {children}
    </ReactHelmet>
  );
};

export default Helmet;