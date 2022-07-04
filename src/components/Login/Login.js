import { useEffect, useState, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import { Input } from '../UI/Input/Input';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: action.val.includes('@')
    };
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      isValid: state.value.includes('@')
    };
  }
  return {
    value: '',
    isValid: false
  };
};
const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: action.val.trim().length > 6
    };
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      isValid: state.value.trim().length > 6
    };
  }
  return {
    value: '',
    isValid: false
  };
};

const Login = (props) => {
  const ctx = useContext(AuthContext);
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailstated, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: false
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: false
  });

  const { isValid: isEmailValid } = emailState;
  const { isValid: isPasswordValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(isPasswordValid && isEmailValid);
    });

    return () => {
      clearInterval(identifier);
    };
  }, [isEmailValid, isPasswordValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
    setFormIsValid(event.target.value.includes('@') && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'USER_INPUT', val: event.target.value });
    setFormIsValid(event.target.value.trim().length > 6 && emailState.isValid);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          isValid={isEmailValid}
          value={emailState.value}
          label='Email'
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          id='password'
          value={passwordState.value}
          label="Password"

          type={"password"}
          isValid={passwordState.isValid}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
