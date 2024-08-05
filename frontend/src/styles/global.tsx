import {Theme, css} from "@emotion/react";
import theme from "../assets/theme/theme";
import "./reset.css";

const globalStyle = (theme: Theme) => css`
  @font-face {
    font-family: "GmarketSansMedium";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }
  html {
    font-family: "GmarketSansMedium", sans-serif; /* 폰트 설정 */
    box-sizing: border-box;
    margin: 0 auto;
    max-width: 375px;
    height: 812px;
    overflow: hidden;
    padding: 50px 20px;
    // max-width: 768px; /* 태블릿 크기 */
    min-height: 80vh;

    border-radius: 30px;
    background-color: #f9f9f9; /* 배경색 설정 */
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);

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
    width: 100%;
  }
`;

export default globalStyle;
