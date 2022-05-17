import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
       
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form className='formLogin formSignUp' onSubmit={onSignUp}>
      <div>
        {errors?.map((error, ind) => (
          <div className="errors" key={ind}>{error}</div>
        ))}
      </div>
      <div>

        <input className="form-control-impt-lg sign-up"
          type='text'
          name='username'
          placeholder="Username"
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>

        <input className="form-control-impt-lg sign-up"
          type='text'
          name='email'
          placeholder="Email"
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>

        <input className="form-control-impt-lg sign-up"
          type='password'
          name='password'
          placeholder="Password"
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>

        <input className="form-control-impt-lg sign-up"
          type='password'
          name='repeat_password'
          placeholder="Repeat Password"
          onChange={updateRepeatPassword}
          value={repeatPassword}

        ></input>
      </div>
      <button className="btn-login" type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
