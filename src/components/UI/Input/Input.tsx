import {
  FC,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useImperativeHandle,
  useRef
} from 'react';
import classes from './Input.module.css';

interface InputProps {
  isValid: boolean;
  invalid: boolean;
  label: ReactNode;
}

export const Input: FC<InputHTMLAttributes<HTMLInputElement> & InputProps> =
  forwardRef((props, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const activate = () => {
      inputRef.current!.focus();
    };

    useImperativeHandle(ref, () => {
      return {
        focus: activate
      };
    });
    return (
      <div
        className={`${classes.control} ${
          props.isValid === false ? props.invalid : ''
        }`}
      >
        <label htmlFor={props.id}>{props.label}</label>
        <input
          ref={inputRef}
          type={props.type}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
      </div>
    );
  });
