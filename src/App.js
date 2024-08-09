import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import { generateRandomSuggestion, dataMocker } from './Components/Data/DataMocker';
import { Home, Zap, PlusCircle } from 'lucide-react';
import SuggestionLister from './Components/SuggestionLister';
import SuggestionInfo from './Components/SuggestionInfo';
import CreateSuggestionForm from './Components/CreateSuggestionForm';

function App() {
  const [suggestions, setSuggestions] = useState([]);

  //useEffect to get suggestions from dataMocker and set them to state
  useEffect(() => {
    setSuggestions(dataMocker.getSuggestions());
  }, []);

  //const to generate a random suggestion and add it to the state
  const RandomSuggestion = () => {
    const newSuggestion = generateRandomSuggestion();
    setSuggestions(prevSuggestions => [...prevSuggestions, newSuggestion]);
  };
  //const to add a new suggestion to the state
  const NewSuggestion = (newSuggestion) => {
    setSuggestions(prevSuggestions => [...prevSuggestions, newSuggestion]);
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
                  <button
                    onClick={RandomSuggestion}
                    className="mb-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-full transition-all duration-300 font-bold shadow-xl hover:shadow-2xl mx-auto block text-lg flex items-center"
                  >
                    <Zap className="mr-2" size={20} />
                    Generate Random Suggestion
                  </button>
                  <SuggestionLister suggestions={suggestions} />
                </>
              } />
              <Route path="/new" element={<CreateSuggestionForm onSuggestionAdded={NewSuggestion} />} />
              <Route path="/suggestion/:id" element={<SuggestionInfo />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;