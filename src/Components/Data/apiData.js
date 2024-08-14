import axios from 'axios';

//defining api url to use in all functions
const API_URL = 'http://localhost:3001/api';

//functions for all suggestion and comment operations using axios to make api calls, they do what their names suggest

export const getSuggestions = async () => {
  const response = await axios.get(`${API_URL}/suggestions`);
  return response.data;
};

export const getSuggestion = async (id) => {
  const response = await axios.get(`${API_URL}/suggestions/${id}`);
  return response.data;
};

export const createSuggestion = async (suggestion) => {
  const response = await axios.post(`${API_URL}/suggestions`, suggestion);
  return response.data;
};

export const getComments = async (suggestionId) => {
  const response = await axios.get(`${API_URL}/comments/${suggestionId}`);
  return response.data;
};

export const createComment = async (suggestionId, comment) => {
  const response = await axios.post(`${API_URL}/comments/${suggestionId}`, comment);
  return response.data;
};

export const deleteComment = async (commentId) => {
    const response = await axios.delete(`${API_URL}/comments/${commentId}`);
    return response.data;
  };

  export const deleteSuggestion = async (suggestionId) => {
    const response = await axios.delete(`${API_URL}/suggestions/${suggestionId}`);
    return response.data;
  };
  
  //function to generate a random suggestion
export const generateRandomSuggestion = async () => {
  const titles = ["Make UI look better", "Optimize performance", "Add new feature", "Fix security", "Fix bug", "Integrate with Root API"];
  const descriptions = [
    "Make the user interface more reactive and responsive.",
    "The app is very slow, speed it up.",
    "Add a new feature that would make the site better.",
    "Someone found a security vulnerability in the site, better fix it up before I DDOS >:)",
    "Squash this dang bug. It's annoying.",
    "There's this amazing app called Root, use their API to make this site 100000000000% better.",
  ];

  const newSuggestion = {
    title: titles[Math.floor(Math.random() * titles.length)],
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    author: "John Detch",
  };

  return createSuggestion(newSuggestion);
};
