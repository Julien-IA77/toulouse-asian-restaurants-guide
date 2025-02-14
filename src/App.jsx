import React, { useState } from 'react';
import { Map, Navigation } from 'lucide-react';
import { restaurantsData } from './data/restaurants';
import './styles/main.css';

// Composant InteractiveMap
const InteractiveMap = ({ restaurant, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white flex justify-between items-center">
        <h3 className="text-lg font-bold">{restaurant.name}</h3>
        <button 
          onClick={onClose}
          className="text-white hover:text-gray-200"
        >
          ✕
        </button>
      </div>
      
      <div className="relative h-96">
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl font-bold text-gray-800 mb-2">
              {restaurant.address}
            </p>
            <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg mx-auto"></div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-gray-600">{restaurant.address}</p>
            <p className="text-sm text-gray-500 mt-1">{restaurant.type.charAt(0).toUpperCase() + restaurant.type.slice(1)}</p>
          </div>
          <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
            {restaurant.rating}/10
          </span>
        </div>
        <div className="text-sm text-gray-600">
          <p className="font-semibold mb-1">Horaires :</p>
          <p>{restaurant.horaires}</p>
        </div>
      </div>
    </div>
  </div>
);

// Composant RestaurantCard
const RestaurantCard = ({ restaurant, onSelect }) => (
  <div className="bg-white rounded-lg shadow overflow-hidden">
    <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white relative">
      <h2 className="text-xl font-bold mb-1">{restaurant.name}</h2>
      <p className="text-sm opacity-90">
        {restaurant.type.charAt(0).toUpperCase() + restaurant.type.slice(1)}
      </p>
      <span className="absolute top-6 right-6 bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-bold">
        {restaurant.rating}/10
      </span>
    </div>
    <div className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Spécialités</h3>
        <p className="text-gray-600">{restaurant.specialites}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Horaires</h3>
        <p className="text-gray-600">{restaurant.horaires}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Adresse</h3>
        <p className="text-gray-600">{restaurant.address}</p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500 mb-4">
        <p className="text-gray-600 italic">{restaurant.avis}</p>
      </div>
      <button
        onClick={() => onSelect(restaurant)}
        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
      >
        <Map size={16} />
        Voir sur la carte
      </button>
    </div>
  </div>
);

// Composant principal RestaurantsApp
const RestaurantsApp = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    cuisine: 'all',
    rating: 0
  });

  const cuisineTypes = ['all', 'indien', 'japonais', 'chinois', 'coreen', 'vietnamien', 'thailandais', 'fusion'];

  const filteredRestaurants = restaurantsData.filter(restaurant => {
    const matchesCuisine = activeFilters.cuisine === 'all' || restaurant.type === activeFilters.cuisine;
    const matchesRating = restaurant.rating >= activeFilters.rating;
    return matchesCuisine && matchesRating;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Les Meilleurs Restaurants Asiatiques de Toulouse
        </h1>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-wrap gap-4">
            <div className="w-full md:w-auto flex-grow">
              <h3 className="font-semibold text-gray-700 mb-2">Filtrer par cuisine :</h3>
              <div className="flex flex-wrap gap-2">
                {cuisineTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => setActiveFilters({...activeFilters, cuisine: type})}
                    className={`px-4 py-2 rounded-full ${
                      activeFilters.cuisine === type
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {type === 'all' ? 'Tous' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full md:w-auto">
              <h3 className="font-semibold text-gray-700 mb-2">Note minimum :</h3>
              <select
                value={activeFilters.rating}
                onChange={(e) => setActiveFilters({...activeFilters, rating: parseFloat(e.target.value)})}
                className="px-4 py-2 rounded-md border border-gray-300"
              >
                <option value="0">Toutes les notes</option>
                <option value="9.5">9.5+</option>
                <option value="9">9.0+</option>
                <option value="8.5">8.5+</option>
                <option value="8">8.0+</option>
              </select>
            </div>
          </div>
        </div>

        {selectedRestaurant && (
          <InteractiveMap 
            restaurant={selectedRestaurant}
            onClose={() => setSelectedRestaurant(null)}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard 
              key={restaurant.name} 
              restaurant={restaurant}
              onSelect={setSelectedRestaurant}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantsApp;