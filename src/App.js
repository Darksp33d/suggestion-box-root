import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import { generateRandomSuggestion, getSuggestions, deleteSuggestion } from './Components/Data/apiData';
import { Home, Zap, PlusCircle } from 'lucide-react';
import SuggestionLister from './Components/SuggestionLister';
import SuggestionInfo from './Components/SuggestionInfo';
import CreateSuggestionForm from './Components/CreateSuggestionForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [suggestions, setSuggestions] = useState([]);

  //useEffect to get suggestions from api and set them to state
  useEffect(() => {
    const fetchSuggestions = async () => {
      const fetchedSuggestions = await getSuggestions();
      setSuggestions(fetchedSuggestions);
    };
    fetchSuggestions();
  }, []);

  //function to generate a random suggestion and add it to the state
  const RandomSuggestion = async () => {
    try {
      const newSuggestion = await generateRandomSuggestion();
      setSuggestions(prevSuggestions => [...prevSuggestions, newSuggestion]);
      toast.success('Random suggestion generated!');
    } catch (error) {
      console.error('Failed to generate random suggestion:', error);
      toast.error('Failed to generate random suggestion');
    }
  };
  
  //function to add a new suggestion to the state
  const NewSuggestion = (newSuggestion) => {
    setSuggestions(prevSuggestions => [...prevSuggestions, newSuggestion]);
  };

  //function to delete a suggestion by id and remove it from the state
  const DeleteSuggestion = async (deletedSuggestionId) => {
    try {
      await deleteSuggestion(deletedSuggestionId);
      //remove the deleted suggestion from the state by filtering it out by id
      setSuggestions(prevSuggestions => prevSuggestions.filter(suggestion => suggestion.id !== deletedSuggestionId));
    } catch (error) {
      console.error('Failed to delete suggestion:', error);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold leading-relaxed py-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Saeed's Suggestion Box
            </h1>
            <nav className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-full shadow-xl p-1">
              <ul className="flex space-x-2">
                <li>
                  <button
                    onClick={RandomSuggestion}
                    className="px-4 py-2 rounded-full transition-all duration-300 flex items-center text-gray-300 hover:bg-gray-700 hover:bg-opacity-50"
                  >
                    <Zap className="mr-2" size={18} />
                    Random
                  </button>
                </li>
                <li>
                  <NavLink to="/" className={({ isActive }) =>
                    `px-4 py-2 rounded-full transition-all duration-300 flex items-center ${isActive ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:bg-opacity-50'
                    }`
                  }>
                    <Home className="mr-2" size={18} />
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/new" className={({ isActive }) =>
                    `px-4 py-2 rounded-full transition-all duration-300 flex items-center ${isActive ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:bg-opacity-50'
                    }`
                  }>
                    <PlusCircle className="mr-2" size={18} />
                    New
                  </NavLink>
                </li>
              </ul>
            </nav>
          </header>
          <main className="relative">
            <Routes>
              <Route path="/" element={
                <>
                  {suggestions.length === 0 ? (
                    <div className="text-center py-10">
                      <p className="text-xl mb-4">There are no suggestions yet.</p>
                      <div className="flex justify-center space-x-4">
                        <NavLink
                          to="/new"
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors duration-300"
                        >
                          Create a Suggestion
                        </NavLink>
                        <button
                          onClick={RandomSuggestion}
                          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full transition-colors duration-300"
                        >
                          Generate Random Suggestion
                        </button>
                      </div>
                    </div>
                  ) : (
                    <SuggestionLister suggestions={suggestions} />
                  )}
                </>
              } />
              <Route path="/new" element={<CreateSuggestionForm onSuggestionAdded={NewSuggestion} />} />
              <Route path="/suggestion/:id" element={<SuggestionInfo onSuggestionDeleted={DeleteSuggestion} suggestions={suggestions} />} />
            </Routes>
          </main>
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </Router>
  );
}

export default App;