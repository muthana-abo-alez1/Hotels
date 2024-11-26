import React from 'react';
import style from './NotFound.module.scss';

interface NotFoundProps {
  number?: number;
  msg?: string;
}

const NotFound: React.FC<NotFoundProps> = ({ number = 404, msg = 'Not Found' }) => {
  return (
    <div className={style.notFoundContainer}>
      <h1 className={style.notFoundHeading}>{number}</h1>
      <p className={style.notFoundMessage}>{msg}</p>
    </div>
  );
};

export default NotFound;
