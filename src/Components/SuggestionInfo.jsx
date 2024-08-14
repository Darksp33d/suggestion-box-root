import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSuggestion, getComments, deleteComment } from './Data/apiData';
import CommentForm from './CommentForm';
import { User, MessageSquare, Calendar, LoaderCircle, Trash2, MessageSquareOff, MessageCircle } from 'lucide-react';
import { toast } from 'react-toastify';

//component to display a single suggestion and its comments, also allows for deleting the suggestion
const SuggestionInfo = ({ onSuggestionDeleted, suggestions }) => {
  //get the id from the url params
  const { id } = useParams();
  //useNavigate hook to navigate to different routes
  const navigate = useNavigate();
  //state for suggestion, comments, loading and error
  const [suggestion, setSuggestion] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  //fetch suggestion and comments by id from the api
  useEffect(() => {
    const fetchSuggestionAndComments = async () => {
      //set loading to true and error to null
      setIsLoading(true);
      setError(null);
      //try to fetch suggestion from the suggestions prop
      try {
        //if suggestion is found in the suggestions prop then set it to state and fetch comments
        const suggestionFromProps = suggestions.find(s => s.id === Number(id));
        if (suggestionFromProps) {
          setSuggestion(suggestionFromProps);
          const fetchedComments = await getComments(id);
          setComments(fetchedComments);
        } else {
          //if suggestion is not found in the suggestions prop then fetch it from the api
          const fetchedSuggestion = await getSuggestion(id);
          if (fetchedSuggestion) {
            setSuggestion(fetchedSuggestion);
            const fetchedComments = await getComments(id);
            setComments(fetchedComments);
          } else {
            setError('Suggestion not found');
          }
        }
      } catch (err) {
        console.error('Error fetching suggestion:', err);
        setError('Failed to load suggestion');
      } finally {
        setIsLoading(false);
      }
    };
    fetchSuggestionAndComments();
  }, [id, suggestions]);

  //handle adding a new comment to the suggestion by id
  const handleNewComment = (newComment) => {
    setComments(prevComments => [...prevComments, newComment]);
    toast.success('Comment added!');
  };

  //handle deleting a comment by id
  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
      toast.success('Comment deleted!');
    } catch (error) {
      console.error('Failed to delete comment:', error);
      toast.error('Failed to delete comment.');
    }
  };

  //handle deleting a suggestion by id
  const handleDeleteSuggestion = async () => {
    try {
      await onSuggestionDeleted(suggestion.id);
      toast.success('Suggestion deleted!');
      navigate('/');
    } catch (error) {
      console.error('Failed to delete suggestion:', error);
      toast.error('Failed to delete suggestion');
    }
  };

  //if there is no suggestion then display loading and a spinner (whatever its called lol)
  if (isLoading) {
    return (
      <div className="flex items-center justify-center text-gray-300 h-64">
        <LoaderCircle className="animate-spin mr-3 h-8 w-8 text-blue-400" />
        Loading...
      </div>
    );
  }

  //logic for displaying error messages if there is an error or if the suggestion is not found
  if (error) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-red-400 mb-4">Error</h2>
        <p className="text-gray-300">{error}</p>
      </div>
    );
  }

  if (!suggestion) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-red-400 mb-4">Not Found</h2>
        <p className="text-gray-300">The requested suggestion could not be found.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold text-blue-400 flex items-center">
          <MessageSquare className="mr-2 h-6 w-6" />
          {suggestion.title}
        </h2>
        <button
          onClick={handleDeleteSuggestion}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors duration-300 flex items-center"
        >
          <Trash2 className="mr-1 h-4 w-4" />
          Delete Suggestion
        </button>
      </div>
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
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="bg-gray-700 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <p className="text-gray-200">{comment.content}</p>
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="text-red-400 hover:text-red-500 transition-colors duration-300"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
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
          ))
        ) : (
          <div className="bg-gray-700 p-4 rounded-lg flex items-center justify-center">
            <MessageSquareOff className="mr-2 h-5 w-5 text-gray-400" />
            <p className="text-gray-400">No comments yet. Be the first to comment!</p>
          </div>
        )}
      </div>

      <CommentForm suggestionId={id} onCommentAdded={handleNewComment} />
    </div>
  );
};

export default SuggestionInfo;