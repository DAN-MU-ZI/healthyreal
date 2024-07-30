import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Tutorial from "./pages/Tutorial";
import Onboarding from "./pages/Onboarding";
import Food from "./pages/Food";
import MypageFood from "./components/molecules/MypageFood";
import PostFood from "./components/molecules/PostFood";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="intro/login" element={<Login />} />
          <Route path="intro/tutorial" element={<Tutorial />} />
          <Route path="intro/onboarding" element={<Onboarding />} />
          <Route path="food" element={<Food />} />
          <Route path="mypage-food" element={<MypageFood />} />
          <Route path="post-food" element={<PostFood />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
