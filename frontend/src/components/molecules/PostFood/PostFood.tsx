
import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PostFood.css';
import { PostContext } from '../../../pages/PostContext';

const PostFood: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mealTime, selectedDate, postToEdit } = location.state as { mealTime: string; selectedDate: string; postToEdit?: any };
  const context = useContext(PostContext);

  if (!context) {
    throw new Error('PostContext must be used within a PostProvider');
  }

  const { addPost, editPost } = context;
  const [title, setTitle] = useState(postToEdit?.title || '');
  const [content, setContent] = useState(postToEdit?.content || '');

  const handleSubmit = () => {
    const newPost = {
      id: postToEdit?.id || new Date().getTime(),
      username: '윤민지',
      profilePic: '/path/to/profile-pic.jpg', // Change to actual profile pic path
      date: `${selectedDate} ${mealTime}`,
      title,
      content,
      foodPic: '/path/to/food-pic.jpg', // Change to actual food pic path
    };
    if (postToEdit) {
      editPost(postToEdit.id, newPost);
    } else {
      addPost(newPost);
    }
    navigate('/mypage-food');
  };

  return (
    <div className="container">
      <div className="header">
        <button onClick={() => window.history.back()} className="back-button">←</button>
        <h1>식단 관리</h1>
        <p>나의 식단을 공유하고 피드백 받으세요.</p>
      </div>
      <div className="form-container">
        <div className="form-group">
          <label>작성 날짜*</label>
          <input type="text" value={`${selectedDate} ${mealTime}`} readOnly />
        </div>
        <div className="form-group">
          <label>글 작성</label>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label>파일 첨부</label>
          <button>관련 사진 업로드</button>
        </div>
        <button className="submit-button" onClick={handleSubmit}>
          {postToEdit ? '수정 하기' : '작성 하기'}
        </button>
      </div>
    </div>
  );
};

export default PostFood;