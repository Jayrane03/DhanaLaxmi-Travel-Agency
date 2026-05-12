const packages = [
  {
    id: 1,
    title: "Goa Beach Escape",
    location: "Goa",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2",
    duration: { days: 4, nights: 3 },
    pricePerPerson: 12999,
    description: "Enjoy beaches and nightlife.",

    tourIncludes: {
      hotel: true,
      meals: true,
      flight: false,
      sightseeing: true,
      transport: true,
      visa: false,
    },

    tourManager:
      "Tour includes the services of our professional Tour Manager.",

    tourHighlights: [
      "Baga Beach",
      "Calangute Beach",
      "Anjuna Night Market",
      "Water Sports",
      "Beach Party",
      "Sunset Cruise",
    ],

    placesCovered: [
      "Baga Beach",
      "Calangute",
      "Anjuna",
    ],

    activities: [
      "Beach party",
      "Water sports",
      "Nightlife",
    ],

    itinerary: [
      {
        day: 1,
        title: "Arrival",
        desc: "Hotel check-in + beach visit",
      },
      {
        day: 2,
        title: "Beach Tour",
        desc: "Baga & Calangute",
      },
      {
        day: 3,
        title: "Adventure",
        desc: "Water sports",
      },
      {
        day: 4,
        title: "Departure",
        desc: "Checkout",
      },
    ],
  },

  {
    id: 2,
    title: "Jaipur Royal Tour",
    location: "Jaipur",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245",
    duration: { days: 3, nights: 2 },
    pricePerPerson: 9499,
    description: "Explore forts and palaces.",

    tourIncludes: {
      hotel: true,
      meals: true,
      flight: false,
      sightseeing: true,
      transport: true,
      visa: false,
    },

    tourManager:
      "Professional guide included throughout the journey.",

    tourHighlights: [
      "Amber Fort",
      "Hawa Mahal",
      "City Palace",
      "Traditional Rajasthani Dinner",
      "Local Shopping",
    ],

    placesCovered: [
      "Amber Fort",
      "Hawa Mahal",
      "City Palace",
    ],

    activities: [
      "Fort visits",
      "Shopping",
      "Cultural shows",
    ],

    itinerary: [
      {
        day: 1,
        title: "Arrival",
        desc: "Local sightseeing",
      },
      {
        day: 2,
        title: "City Tour",
        desc: "Forts & palaces",
      },
      {
        day: 3,
        title: "Departure",
        desc: "Checkout",
      },
    ],
  },

  {
    id: 3,
    title: "Manali Adventure",
    location: "Manali",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23",
    duration: { days: 5, nights: 4 },
    pricePerPerson: 14999,
    description: "Snow and adventure sports.",

    tourIncludes: {
      hotel: true,
      meals: true,
      flight: false,
      sightseeing: true,
      transport: true,
      visa: false,
    },

    tourManager:
      "Experienced mountain tour manager included.",

    tourHighlights: [
      "Solang Valley",
      "Rohtang Pass",
      "Snow Activities",
      "River Rafting",
      "Mall Road Visit",
    ],

    placesCovered: [
      "Solang Valley",
      "Rohtang Pass",
    ],

    activities: [
      "Skiing",
      "Paragliding",
      "Snow rides",
    ],

    itinerary: [
      {
        day: 1,
        title: "Arrival",
        desc: "Check-in",
      },
      {
        day: 2,
        title: "Solang Valley",
        desc: "Adventure sports",
      },
      {
        day: 3,
        title: "Rohtang Pass",
        desc: "Snow activities",
      },
      {
        day: 4,
        title: "Local Tour",
        desc: "Temples + market",
      },
      {
        day: 5,
        title: "Departure",
        desc: "Checkout",
      },
    ],
  },

  {
    id: 4,
    title: "Kerala Backwaters",
    location: "Kerala",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944",
    duration: { days: 4, nights: 3 },
    pricePerPerson: 13499,
    description: "Relax in houseboats.",

    tourIncludes: {
      hotel: true,
      meals: true,
      flight: true,
      sightseeing: true,
      transport: true,
      visa: false,
    },

    tourManager:
      "Dedicated Kerala travel expert included.",

    tourHighlights: [
      "Houseboat Stay",
      "Backwater Cruise",
      "Ayurvedic Spa",
      "Village Tour",
      "Traditional Kerala Food",
    ],

    placesCovered: [
      "Alleppey",
      "Kumarakom",
    ],

    activities: [
      "Boat ride",
      "Ayurveda",
      "Nature",
    ],

    itinerary: [
      {
        day: 1,
        title: "Arrival",
        desc: "Check-in",
      },
      {
        day: 2,
        title: "Houseboat",
        desc: "Backwater stay",
      },
      {
        day: 3,
        title: "Village Tour",
        desc: "Explore culture",
      },
      {
        day: 4,
        title: "Departure",
        desc: "Checkout",
      },
    ],
  },

  {
    id: 5,
    title: "Kashmir Paradise",
    location: "Kashmir",
    image:
      "https://images.unsplash.com/photo-1598091383021-15ddea10925d",
    duration: { days: 6, nights: 5 },
    pricePerPerson: 18999,
    description: "Heaven on Earth.",

    tourIncludes: {
      hotel: true,
      meals: true,
      flight: true,
      sightseeing: true,
      transport: true,
      visa: false,
    },

    tourManager:
      "Luxury Kashmir trip with tour assistance.",

    tourHighlights: [
      "Dal Lake Shikara Ride",
      "Gulmarg Snow",
      "Pahalgam Valley",
      "Mughal Gardens",
      "Local Kashmiri Market",
    ],

    placesCovered: [
      "Srinagar",
      "Gulmarg",
      "Pahalgam",
    ],

    activities: [
      "Shikara ride",
      "Snow",
      "Sightseeing",
    ],

    itinerary: [
      {
        day: 1,
        title: "Arrival",
        desc: "Houseboat stay",
      },
      {
        day: 2,
        title: "Gulmarg",
        desc: "Snow activities",
      },
      {
        day: 3,
        title: "Pahalgam",
        desc: "Valley visit",
      },
      {
        day: 4,
        title: "Local Tour",
        desc: "Gardens",
      },
      {
        day: 5,
        title: "Shopping",
        desc: "Local market",
      },
      {
        day: 6,
        title: "Departure",
        desc: "Checkout",
      },
    ],
  },

  {
    id: 6,
    title: "Dubai Luxury Tour",
    location: "Dubai",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
    duration: { days: 5, nights: 4 },
    pricePerPerson: 29900,
    description: "Luxury Dubai vacation.",

    tourIncludes: {
      hotel: true,
      meals: true,
      flight: true,
      sightseeing: true,
      transport: true,
      visa: true,
    },

    tourManager:
      "International tour manager included.",

    tourHighlights: [
      "Burj Khalifa",
      "Desert Safari",
      "Dubai Mall",
      "Marina Cruise",
      "Global Village",
    ],

    placesCovered: [
      "Burj Khalifa",
      "Dubai Mall",
      "Palm Jumeirah",
    ],

    activities: [
      "Safari",
      "Cruise",
      "Shopping",
    ],

    itinerary: [
      {
        day: 1,
        title: "Arrival",
        desc: "Hotel check-in",
      },
      {
        day: 2,
        title: "City Tour",
        desc: "Dubai sightseeing",
      },
      {
        day: 3,
        title: "Desert Safari",
        desc: "Adventure activities",
      },
      {
        day: 4,
        title: "Shopping",
        desc: "Mall visit",
      },
      {
        day: 5,
        title: "Departure",
        desc: "Checkout",
      },
    ],
  },

  {
    id: 7,
    title: "Thailand Escape",
    location: "Thailand",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    duration: { days: 5, nights: 4 },
    pricePerPerson: 25999,
    description: "Tropical beaches and nightlife.",

    tourIncludes: {
      hotel: true,
      meals: true,
      flight: true,
      sightseeing: true,
      transport: true,
      visa: true,
    },

    tourManager:
      "Professional Thailand tour assistance.",

    tourHighlights: [
      "Phuket Beaches",
      "Bangkok Nightlife",
      "Island Tour",
      "Coral Island",
      "Floating Market",
    ],

    placesCovered: [
      "Bangkok",
      "Phuket",
      "Pattaya",
    ],

    activities: [
      "Island hopping",
      "Nightlife",
      "Water sports",
    ],

    itinerary: [
      {
        day: 1,
        title: "Arrival",
        desc: "Check-in",
      },
      {
        day: 2,
        title: "Island Tour",
        desc: "Explore beaches",
      },
      {
        day: 3,
        title: "Adventure",
        desc: "Water activities",
      },
      {
        day: 4,
        title: "Shopping",
        desc: "Local markets",
      },
      {
        day: 5,
        title: "Departure",
        desc: "Checkout",
      },
    ],
  },

  {
    id: 8,
    title: "Maldives Honeymoon",
    location: "Maldives",
    image:
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd",
    duration: { days: 5, nights: 4 },
    pricePerPerson: 49999,
    description: "Luxury water villa experience.",

    tourIncludes: {
      hotel: true,
      meals: true,
      flight: true,
      sightseeing: true,
      transport: true,
      visa: true,
    },

    tourManager:
      "Premium honeymoon assistance included.",

    tourHighlights: [
      "Water Villa Stay",
      "Private Beach Dinner",
      "Snorkeling",
      "Luxury Spa",
      "Sunset Cruise",
    ],

    placesCovered: [
      "Male",
      "Resort Islands",
    ],

    activities: [
      "Snorkeling",
      "Spa",
      "Cruise",
    ],

    itinerary: [
      {
        day: 1,
        title: "Arrival",
        desc: "Resort check-in",
      },
      {
        day: 2,
        title: "Beach Day",
        desc: "Relax",
      },
      {
        day: 3,
        title: "Water Sports",
        desc: "Adventure",
      },
      {
        day: 4,
        title: "Luxury Dinner",
        desc: "Romantic evening",
      },
      {
        day: 5,
        title: "Departure",
        desc: "Checkout",
      },
    ],
  },

  {
    id: 9,
    title: "Paris Dream Tour",
    location: "Paris",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    duration: { days: 6, nights: 5 },
    pricePerPerson: 69999,
    description: "Romantic Paris vacation.",

    tourIncludes: {
      hotel: true,
      meals: true,
      flight: true,
      sightseeing: true,
      transport: true,
      visa: true,
    },

    tourManager:
      "Europe tour manager included.",

    tourHighlights: [
      "Eiffel Tower",
      "Seine River Cruise",
      "Louvre Museum",
      "Disneyland Paris",
      "Luxury Shopping",
    ],

    placesCovered: [
      "Eiffel Tower",
      "Louvre",
      "Disneyland",
    ],

    activities: [
      "Cruise",
      "Sightseeing",
      "Shopping",
    ],

    itinerary: [
      {
        day: 1,
        title: "Arrival",
        desc: "Hotel check-in",
      },
      {
        day: 2,
        title: "City Tour",
        desc: "Explore Paris",
      },
      {
        day: 3,
        title: "Museum Visit",
        desc: "Louvre tour",
      },
      {
        day: 4,
        title: "Disneyland",
        desc: "Fun activities",
      },
      {
        day: 5,
        title: "Shopping",
        desc: "Luxury shopping",
      },
      {
        day: 6,
        title: "Departure",
        desc: "Checkout",
      },
    ],
  },

  {
    id: 10,
    title: "Switzerland Alps",
    location: "Switzerland",
    image:
      "https://images.unsplash.com/photo-1521295121783-8a321d551ad2",
    duration: { days: 7, nights: 6 },
    pricePerPerson: 79999,
    description: "Snow mountains and scenic beauty.",

    tourIncludes: {
      hotel: true,
      meals: true,
      flight: true,
      sightseeing: true,
      transport: true,
      visa: true,
    },

    tourManager:
      "Swiss Alps luxury tour included.",

    tourHighlights: [
      "Mount Titlis",
      "Jungfraujoch",
      "Interlaken",
      "Scenic Train Ride",
      "Snow Adventure",
    ],

    placesCovered: [
      "Zurich",
      "Interlaken",
      "Lucerne",
    ],

    activities: [
      "Skiing",
      "Snow rides",
      "Sightseeing",
    ],

    itinerary: [
      {
        day: 1,
        title: "Arrival",
        desc: "Hotel check-in",
      },
      {
        day: 2,
        title: "Mountain Tour",
        desc: "Explore Alps",
      },
      {
        day: 3,
        title: "Snow Activities",
        desc: "Adventure",
      },
      {
        day: 4,
        title: "Train Ride",
        desc: "Scenic views",
      },
      {
        day: 5,
        title: "Shopping",
        desc: "Swiss stores",
      },
      {
        day: 6,
        title: "Leisure",
        desc: "Free day",
      },
      {
        day: 7,
        title: "Departure",
        desc: "Checkout",
      },
    ],
  },

  // ADD MORE SAME STRUCTURE

];
export default packages;