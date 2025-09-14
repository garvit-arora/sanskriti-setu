import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface User {
  _id: string;
  name: string;
  culturalProfile: {
    state: string;
    city: string;
  };
}

interface DiscoverProps {
  user: User | null;
  onLogout: () => void;
}

const mockMatches = [
  {
    _id: '1',
    name: 'Priya Sharma',
    culturalProfile: {
      state: 'Punjab',
      city: 'Chandigarh',
      bio: 'Love sharing Punjabi traditions and learning about other cultures!',
      primaryLanguages: ['Punjabi', 'Hindi']
    },
    matchScore: 92,
    commonInterests: ['festivals', 'cooking', 'folk_dances'],
    profilePicture: '👩🏻'
  },
  {
    _id: '2', 
    name: 'Arjun Nair',
    culturalProfile: {
      state: 'Kerala',
      city: 'Kochi',
      bio: 'Kathakali artist eager to share Kerala\'s rich heritage',
      primaryLanguages: ['Malayalam', 'Tamil']
    },
    matchScore: 87,
    commonInterests: ['art', 'music', 'traditions'],
    profilePicture: '👨🏾'
  },
  {
    _id: '3',
    name: 'Meera Patel', 
    culturalProfile: {
      state: 'Gujarat',
      city: 'Ahmedabad',
      bio: 'Passionate about Gujarati cuisine and Garba dance',
      primaryLanguages: ['Gujarati', 'Hindi']
    },
    matchScore: 85,
    commonInterests: ['festivals', 'dance', 'food'],
    profilePicture: '👩🏽'
  }
];

const Discover: React.FC<DiscoverProps> = ({ user, onLogout }) => {
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [matches] = useState(mockMatches);
  
  const currentMatch = matches[currentMatchIndex];
  
  const handleAction = (action: 'like' | 'pass') => {
    if (action === 'like') {
      toast.success(`You liked ${currentMatch.name}! 🎉`);
      // In a real app, this would make an API call
    } else {
      toast(`Passed on ${currentMatch.name}`);
    }
    
    // Move to next match
    if (currentMatchIndex < matches.length - 1) {
      setCurrentMatchIndex(currentMatchIndex + 1);
    } else {
      toast('No more matches for now! Check back later.', {
        icon: '✨'
      });
    }
  };

  if (currentMatchIndex >= matches.length) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/dashboard" className="text-2xl font-bold text-orange-900">Sanskriti Setu</Link>
              </div>
              <div className="flex items-center space-x-6">
                <Link to="/dashboard" className="text-gray-700 hover:text-orange-600">Dashboard</Link>
                <Link to="/matches" className="text-gray-700 hover:text-orange-600">Matches</Link>
                <button onClick={onLogout} className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
        
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">No more matches!</h1>
          <p className="text-gray-600 mb-8">Check back later for new cultural connections.</p>
          <Link to="/dashboard" className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/dashboard" className="text-2xl font-bold text-orange-900">Sanskriti Setu</Link>
            </div>
            <div className="flex items-center space-x-6">
              <Link to="/dashboard" className="text-gray-700 hover:text-orange-600">Dashboard</Link>
              <Link to="/matches" className="text-gray-700 hover:text-orange-600">Matches</Link>
              <button onClick={onLogout} className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Cultural Connections</h1>
          <p className="text-gray-600">Find people from different states to exchange culture with</p>
        </div>

        {/* Match Card */}
        <motion.div
          key={currentMatch._id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8"
        >
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-orange-400 to-red-400 p-8 text-white text-center">
            <div className="text-6xl mb-4">{currentMatch.profilePicture}</div>
            <h2 className="text-2xl font-bold mb-2">{currentMatch.name}</h2>
            <p className="text-orange-100">{currentMatch.culturalProfile.city}, {currentMatch.culturalProfile.state}</p>
          </div>
          
          {/* Match Score */}
          <div className="px-8 py-4 bg-green-50">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{currentMatch.matchScore}%</div>
                <div className="text-sm text-green-700">Cultural Match</div>
              </div>
            </div>
          </div>
          
          {/* Profile Info */}
          <div className="p-8">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">About</h3>
              <p className="text-gray-600">{currentMatch.culturalProfile.bio}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {currentMatch.culturalProfile.primaryLanguages.map((language, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {language}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Common Interests</h3>
              <div className="flex flex-wrap gap-2">
                {currentMatch.commonInterests.map((interest, index) => (
                  <span key={index} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                    {interest.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-6">
          <button
            onClick={() => handleAction('pass')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-lg px-8 py-4 rounded-full transition duration-200 flex items-center"
          >
            ❌ Pass
          </button>
          
          <button
            onClick={() => handleAction('like')}
            className="bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-4 rounded-full transition duration-200 flex items-center"
          >
            💚 Like
          </button>
        </div>
        
        <div className="text-center mt-6 text-gray-500 text-sm">
          {matches.length - currentMatchIndex - 1} more matches available
        </div>
      </div>
    </div>
  );
};

export default Discover;
