import {UPDATE_PRODUCTS, UPDATE_CART} from '../types';
import moment from 'moment';

const initialState = {
  products: [
    {
      id: 0,
      liked: false,
      productName: 'Coffee',
      bid: true,
      bids: [
        {
          userId: 0,
          bidAmount: 1000,
        },
        {
          userId: 1,
          bidAmount: 2000,
        },
        {
          userId: 2,
          bidAmount: 3000,
        },
        {
          userId: 3,
          bidAmount: 4000,
        },
        {
          userId: 4,
          bidAmount: 5000,
        },
      ],
      auctionId: moment(),
      price: 700,
      minimumPrice: 9.9,
      originalPrice: 1000,
      image:
        'https://firebasestorage.googleapis.com/v0/b/droppinprices.appspot.com/o/perfume.png?alt=media&token=d825b331-1d49-45d4-9aad-da9280478225',
      category: '0',
      timestamp: moment(),
      description:
        "Coffee Queen Hip Hop Jewelry diamond cuban link chain 100% Real Solid Yellow gold of approximately 199.01 Grams weight and showcase natural 26.31 carats of prong setting cut diamond with FG/GH color & VS2/SI1/SI2/I1 clarity diamond. This mens chains available in 10k/14k/18k gold purity and yellow/rose/white gold. You'll get best price guarantee, Free us Shipping, 30 Days Return, Worldwide Shipping.",
    },
    {
      id: 1,
      liked: false,
      productName: 'Perfume',
      bid: false,
      bids: [],
      auctionId: null,
      price: 800,
      minimumPrice: 9.9,
      originalPrice: 1000,
      image:
        'https://firebasestorage.googleapis.com/v0/b/droppinprices.appspot.com/o/perfume.png?alt=media&token=d825b331-1d49-45d4-9aad-da9280478225',
      category: '0',
      timestamp: moment(),
      description:
        "Coffee Queen Hip Hop Jewelry diamond cuban link chain 100% Real Solid Yellow gold of approximately 199.01 Grams weight and showcase natural 26.31 carats of prong setting cut diamond with FG/GH color & VS2/SI1/SI2/I1 clarity diamond. This mens chains available in 10k/14k/18k gold purity and yellow/rose/white gold. You'll get best price guarantee, Free us Shipping, 30 Days Return, Worldwide Shipping.",
    },
    {
      id: 2,
      liked: false,
      productName: 'Coffee',
      bid: true,
      bids: [
        {
          userId: 0,
          bidAmount: 1000,
        },
        {
          userId: 1,
          bidAmount: 2000,
        },
        {
          userId: 2,
          bidAmount: 3000,
        },
        {
          userId: 3,
          bidAmount: 4000,
        },
        {
          userId: 4,
          bidAmount: 5000,
        },
      ],
      auctionId: moment(),
      price: 700,
      minimumPrice: 9.9,
      originalPrice: 1000,
      image:
        'https://firebasestorage.googleapis.com/v0/b/droppinprices.appspot.com/o/perfume.png?alt=media&token=d825b331-1d49-45d4-9aad-da9280478225',
      category: '0',
      timestamp: moment(),
      description:
        "Coffee Queen Hip Hop Jewelry diamond cuban link chain 100% Real Solid Yellow gold of approximately 199.01 Grams weight and showcase natural 26.31 carats of prong setting cut diamond with FG/GH color & VS2/SI1/SI2/I1 clarity diamond. This mens chains available in 10k/14k/18k gold purity and yellow/rose/white gold. You'll get best price guarantee, Free us Shipping, 30 Days Return, Worldwide Shipping.",
    },
    {
      id: 4,
      liked: false,
      productName: 'Coffee',
      bid: true,
      bids: [
        {
          userId: 0,
          bidAmount: 1000,
        },
        {
          userId: 1,
          bidAmount: 2000,
        },
        {
          userId: 2,
          bidAmount: 3000,
        },
        {
          userId: 3,
          bidAmount: 4000,
        },
        {
          userId: 4,
          bidAmount: 5000,
        },
      ],
      auctionId: moment(),
      price: 700,
      minimumPrice: 9.9,
      originalPrice: 1000,
      image:
        'https://firebasestorage.googleapis.com/v0/b/droppinprices.appspot.com/o/perfume.png?alt=media&token=d825b331-1d49-45d4-9aad-da9280478225',
      category: '0',
      timestamp: moment(),
      description:
        "Coffee Queen Hip Hop Jewelry diamond cuban link chain 100% Real Solid Yellow gold of approximately 199.01 Grams weight and showcase natural 26.31 carats of prong setting cut diamond with FG/GH color & VS2/SI1/SI2/I1 clarity diamond. This mens chains available in 10k/14k/18k gold purity and yellow/rose/white gold. You'll get best price guarantee, Free us Shipping, 30 Days Return, Worldwide Shipping.",
    },
    {
      id: 5,
      liked: false,
      productName: 'Perfume',
      bid: false,
      bids: [],
      auctionId: null,
      price: 800,
      minimumPrice: 9.9,
      originalPrice: 1000,
      image:
        'https://firebasestorage.googleapis.com/v0/b/droppinprices.appspot.com/o/perfume.png?alt=media&token=d825b331-1d49-45d4-9aad-da9280478225',
      category: '0',
      timestamp: moment(),
      description:
        "Coffee Queen Hip Hop Jewelry diamond cuban link chain 100% Real Solid Yellow gold of approximately 199.01 Grams weight and showcase natural 26.31 carats of prong setting cut diamond with FG/GH color & VS2/SI1/SI2/I1 clarity diamond. This mens chains available in 10k/14k/18k gold purity and yellow/rose/white gold. You'll get best price guarantee, Free us Shipping, 30 Days Return, Worldwide Shipping.",
    },
    {
      id: 6,
      liked: false,
      productName: 'Perfume',
      bid: false,
      bids: [],
      auctionId: null,
      price: 800,
      minimumPrice: 9.9,
      originalPrice: 1000,
      image:
        'https://firebasestorage.googleapis.com/v0/b/droppinprices.appspot.com/o/perfume.png?alt=media&token=d825b331-1d49-45d4-9aad-da9280478225',
      category: '0',
      timestamp: moment(),
      description:
        "Coffee Queen Hip Hop Jewelry diamond cuban link chain 100% Real Solid Yellow gold of approximately 199.01 Grams weight and showcase natural 26.31 carats of prong setting cut diamond with FG/GH color & VS2/SI1/SI2/I1 clarity diamond. This mens chains available in 10k/14k/18k gold purity and yellow/rose/white gold. You'll get best price guarantee, Free us Shipping, 30 Days Return, Worldwide Shipping.",
    },
  ],
  cart: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_PRODUCTS:
      console.log('UPDATE_PRODUCTS is called: ', action.payload);
      return {
        ...state,
        products: [...action.payload],
      };

    case UPDATE_CART:
      console.log('UPDATE_CART is called: ', action.payload);
      return {
        ...state,
        cart: [...action.payload],
      };

    default:
      return state;
  }
}
