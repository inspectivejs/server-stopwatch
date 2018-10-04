import React, { Component } from 'react';

const Performance = (props) => {
  return (
    <div>
      <h2>{props.data.name}</h2>
      <h3>Duration: {props.data.duration}</h3>
      <h3>Start Time: {props.data.startTime}</h3>
      <h3>Observer Type: {props.data.entryType}</h3>
    </div>
  );
};

export default Performance;
