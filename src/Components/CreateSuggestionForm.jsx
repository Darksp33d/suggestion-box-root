import React, { useState } from 'react';
import { createSuggestion  } from './Data/apiData';
import { MessageSquare, User, Send, AlignLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


//component to create a new suggestion,
const CreateSuggestionForm = ({ onSuggestionAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const navigate = useNavigate();

  //handle submit of the form to add a new suggestion
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const newSuggestion = await createSuggestion({ title, description, author });
    onSuggestionAdded(newSuggestion);
    setTitle('');
    setDescription('');
    setAuthor('');
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-blue-400 flex items-center">
        <MessageSquare className="mr-3 h-8 w-8" />
        Submit a New Suggestion
      </h2>
      <div className="mb-6">
        <label htmlFor="title" className="block text-gray-300 font-semibold mb-2 flex items-center">
          <MessageSquare className="mr-2 h-5 w-5 text-blue-400" />
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          required
          className="w-full px-4 py-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          placeholder="Enter suggestion title"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="description" className="block text-gray-300 font-semibold mb-2 flex items-center">
          <AlignLeft className="mr-2 h-5 w-5 text-blue-400" />
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
          required
          className="w-full px-4 py-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          rows="4"
          placeholder="Describe your suggestion"
        ></textarea>
      </div>
      <div className="mb-8">
        <label htmlFor="author" className="block text-gray-300 font-semibold mb-2 flex items-center">
          <User className="mr-2 h-5 w-5 text-blue-400" />
          Your Name
        </label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(ev) => setAuthor(ev.target.value)}
          required
          className="w-full px-4 py-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          placeholder="Enter your name"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300 font-bold flex items-center justify-center"
      >
        <Send className="mr-2 h-5 w-5" />
        Submit Suggestion
      </button>
    </form>
  );
};

export default CreateSuggestionForm;