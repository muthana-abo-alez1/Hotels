import React from 'react';
import { Link } from 'react-router-dom';
import style from './NotFound.module.scss'; 

const NotFound: React.FC = () => {
  return (
    <div className={style.notFoundContainer}>
      <h1 className={style.notFoundHeading}>404</h1>
      <p className={style.notFoundMessage}>Oops! The page you're looking for doesn't exist.</p>
    </div>
  );
};

export default NotFound;
