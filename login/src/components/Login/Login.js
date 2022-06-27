import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef
} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';

const EMAIL_INPUT = 'USER_EMAIL_INPUT';
const EMAIL_BLUR = 'EMAIL_INPUT_BLUR';
const PASS_INPUT = 'USER_PASSWORD_INPUT';
const PASS_BLUR = 'PASSWORD_INPUT_BLUR';

const reducer = (state, action) => {
  switch (action.type) {
    case EMAIL_INPUT:
      return {
        value: action.value,
        isValid: action.value.includes('@')
      };
    case EMAIL_BLUR:
      return { value: state.value, isValid: state.value.includes('@') };
    case PASS_INPUT:
      return {
        value: action.value,
        isValid: action.value.trim().length > 6
      };
    case PASS_BLUR:
      return { value: state.value, isValid: state.value.trim().length > 6 };
    default:
      return {
        value: '',
        isValid: null
      };
  }
};

const Login = () => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(reducer, {
    value: '',
    isValid: null
  });
  const [passwordState, dispatchPassword] = useReducer(reducer, {
    value: '',
    isValid: null
  });

  const ctx = useContext(AuthContext);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const { isValid: isValidEmail } = emailState;
  const { isValid: isValidPassword } = passwordState;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFormIsValid(isValidEmail && isValidPassword);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [isValidEmail, isValidPassword]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: EMAIL_INPUT, value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({
      type: PASS_INPUT,
      value: event.target.value
    });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: EMAIL_BLUR });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: PASS_BLUR });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (formIsValid) {
      ctx.onLogin(emailState.value, passwordState.value);
    } else if (!isValidEmail) {
      emailRef.current.focus();
    } else {
      passwordRef.current.focus();
    }
  };


  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailRef}
          isValid={emailState.isValid}
          type='email'
          id='email'
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          title='E-Mail'
        />
        <Input
          ref={passwordRef}
          isValid={passwordState.isValid}
          type='password'
          id='password'
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          title='Password'
        />
        <div className={classes.actions}>
          <Button type='submit' className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
