import React, { useState } from 'react';
import { Map, Navigation } from 'lucide-react';

const restaurantsData = [
  {
    name: 'Le Shahi Dhaba',
    type: 'indien',
    rating: 9.7,
    specialites: "Spécialités tandoori et curry, saveurs authentiques de l'Inde",
    horaires: '7j/7j - Déjeuner et Dîner',
    avis: 'Quel merveilleux et copieux repas. Le meilleur restaurant Indien dans lequel j\'ai mangé.',
    location: { lat: 43.604652, lng: 1.444209 },
    address: '8 Rue Maury, 31000 Toulouse'
  },
  // ... le reste des données des restaurants
];

// Le reste du code du composant
