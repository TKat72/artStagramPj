import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import DisplayPosts from './components/DisplayAllPosts'
import PostInformation from './components/PostInformation'
import AddNewComment from './components/AddNewComment/AddNewComment';
import SplashPage from './components/auth/SplashPageModel/LoginSplash'
function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/comment' exact={true} >
          <AddNewComment></AddNewComment>
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <DisplayPosts />
        </ProtectedRoute>
        <ProtectedRoute path='/posts/:post_id' exact={true} >
          <PostInformation></PostInformation>
        </ProtectedRoute>
        <Route path='/login'>
          <SplashPage></SplashPage>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
