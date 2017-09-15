import React from 'react';

const Number = (props) => {
    return (
        <span>{props.number >= 0 ? '+' + props.number : props.number}</span>
    );
};

export default Number;
