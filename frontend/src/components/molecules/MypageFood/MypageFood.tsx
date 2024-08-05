import React, { useContext, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './MypageFood.css';
import { PostContext } from '../../../pages/PostContext';

const MypageFood: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const context = useContext(PostContext);
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!context) {
    throw new Error('PostContext must be used within a PostProvider');
  }

  const { posts, deletePost, addPost, editPost } = context;

  const handleEdit = (post: any) => {
    navigate('/PostFood', { state: { mealTime: post.mealTime, selectedDate: post.date, postToEdit: post } });
  };

  const handleDelete = (postId: number) => {
    deletePost(postId);
  };

  const handleBack = () => {
    navigate('/MainFood');
  };

  const handleAdd = () => {
    navigate('/MainFood');
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }

    if (location.state?.updatedPost) {
      const updatedPost = location.state.updatedPost;

      const exists = posts.some(post => post.id === updatedPost.id);
      if (exists) {
        editPost(updatedPost.id, updatedPost);
      } else {
        addPost(updatedPost);
      }
    }
  }, [posts, location.state, addPost, editPost]);

  return (
    <div className="mypage-container">
      <div className="headermpf">
        <button onClick={handleBack} className="back-button">←</button>
        <h1>식단 관리</h1>
        <p>업로드가 완료되었습니다</p>
      </div>
      <div className="post-list" ref={scrollRef}>
        {posts.map((post) => (
          <div key={post.id} className="post-item">
            <div className="post-header">
              <img src={post.profilePic} alt="Profile" className="profile-pic" />
              <div className="post-info">
                <span className="username">{post.username}</span>
                <span className="post-date">{post.date}</span>
              </div>
            </div>
            <div className="post-content">
              <img src={post.foodPic} alt="Food" className="food-pic" />
              <div className="post-text">
                <h2>{post.title}</h2>
                <p>{post.content}</p>
              </div>
            </div>
            <div className="post-feedback">
              {post.feedback && (
                <div className="feedback">
                  <h3>트레이너 피드백:</h3>
                  <p>{post.feedback}</p>
                </div>
              )}
            </div>
            <div className="post-actions">
              <button onClick={() => handleEdit(post)} className="edit-button">수정</button>
              <button onClick={() => handleDelete(post.id)} className="delete-button">삭제</button>
            </div>
          </div>
        ))}
      </div>
      <div className="add-button" onClick={handleAdd}>main</div>
    </div>
  );
};

export default MypageFood;
