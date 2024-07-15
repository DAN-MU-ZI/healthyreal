import {css} from "@emotion/react";
import theme from "../assets/theme/theme";
import "./reset.css";

const globalStyle = (theme) => css`
  html {
    box-sizing: border-box;
    max-width: 375px;
    height: 812px;
    overflow: hidden;
    padding: 50px 20px;

    border-radius: 30px;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
`;

export default globalStyle;
