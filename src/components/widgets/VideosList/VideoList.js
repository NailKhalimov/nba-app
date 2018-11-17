import React, { Component } from 'react';
import styles from './videosList.css';
import axios from 'axios';

import { URL } from '../../../config';
import Button from '../Button/button';
import VideosListTemplate from './videosListTemplate.js'


class VideosList extends Component {

  state = {
    team: [],
    videos: [],
    start: this.props.start,
    end: this.props.start + this.props.amount,
    amount: this.props.amount
  }

  componentWillMount() {
    this.request(this.state.start, this.state.end);
  }

  request = (start, end) => {
    
    if (this.state.team.length < 1) {
      axios.get(`${URL}/teams`)
        .then(response => {
          this.setState({
            teams: response.data
          })
        }) 
    }
    
    axios.get(`${URL}/videos?_start=${start}&_end=${end}`)
      .then(response => {
        this.setState({
          videos: [...this.state.videos, ...response.data],
          start: start,
          end: end
        })
      });
  }

  renderTitle = () => {
    return this.props.title ?
      <h3><strong>NBA</strong> Videos</h3>
      : 
      null
  }

  renderVideos = () => {
    let template = null;

    switch(this.props.type) {
      case ('card'):
        template = <VideosListTemplate data={this.state.videos} teams={this.state.teams}/>
        break;

      default: 
        template = null;
        break;
    }
    return template;
  }

  loadMore = () => {
    let end = this.state.end + this.state.amount;
    this.request(this.state.end, end)
  }

  renderButton = () => {
    return this.props.loadmore ? 
      <Button type='loadmore'
        loadMore={() => {this.loadMore()}}
        cta="Load More Videos"
      /> 
      :
      <Button type='linkTo' cta="More videos" linkTo='/videos'/>
  }

  render() {
    console.log(this.state)
    return(
      <div className={styles.videoList_wrapper}>
        {this.renderTitle()}
        {this.renderVideos()}
        {this.renderButton()}
      </div>
    )
  }
}

export default VideosList;