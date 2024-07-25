import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Tutorial from "./pages/Tutorial";
import Onboarding from "./pages/Onboarding";
import OAuth2Redirect from "./pages/OAuth2Redirect";
import UsersPage from "./pages/UserPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="intro/login" element={<Login />} />
          <Route path="intro/tutorial" element={<Tutorial />} />
          <Route path="intro/onboarding" element={<Onboarding />} />
          <Route path="/oauth/redirect" element={<OAuth2Redirect />} />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
