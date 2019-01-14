import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import Home from './components/Home/home';
import Layout from './hoc/Layout/layout';

import VideoArticle from './components/Articles/Videos/Video/index';
import NewsArticle from './components/Articles/News/Post/index';
import NewsMain from './components/Articles/News/Main/index';
import VideosMain from './components/Articles/Videos/Main/index';
import SignIn from './components/SignIn/signin'
import Dashboard from './components/Dashboard/dashboard'

import PrivateRoute from './components/AuthRoutes/privateRoutes';
import PublicRoute from './components/AuthRoutes/publicRoutes';

const Routes = (props) => {
  return (
    <Layout user={props.user}>
      <Switch>
        <PublicRoute {...props} restricted={false} path={`${process.env.PUBLIC_URL}/`} exact component={Home} />
        <PublicRoute {...props} restricted={false} path={`${process.env.PUBLIC_URL}/news`} exact component={NewsMain}/>
        <PublicRoute {...props} restricted={false} path={`${process.env.PUBLIC_URL}/articles/:id`} exact component={NewsArticle}/>
        <PublicRoute {...props} restricted={false} path={`${process.env.PUBLIC_URL}/videos/:id`} exact component={VideoArticle}/>
        <PublicRoute {...props} restricted={false} path={`${process.env.PUBLIC_URL}/videos`} exact component={VideosMain}/>
        <PublicRoute {...props} restricted={true} path={`${process.env.PUBLIC_URL}/sign-in`} exact component={SignIn}/>
        <PrivateRoute {...props} path={`${process.env.PUBLIC_URL}/dashboard`} exact component={Dashboard}/>
      </Switch> 
    </Layout>
  )
}

export default Routes;