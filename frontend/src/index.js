import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {Global, ThemeProvider} from "@emotion/react";
import theme from "./assets/theme/theme";
import styles from "./styles/global";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <Global styles={styles} />
    <App />
  </ThemeProvider>
);
