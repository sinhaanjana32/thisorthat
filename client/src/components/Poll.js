import React from 'react';
import { connect } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import {Link }from 'react-router-dom'

import { vote } from '../store/actions';
import { color } from '../services/color';

const Poll = ({ poll, vote }) => {

  const answers =
    poll.options &&
    poll.options.map(option => (
      <button
        onClick={() => vote(poll._id, { answer: option.option })}
        className="button"
        key={option._id}>
        {option.option}
      </button>

    ));

  const data = {
    labels: poll.options.map(option => option.option),
  
    datasets: [
      {
        label: poll.question,
        backgroundColor: poll.options.map(option => color()),
        borderColor: '#323643',
        data: poll.options.map(option => Math.round(option.votes*100/poll.__v)),
      },
    ],
  };

  return (
    <div>
      <h3 className="poll-title">{poll.question}</h3>
      <div className="buttons_center">{answers}</div>
          <Pie data={data} />
         
      <div className="check">
      <Link to="/"> 
    Choose Another Question
      </Link> 
      </div>
    
 
    </div>
  );
};

export default connect(
  store => ({
    poll: store.currentPoll,
    polls: store.polls,
  }),
  { vote },
)(Poll);