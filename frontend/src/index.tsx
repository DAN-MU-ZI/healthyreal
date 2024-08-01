import ReactDOM from "react-dom/client";
import App from "./App";
import { Global, ThemeProvider } from "@emotion/react";
import theme from "./assets/theme";
import styles from "./styles/global";
import { AuthProvider } from "./providers/AuthContext";
import { PostProvider } from './pages/PostContext';

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement as HTMLElement);
  root.render(
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <PostProvider>
          <Global styles={styles} />
          <App />
        </PostProvider>
      </AuthProvider>
    </ThemeProvider>
  );
} else {
  console.error("Root element not found");
}
