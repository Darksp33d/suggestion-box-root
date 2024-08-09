import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { dataMocker } from './Data/DataMocker';
import CommentForm from './CommentForm';
import { User, MessageSquare, Calendar, MessageCircle, LoaderCircle } from 'lucide-react';

//component to display a single suggestion and its comments

const SuggestionInfo = () => {
  const { id } = useParams();
  const [suggestion, setSuggestion] = useState(null);
  const [comments, setComments] = useState([]);

  //fetch suggestion and comments by id from dataMocker
  useEffect(() => {
    const fetchedSuggestion = dataMocker.getSuggestion(id);
    setSuggestion(fetchedSuggestion);
    if (fetchedSuggestion) {
      setComments(dataMocker.getComments(id));
      console.log('fetchedSuggestion is: ', fetchedSuggestion);
    }
  }, [id]);

  //handle adding a new comment to the suggestion by id
  const handleNewComment = (newComment) => {
    setComments(prevComments => [...prevComments, newComment]);
  };

  //if there is no suggestion then display loading and a spinner (whatever its called lol)
  if (!suggestion) {
    return (
      <div className="flex items-center justify-center text-gray-300 h-64">
        <LoaderCircle className="animate-spin mr-3 h-8 w-8 text-blue-400" />
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-400 flex items-center">
        <MessageSquare className="mr-2 h-6 w-6" />
        {suggestion.title}
      </h2>
      <p className="text-gray-300 mb-4 text-lg">{suggestion.description}</p>
      <div className="text-sm text-gray-400 mb-6 flex items-center space-x-4">
        <span className="flex items-center">
          <User className="mr-1 h-4 w-4" />
          Submitted by {suggestion.author}
        </span>
        <span className="flex items-center">
          <Calendar className="mr-1 h-4 w-4" />
          {new Date(suggestion.createdAt).toLocaleDateString()}
        </span>
      </div>

      <h3 className="text-xl font-semibold mb-4 text-blue-400 flex items-center">
        <MessageCircle className="mr-2 h-5 w-5" />
        Comments
      </h3>
      <div className="space-y-4 mb-6">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-200">{comment.content}</p>
            <div className="text-sm text-gray-400 mt-2 flex items-center justify-between">
              <span className="flex items-center">
                <User className="mr-1 h-4 w-4" />
                By {comment.author}
              </span>
              <span className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      <CommentForm suggestionId={id} onCommentAdded={handleNewComment} />
    </div>
  );
};

export default SuggestionInfo;