import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./pages/Login.tsx";
import Main from "./pages/Main.tsx";
import Onboarding from "./pages/Onboarding.tsx";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="intro/login" element={<Login />} />
          <Route path="intro/onboarding" element={<Onboarding />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
