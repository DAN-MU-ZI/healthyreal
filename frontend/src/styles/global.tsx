import {Theme, css} from "@emotion/react";
import theme from "../assets/theme/theme";
import "./reset.css";

const globalStyle = (theme: Theme) => css`
  html {
    box-sizing: border-box;
    max-width: 375px;
    height: 812px;
    overflow: hidden;
    padding: 50px 20px;

    border-radius: 30px;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

    /* 색상 변수 */
    --main-blue: #130160;
    --main-purple: #d6cdfe;
    --sub-blue: #524b6b;

    /* 버튼 크기 변수 */
    --btn-small: 100px;
    --btn-medium: 155px;
    --btn-large: 264px;
  }
  body,
  .divTag,
  .App,
  #root {
    height: 100%;
  }
`;

export default globalStyle;
