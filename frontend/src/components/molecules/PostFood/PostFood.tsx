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
  );
};

export default PostFood;
