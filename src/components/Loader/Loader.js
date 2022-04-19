import React from 'react';
import { SpinnerCircular } from 'spinners-react';
import s from './Loader.module.css';

const Loader = () => {
  return (
    <div className={s.loader}>
      <SpinnerCircular />
    </div>
  );
};

export default Loader;
