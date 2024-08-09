import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, User, Calendar } from 'lucide-react';

//this will be displayed as a card in the suggestion list
const Suggestion = ({ suggestion }) => (
  <div className="bg-gray-800 rounded-lg transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl flex flex-col h-full transform hover:-translate-y-1 hover:scale-102">
    <div className="p-5 flex-grow">
      <Link 
        to={`/suggestion/${suggestion.id}`} 
        className="text-xl font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-300 flex items-start mb-3"
      >
        <MessageSquare className="mr-2 h-5 w-5 flex-shrink-0 mt-1" />
        <span className="break-words">{suggestion.title}</span>
      </Link>
      <p className="text-gray-300 text-sm line-clamp-3">{suggestion.description}</p>
    </div>
    <div className="bg-gray-900 px-5 py-3 text-xs text-gray-400 flex justify-between items-center mt-auto">
      <span className="flex items-center">
        <User className="mr-1 h-4 w-4" />
        {suggestion.author}
      </span>
      <span className="flex items-center">
        <Calendar className="mr-1 h-4 w-4" />
        {new Date(suggestion.createdAt).toLocaleDateString()}
      </span>
    </div>
  </div>
);

//this will show a list of the suggestion cards defined above
const SuggestionLister = ({ suggestions }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {suggestions.map((suggestion) => (
        <Suggestion key={suggestion.id} suggestion={suggestion} />
      ))}
    </div>
  );
};

export default SuggestionLister;