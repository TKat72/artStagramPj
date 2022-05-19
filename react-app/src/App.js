import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import DisplayPosts from './components/DisplayAllPosts'
import PostInformation from './components/PostInformation/PostInformatiom'
import AddNewComment from './components/AddNewComment/AddNewComment';
import SplashPage from './components/auth/SplashPageModel/LoginSplash';
import Profile from './components/Profile/Profile'
import PageNorFound from "./components/NotFound/NotFound"
import PostForFeed from "./components/postForFeed/PostForFeed"
import Footer from "./components/Footer/Footer"
function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session?.user)


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
        {currentUser ? (
          <ProtectedRoute path='/' exact={true} >
            <DisplayPosts />
          </ProtectedRoute>
        ) :
          <Route path='/'>
            <SplashPage></SplashPage>
          </Route>}

        <ProtectedRoute path='/posts/:post_id' exact={true} >
          <PostInformation></PostInformation>
        </ProtectedRoute>
        <ProtectedRoute path='/profile' exact={true} >
          <Profile></Profile>
        </ProtectedRoute>

        <Route path='/login'>
          <SplashPage></SplashPage>
        </Route>
        <Route>
          <PageNorFound></PageNorFound>
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
