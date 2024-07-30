<<<<<<< Updated upstream
import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import "./styles.css"

const PostFood: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
      },
      mode: 'date',
    });
  };

  const showTimePicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: (event, selectedTime) => {
        const currentTime = selectedTime || date;
        setDate(currentTime);
      },
      mode: 'time',
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>식단 관리</Text>
      <Text style={styles.subheader}>나의 식단을 공유하고 피드백 받으세요.</Text>

      <View style={styles.datePickerContainer}>
        <TouchableOpacity onPress={showDatePicker} style={styles.datePicker}>
          <Text>{date.toISOString().split('T')[0]}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={showTimePicker} style={styles.datePicker}>
          <Text>{date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>글 작성</Text>
      <TextInput
        style={styles.input}
        placeholder="제목을 입력하세요"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.textArea}
        placeholder="내용을 입력하세요"
        value={content}
        onChangeText={setContent}
        multiline={true}
      />

      <TouchableOpacity style={styles.uploadButton}>
        <Text>관련 사진 업로드</Text>
      </TouchableOpacity>

      <Button title="작성 하기" onPress={() => { /* handle submit */ }} />
    </View>
=======
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
>>>>>>> Stashed changes
  );
};

export default PostFood;
