import React from 'react';

import TeamNfo from '../../Elements/teamInfo';
import teamInfo from '../../Elements/teamInfo';

const header = (props) => {

  const teamNfo = (team) => {
    return team ?
      (<TeamNfo team={team}/>)
      :
      null;
  }

  return (
    <div>
      {teamNfo(props.teamData)}
    </div>
  )
}

export default header;