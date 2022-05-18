import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form className='formLogin' onSubmit={onLogin}>
      <div>
        {errors.map((error, ind) => (
          <div className="errors" key={ind}>{error}</div>
        ))}
      </div>

      <div>
        <input className="form-control-impt-lg"
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div>
        <input className="form-control-impt-lg"
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />

      </div>
      <button className="btn-login rnb" type='submit'>Login</button>
    </form>
  );
};

export default LoginForm;
