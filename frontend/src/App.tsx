import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import LoginRedirect from "./pages/LoginRedirect";
import LoginUser from "./pages/LoginUser";
import Intro from "./pages/Intro";
import { useAuth } from "./providers/AuthContext";
import Login from "./pages/Login";
import Tutorial from "./pages/Tutorial";
import Onboarding from "./pages/Onboarding";
import Food from "./pages/Food";
import MypageFood from "./components/molecules/MypageFood";
import PostFood from "./components/molecules/PostFood";

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="App">
      <Router>
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Main />} />
              <Route path="intro/*" element={<Intro />} />
              <Route path="login/user" element={<LoginUser />} />
              <Route path="food" element={<Food />} />
              <Route path="mypage-food" element={<MypageFood />} />
              <Route path="post-food" element={<PostFood />} />
            </>
          ) : (
            <>
              <Route path="oauth/redirect" element={<LoginRedirect />} />
              <Route path="login/*" element={<Login />} />
              <Route path="intro/login" element={<Login />} />
              <Route path="intro/tutorial" element={<Tutorial />} />
              <Route path="intro/onboarding" element={<Onboarding />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
