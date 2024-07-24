import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Tutorial from "./pages/Tutorial";
import Onboarding from "./pages/Onboarding";
import LoginCallback from "./pages/LoginCallback";
import LoginProgress from "./pages/LoginProgress";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/main" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="intro/tutorial" element={<Tutorial />} />
          <Route path="intro/onboarding" element={<Onboarding />} />
          <Route path="oauth/redirect" element={<LoginCallback />} />
          <Route path="login/progress" element={<LoginProgress />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
