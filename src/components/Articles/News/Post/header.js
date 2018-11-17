import React from 'react';
import TeamInfo from '../../Elements/teamInfo';
import PostData  from '../../Elements/postData';

const header = (props) => {

  const teamNfo = (team) => {
    return team ? (
      <TeamInfo team={team}/>
    ) : null
  }

  const postData = (date, author) => (
    <PostData data={{date, author}}/>
  )

  return(
    <div>
      {teamNfo(props.teamData)}
      {postData(props.date, props.author)}
    </div>
  )
}

export default header;