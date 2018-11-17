import React from 'react';
import styles from '../article.css';

const postData = (props) => (
  <div className={styles.acticlePostData}>
    <div>
      Date: 
      <span>{props.data.date}</span>
    </div>
    <div>
      Author:
      <span>{props.data.author}</span>
    </div>
  </div>
)

export default postData;