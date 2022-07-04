import { FC, InputHTMLAttributes, ReactNode } from 'react';
import classes from './Input.module.css';

interface InputProps {
  isValid: boolean;
  invalid: boolean;
  label: ReactNode;
}

export const Input: FC<InputHTMLAttributes<HTMLInputElement> & InputProps> = (
  props
) => {
  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? props.invalid : ''
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
};
