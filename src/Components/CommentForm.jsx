import React, { useState } from 'react';
import { createComment  } from './Data/apiData';
import { User, Send, MessageCircle } from 'lucide-react';

//commentForm component to add a comment to a suggestion
const CommentForm = ({ suggestionId, onCommentAdded }) => {
  //state for content and author of the comment
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  //handle submit of the form to add a new comment to the suggestion
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const newComment = await createComment(suggestionId, { content, author });
    onCommentAdded(newComment);
    setContent('');
    setAuthor('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 bg-gray-800 p-6 rounded-lg">
      <h4 className="text-2xl font-semibold mb-6 text-blue-400 flex items-center">
        <MessageCircle className="mr-3 h-6 w-6" />
        Add a Comment
      </h4>
      <div className="mb-6">
        <label htmlFor="comment" className="block text-gray-300 font-semibold mb-2 flex items-center">
          <MessageCircle className="mr-2 h-5 w-5 text-blue-400" />
          Your Comment
        </label>
        <textarea
          id="comment"
          value={content}
          onChange={(ev) => setContent(ev.target.value)}
          required
          className="w-full px-4 py-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          rows="4"
          placeholder="Write your comment"
        ></textarea>
      </div>
      <div className="mb-6">
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
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300 font-bold flex items-center justify-center"
      >
        <Send className="mr-2 h-5 w-5" />
        Submit Comment
      </button>
    </form>
  );
};

export default CommentForm;