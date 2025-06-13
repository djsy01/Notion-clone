import axios from 'axios';

export const fetchNotes = async () => {
  const response = await axios.get('http://localhost:4000/api/notes'); 
  return response.data;
};
