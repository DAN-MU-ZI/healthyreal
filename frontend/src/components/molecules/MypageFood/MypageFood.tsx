import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './MypageFood.css';
import { PostContext } from '../../../pages/PostContext';

const MypageFood: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(PostContext);

  if (!context) {
    throw new Error('PostContext must be used within a PostProvider');
  }

  const { posts, deletePost } = context;

  const handleEdit = (post: any) => {
    navigate('/post-food', { state: { mealTime: post.date.split(' ')[1], selectedDate: post.date.split(' ')[0], existingPost: post } });
  };

  const handleDelete = (postId: number) => {
    deletePost(postId);
  };

  return (
    <div className="mypage-container">
      <div className="header">
        <h1>식단 관리</h1>
        <p>업로드가 완료되었습니다</p>
      </div>
      <div className="post-list">
        {posts.map((post, index) => (
          <div key={index} className="post-item">
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
            <div className="post-actions">
              <button onClick={() => handleEdit(post)} className="edit-button">수정</button>
              <button onClick={() => handleDelete(post.id)} className="delete-button">삭제</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MypageFood;
