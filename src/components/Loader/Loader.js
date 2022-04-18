import React from 'react';
import { Oval } from 'react-loader-spinner';
import s from './Loader.module.css'


const Loader = () => {
    return (
        <div className={s.loader}>
            <Oval
  ariaLabel="loading-indicator"
  height={100}
  width={100}
  strokeWidth={5}
  color="grey"
  secondaryColor="blue"
            />
        </div>
        
    )
}

export default Loader;
