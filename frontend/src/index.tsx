import ReactDOM from "react-dom/client";
import App from "./App";
import {Global, ThemeProvider} from "@emotion/react";
import theme from "./assets/theme";
import styles from "./styles/global";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement as HTMLElement);
  root.render(
    <ThemeProvider theme={theme}>
      <Global styles={styles} />
      <App />
    </ThemeProvider>
  );
} else {
  console.error("Root element not found");
}
