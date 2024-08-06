import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
import LoginRedirect from "./pages/LoginRedirect";
import LoginUser from "./pages/LoginUser";
import Intro from "./pages/Intro";
import {useAuth} from "./providers/AuthContext";
import Login from "./pages/Login";
import Tutorial from "./pages/Tutorial";
import Onboarding from "./pages/Onboarding";
import MainFood from "./components/molecules/MainFood";
import MypageFood from "./components/molecules/MypageFood";
import PostFood from "./components/molecules/PostFood";
import LectureProgramRegistration from "./components/molecules/LectureProgramRegistration/LectureProgramRegistration";
import {ProgramProvider} from "./pages/PostContext";
import Scheduler from "./pages/Scheduler";
import FindTrainer from "./pages/FindTrainer";
import PageLayout from "./components/templates/PageLayout";
import React, {useState} from "react";
import {TrainerOnboardingStep1} from "./components/molecules/TrainerOnboardingStep1";
import {TrainerOnboardingStep2} from "./components/molecules/TrainerOnboardingStep2";
import {TrainerOnboardingStep3} from "./components/molecules/TrainerOnboardingStep3";
import TrainerOnboardingStep4 from "./components/molecules/TrainerOnboardingStep4/TrainerOnboardingStep4";
import TrainerOnboardingStep5 from "./components/molecules/TrainerOnboardingStep5/TrainerOnboardingStep5";
import {MemberGenderEnum} from "./typescript-axios";
import ChatRooms from "./pages/ChatRooms";
import Chat from "./pages/Chat";
import MessageMain from "./components/molecules/MessageMain/MessageMain";
import MessageNoMain from "./components/molecules/MessageNoMain/MessageNoMain";
import MessagePost from "./components/molecules/MessagePost/MessagePost";

function App() {
  const {isAuthenticated} = useAuth();
  const [onboardingGender, setOnboardingGender] = useState<
    MemberGenderEnum | undefined
  >(undefined);

  const handleGenderChange = (selectedGender: MemberGenderEnum) => {
    setOnboardingGender(selectedGender);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/main" element={<Main />} />
              <Route path="intro/*" element={<Intro />} />
              {/* <Route path="login/user" element={<LoginUser />} /> */}
              <Route path="scheduler/*" element={<Scheduler />} />
              {/* <Route path="findTrainer/*" element={<FindTrainer />} /> */}
              {/* <Route path="intro/tutorial" element={<Tutorial />} /> */}
              <Route path="intro/onboarding" element={<Onboarding />} />

              <Route path="/chat" element={<ChatRooms />} />
              <Route path="/chat/:chatRoomId" element={<Chat />} />
            </>
          ) : (
            <>
              <Route path="oauth/redirect" element={<LoginRedirect />} />
              <Route path="/*" element={<Login />} />

              <Route path="MessageMain" element={<MessageMain />} />
              <Route path="MessageNoMain" element={<MessageNoMain />} />
              <Route path="MessagePost" element={<MessagePost />} />
              <Route path="MainFood" element={<MainFood />} />
              <Route path="MypageFood" element={<MypageFood />} />
              <Route path="PostFood" element={<PostFood />} />

              <Route path="PageLayout" element={<PageLayout />} />
            </>
          )}
        </Routes>
      </Router>

      <ProgramProvider>
        <Router>
          <Routes>
            <Route path="TrainerOn1" element={<TrainerOnboardingStep1 />} />
            <Route path="TrainerOn2" element={<TrainerOnboardingStep2 />} />
            <Route
              path="LectureProgramRegistration"
              element={<LectureProgramRegistration />}
            />
            <Route path="TrainerOn3" element={<TrainerOnboardingStep3 />} />
            <Route
              path="TrainerOn4"
              element={
                <TrainerOnboardingStep4
                  onboardingGender={onboardingGender}
                  onDataChange={handleGenderChange}
                />
              }
            />
            <Route
              path="TrainerOn4/TrainerOn5"
              element={<TrainerOnboardingStep5 />}
            />
            <Route path="MessageMain" element={<MessageMain />} />
            <Route path="MessageNoMain" element={<MessageNoMain />} />
            <Route path="MessagePost" element={<MessagePost />} />
          </Routes>
        </Router>
      </ProgramProvider>
    </div>
  );
}

export default App;
