import images from './images';

export const products = [
  {
    id: 0,
    discount: 30,
    liked: false,
    productName: 'Coffee',
    price: 700,
    originalPrice: 1000,
    image: images.coffee,
  },
  {
    id: 1,
    discount: 30,
    liked: false,
    productName: 'Tea',
    price: 500,
    originalPrice: 7000,
    image: images.coffee,
  },
  {
    id: 2,
    discount: 30,
    liked: false,
    productName: 'Juice',
    price: 300,
    originalPrice: 500,
    image: images.coffee,
  },
];

export const carouselItems = [
  {
    id: 0,
    time: '2d 14h 5m 11s',
    image: images.perfume,
  },
  {
    id: 1,
    time: '3d 15h 6m 12s',
    image: images.headphones,
  },
  {
    id: 2,
    time: '4d 16h 7m 13s',
    image: images.coffee,
  },
];
