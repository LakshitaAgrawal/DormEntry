import React from "react";
import "./Buttons.css";

const Buttons = (props) => {
    const {children, onClick} = props
  return (
    <button className="button" onClick={onClick}>{children} </button>
  )
};

export default Buttons;
