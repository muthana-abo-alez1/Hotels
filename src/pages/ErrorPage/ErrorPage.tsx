import React from 'react';
import style from './ErrorPage.module.scss';

interface ErrorPageProps {
  number?: number;
  msg?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ number = 404, msg = 'Not Found' }) => {
  return (
    <div className={style.notFoundContainer}>
      <h1 className={style.notFoundHeading}>{number}</h1>
      <p className={style.notFoundMessage}>{msg}</p>
    </div>
  );
};

export default ErrorPage;
