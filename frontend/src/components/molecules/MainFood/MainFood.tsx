import React, {useState, useContext, useEffect} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./MainFood.css";
import {PostContext} from "../../../pages/PostContext";

const MainFood: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const context = useContext(PostContext);

  if (!context) {
    throw new Error("PostContext must be used within a PostProvider");
  }

  const {posts} = context;
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const state = location.state as {selectedDate?: string} | null;
    return state?.selectedDate ? new Date(state.selectedDate) : new Date();
  });

  useEffect(() => {
    if (location.state?.updatedPost) {
      const updatedPost = location.state.updatedPost;
      const exists = posts.some((post) => post.id === updatedPost.id);
      if (!exists) {
        context.addPost(updatedPost);
      }
    }
  }, [location.state, context, posts]);

  const formattedDate = selectedDate.toISOString().split("T")[0];

  const mealStatus = (mealTime: string) => {
    return posts.some(
      (post) =>
        post.date.startsWith(formattedDate) && post.mealTime === mealTime
    )
      ? "작성"
      : "미작성";
  };

  const handleMealClick = (mealTime: string) => {
    navigate("/PostFood", {
      state: {
        mealTime,
        selectedDate: formattedDate,
        postToEdit: posts.find(
          (post) =>
            post.date.startsWith(formattedDate) && post.mealTime === mealTime
        ),
      },
    });
  };

  return (
    <div className="container">
      <div className="headermf">
        <button onClick={() => navigate("/main")} className="back-button">
          ←
        </button>
        <h1>식단 관리</h1>
        <button
          onClick={() => navigate("/MypageFood")}
          className="mypage-button"
        >
          Mypage
        </button>
      </div>
      <div className="calendar-container">
        <Calendar
          onChange={(date) => setSelectedDate(date as Date)}
          value={selectedDate}
        />
      </div>
      <div className="selected-date">
        {selectedDate.toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
          weekday: "short",
        })}
      </div>
      <div className="meal-list">
        {["아침", "점심", "저녁"].map((mealTime) => (
          <div
            key={mealTime}
            className="meal-item"
            onClick={() => handleMealClick(mealTime)}
          >
            <span className="meal-time">{mealTime}</span>
            <span
              className={`meal-status ${
                mealStatus(mealTime) === "작성" ? "complete" : "incomplete"
              }`}
            >
              {mealStatus(mealTime)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainFood;
