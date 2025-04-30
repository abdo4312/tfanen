// constants/Data.js

// Mock data for the StationeryHub app

// Categories data
export const Categories = [
  {
    id: 'cat1',
    name: 'Notebooks',
    icon: '📓',
    color: '#FFD1DC',
  },
  {
    id: 'cat2',
    name: 'Pens',
    icon: '🖋️',
    color: '#A2D2FF',
  },
  {
    id: 'cat3',
    name: 'Art Supplies',
    icon: '🎨',
    color: '#CDB4DB',
  },
  {
    id: 'cat4',
    name: 'Desk Accessories',
    icon: '🔍',
    color: '#CAFFBF',
  },
  {
    id: 'cat5',
    name: 'School Supplies',
    icon: '📚',
    color: '#FDFFB6',
  },
  {
    id: 'cat6',
    name: 'Planners',
    icon: '📅',
    color: '#FFD6A5',
  },
];

// Products data
export const Products = [
  {
    id: 'prod1',
    name: 'Premium Notebook',
    price: 12.99,
    image: 'https://images.pexels.com/photos/6372698/pexels-photo-6372698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.5,
    categoryId: 'cat1',
    isBestseller: true,
    isNew: false,
    description: 'High-quality notebook with 200 pages, hardcover, and bookmark ribbon.',
  },
  {
    id: 'prod2',
    name: 'Gel Pen Set (10 colors)',
    price: 8.99,
    image: 'https://images.pexels.com/photos/4226896/pexels-photo-4226896.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.8,
    categoryId: 'cat2',
    isBestseller: true,
    isNew: true,
    description: 'Smooth writing gel pens in 10 vibrant colors. Water-resistant ink.',
  },
  {
    id: 'prod3',
    name: 'Watercolor Paint Set',
    price: 24.99,
    image: 'https://images.pexels.com/photos/1646953/pexels-photo-1646953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.7,
    categoryId: 'cat3',
    isBestseller: false,
    isNew: true,
    description: 'Professional watercolor paint set with 24 colors and mixing palette.',
  },
  {
    id: 'prod4',
    name: 'Desk Organizer',
    price: 19.99,
    image: 'https://images.pexels.com/photos/6475046/pexels-photo-6475046.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.3,
    categoryId: 'cat4',
    isBestseller: true,
    isNew: false,
    description: 'Multi-compartment desk organizer for pens, pencils, and small accessories.',
  },
  {
    id: 'prod5',
    name: 'Scientific Calculator',
    price: 15.99,
    image: 'https://images.pexels.com/photos/5775/calculator-scientific.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.6,
    categoryId: 'cat5',
    isBestseller: true,
    isNew: false,
    description: 'Advanced scientific calculator with 240 functions and 2-line display.',
  },
  {
    id: 'prod6',
    name: '2023 Weekly Planner',
    price: 14.99,
    image: 'https://images.pexels.com/photos/6192117/pexels-photo-6192117.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4.9,
    categoryId: 'cat6',
    isBestseller: true,
    isNew: true,
    description: 'Weekly planner with goals section, monthly overviews, and note pages.',
  },
];