import * as React from "react";
import styled from "styled-components";
import "./styles.css";

const Button = styled.button


function Navbar(props) {
  const {home, chart, message, person, search} = props;


  return (
    <div className="navbar">
        <button className="button" style={{home.backgroundColor}} onClick={home.onClick}>
    <img src={home.icon} alt="home" style={{ width: "24px", height: "24px" }}></img>
  </button>
  
  <button className="button" style={{chart.backgroundColor}} onClick={chart.onClick}>
  <img src={chart.icon} alt="chart" style={{ width: "24px", height: "24px" }}></img>
</button>
   <button className="button" style={{message.backgroundColor}} onClick={message.onClick}>
   <img src={message.icon} alt="message" style={{ width: "24px", height: "24px" }}></img>
 </button>
 
 <button className="button" style={{person.backgroundColor}} onClick={person.onClick}>
 <img src={person.icon} alt="person" style={{ width: "24px", height: "24px" }}></img>
</button>
  <button className="button" style={{search.backgroundColor}} onClick={search.onClick}>
  <img src={search.icon} alt="search" style={{ width: "24px", height: "24px" }}></img>
</button>
 </div>
    

  );
}
