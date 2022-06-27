import React, { useRef, useImperativeHandle } from 'react';

import classes from './Input.module.css';

export const Input = React.forwardRef(({
  onChange,
  onBlur,
  value,
  isValid,
  id,
  type,
  title
}, ref) => {
  const inputRef = useRef(null);

 const activate = () => {
    inputRef.current.focus();
 }

 useImperativeHandle(ref, ()=>{
    return{
        focus: activate
    }
 })

  return (
    <div
      className={`${classes.control} ${
        isValid === false ? classes.invalid : ''
      }`}>
      <label htmlFor={id}>{title}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        ref={inputRef}
      />
    </div>
  );
});

export default Input;
