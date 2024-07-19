import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Tutorial from "./pages/Tutorial";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="intro/login" element={<Login />} />
          <Route path="intro/tutorial" element={<Tutorial />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
