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

const Routes = (props) => {
  return (
    <Layout user={props.user}>
      <Switch>
        <Route path={`${process.env.PUBLIC_URL}/`} exact component={Home} />
        <Route path={`${process.env.PUBLIC_URL}/news`} exact component={NewsMain}/>
        <Route path={`${process.env.PUBLIC_URL}/articles/:id`} exact component={NewsArticle}/>
        <Route path={`${process.env.PUBLIC_URL}/videos/:id`} exact component={VideoArticle}/>
        <Route path={`${process.env.PUBLIC_URL}/videos`} exact component={VideosMain}/>
        <Route path={`${process.env.PUBLIC_URL}/sign-in`} exact component={SignIn}/>
        <Route path={`${process.env.PUBLIC_URL}/dashboard`} exact component={Dashboard}/>
      </Switch> 
    </Layout>
  )
}

export default Routes;