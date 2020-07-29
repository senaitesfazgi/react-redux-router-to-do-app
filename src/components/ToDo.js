import React from 'react';

class ToDo extends React.Component
{
  render ()
  {
    return (
      <li>
        {this.props.text}
      </li>
    );
  }
}

export default ToDo;
