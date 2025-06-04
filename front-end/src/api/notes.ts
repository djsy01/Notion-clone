import axios from 'axios';

export const fetchNotes = async () => {
  const response = await axios.get('http://localhost:4000/api/notes'); 
  return response.data; // 서버 응답 데이터 구조에 맞게 수정 필요
};
