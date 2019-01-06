import React, {Component} from 'react';
import SliderTemplates from './slider_templates';
import {firebase, firebaseArticles, firebaseLooper} from '../../../firebase';
import { resolve } from 'path';
import { request } from 'http';

class NewsSlider extends Component {

  state = {
    news: []
  }

  componentWillMount() {
    firebaseArticles.limitToFirst(3).once('value')
      .then((snapshot) => {
        const news = firebaseLooper(snapshot)
        const asyncFunction = (item, i, cb) => {
          firebase.storage().ref('images')
          .child(item.image).getDownloadURL()
          .then(url => {
            news[i].image = url;
            console.log(url)
            cb();
          })
        }

        let requests = news.map((item, i) => {
          return new Promise((resolve) => {
            asyncFunction(item, i, resolve)
          }) 
        })

        Promise.all(requests)
        .then(() => {
          this.setState({
            news
          })
        })
        .catch((err) => console.log(err))
        console.log(news)
      })
  }

  render() {
    return (
      <div>
        <SliderTemplates data={this.state.news} type={this.props.type} settings={this.props.settings}/>
      </div>
    )
  }
}

export default NewsSlider;