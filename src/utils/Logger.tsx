import React, { useEffect } from 'react';

interface LoggerProps {
  message: string;
}

const Logger: React.FC<LoggerProps> = ({ message }) => {
  useEffect(() => {
    console.log(`Hello from ${message}`);
  }, [message]);

  return null; // This component doesn't render anything in the DOM
};

export default Logger;
