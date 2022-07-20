import {
  UPDATE_PRODUCTS,
  UPDATE_CART,
  UPDATE_CATEGORIES,
  UPDATE_USER,
} from '../types';
import {categories as CATEGORIES} from '../../config/config';

const initialState = {
  // products: [
  //   {
  //     id: 0,
  //     liked: true,
  //     productName: 'Coffee',
  //     bid: true,
  //     bids: [
  //       {
  //         userId: 0,
  //         bidAmount: 1000,
  //       },
  //       {
  //         userId: 1,
  //         bidAmount: 2000,
  //       },
  //       {
  //         userId: 2,
  //         bidAmount: 3000,
  //       },
  //       {
  //         userId: 3,
  //         bidAmount: 4000,
  //       },
  //       {
  //         userId: 4,
  //         bidAmount: 5000,
  //       },
  //     ],
  //     auctionId: moment().format('HHMMSS' + Math.random() * (1 - 0) + 0),
  //     price: 500,
  //     minimumPrice: 9.9,
  //     originalPrice: 1000,
  //     image:
  //       'https://firebasestorage.googleapis.com/v0/b/droppinprices.appspot.com/o/coffee.png?alt=media&token=75577663-504b-4ca5-9051-74a4c9eed60c',
  //     category: 1,
  //     timestamp: moment(),
  //     description:
  //       'Coffee Coffee Coffee Coffee Coffee Coffee Coffee Coffee Coffee Coffee.',
  //   },
  //   {
  //     id: 1,
  //     liked: false,
  //     productName: 'Perfume',
  //     bid: false,
  //     bids: [],
  //     auctionId: null,
  //     price: 600,
  //     minimumPrice: 9.9,
  //     originalPrice: 1000,
  //     image:
  //       'https://firebasestorage.googleapis.com/v0/b/droppinprices.appspot.com/o/perfume.png?alt=media&token=d825b331-1d49-45d4-9aad-da9280478225',
  //     category: 2,
  //     timestamp: moment(),
  //     description:
  //       'Perfume Perfume Perfume Perfume Perfume Perfume Perfume Perfume Perfume Perfume Perfume.',
  //   },
  //   {
  //     id: 2,
  //     liked: false,
  //     productName: 'Cake',
  //     bid: true,
  //     bids: [
  //       {
  //         userId: 0,
  //         bidAmount: 1000,
  //       },
  //       {
  //         userId: 1,
  //         bidAmount: 2000,
  //       },
  //       {
  //         userId: 2,
  //         bidAmount: 3000,
  //       },
  //       {
  //         userId: 3,
  //         bidAmount: 4000,
  //       },
  //       {
  //         userId: 4,
  //         bidAmount: 5000,
  //       },
  //     ],
  //     auctionId: moment().format('HHMMSS' + Math.random() * (1 - 0) + 0),
  //     price: 700,
  //     minimumPrice: 9.9,
  //     originalPrice: 1000,
  //     image:
  //       'https://firebasestorage.googleapis.com/v0/b/droppinprices.appspot.com/o/headphones.png?alt=media&token=fed855f8-7917-4a80-a2cc-3e1c247e1769',
  //     category: 2,
  //     timestamp: moment(),
  //     description: 'Cake Cake Cake Cake Cake Cake Cake Cake Cake Cake.',
  //   },
  //   {
  //     id: 4,
  //     liked: false,
  //     productName: 'Biscuit',
  //     bid: true,
  //     bids: [
  //       {
  //         userId: 0,
  //         bidAmount: 1000,
  //       },
  //       {
  //         userId: 1,
  //         bidAmount: 2000,
  //       },
  //       {
  //         userId: 2,
  //         bidAmount: 3000,
  //       },
  //       {
  //         userId: 3,
  //         bidAmount: 4000,
  //       },
  //       {
  //         userId: 4,
  //         bidAmount: 5000,
  //       },
  //     ],
  //     auctionId: moment().format('HHMMSS' + Math.random() * (1 - 0) + 0),
  //     price: 800,
  //     minimumPrice: 9.9,
  //     originalPrice: 1000,
  //     image:
  //       'https://firebasestorage.googleapis.com/v0/b/droppinprices.appspot.com/o/coffee.png?alt=media&token=75577663-504b-4ca5-9051-74a4c9eed60c',
  //     category: 1,
  //     timestamp: moment(),
  //     description:
  //       'Biscuit Biscuit Biscuit Biscuit Biscuit Biscuit Biscuit Biscuit Biscuit Biscuit.',
  //   },
  //   {
  //     id: 5,
  //     liked: false,
  //     productName: 'Beer',
  //     bid: false,
  //     bids: [],
  //     auctionId: null,
  //     price: 900,
  //     minimumPrice: 9.9,
  //     originalPrice: 1000,
  //     image:
  //       'https://firebasestorage.googleapis.com/v0/b/droppinprices.appspot.com/o/perfume.png?alt=media&token=d825b331-1d49-45d4-9aad-da9280478225',
  //     category: 3,
  //     timestamp: moment(),
  //     description: 'Beer Beer Beer Beer Beer Beer Beer Beer Beer Beer.',
  //   },
  //   {
  //     id: 6,
  //     liked: true,
  //     productName: 'Vodka',
  //     bid: false,
  //     bids: [],
  //     auctionId: null,
  //     price: 1000,
  //     minimumPrice: 9.9,
  //     originalPrice: 1000,
  //     image:
  //       'https://firebasestorage.googleapis.com/v0/b/droppinprices.appspot.com/o/headphones.png?alt=media&token=fed855f8-7917-4a80-a2cc-3e1c247e1769',
  //     category: 4,
  //     timestamp: moment(),
  //     description:
  //       'Vodka Vodka Vodka Vodka Vodka Vodka Vodka Vodka Vodka Vodka.',
  //   },
  // ],
  // cart: [
  //   {
  //     id: 6,
  //     liked: true,
  //     productName: 'Vodka',
  //     bid: false,
  //     bids: [],
  //     auctionId: null,
  //     price: 1000,
  //     minimumPrice: 9.9,
  //     originalPrice: 1000,
  //     image:
  //       'https://firebasestorage.googleapis.com/v0/b/droppinprices.appspot.com/o/headphones.png?alt=media&token=fed855f8-7917-4a80-a2cc-3e1c247e1769',
  //     category: 4,
  //     timestamp: moment(),
  //     description:
  //       'Vodka Vodka Vodka Vodka Vodka Vodka Vodka Vodka Vodka Vodka.',
  //   },
  //   {
  //     id: 5,
  //     liked: false,
  //     productName: 'Beer',
  //     bid: false,
  //     bids: [],
  //     auctionId: null,
  //     price: 900,
  //     minimumPrice: 9.9,
  //     originalPrice: 1000,
  //     image:
  //       'https://firebasestorage.googleapis.com/v0/b/droppinprices.appspot.com/o/perfume.png?alt=media&token=d825b331-1d49-45d4-9aad-da9280478225',
  //     category: 3,
  //     timestamp: moment(),
  //     description: 'Beer Beer Beer Beer Beer Beer Beer Beer Beer Beer.',
  //   },
  // ],
  categories: CATEGORIES,
  // user: {
  //   name: 'Default User',
  //   location: 'Islamabad',
  //   image:
  //     'https://firebasestorage.googleapis.com/v0/b/droppinprices.appspot.com/o/user.png?alt=media&token=ed9ffad8-62ca-4862-ada9-eb3ecf16eaf9',
  //   analytics: [
  //     {
  //       id: 0,
  //       bid: false,
  //       productName: 'silver bag gucci',
  //       time: moment(),
  //       paid: 500,
  //     },
  //     {
  //       id: 0,
  //       bid: true,
  //       productName: 'gucci bag gold',
  //       time: moment(),
  //       offer: 500,
  //     },
  //   ],
  // },

  products: [],
  // categories: [],
  cart: [],
  user: {},
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

    case UPDATE_CATEGORIES:
      console.log('UPDATE_CATEGORIES is called: ', action.payload);
      return {
        ...state,
        categories: [...action.payload],
      };

    case UPDATE_USER:
      console.log('UPDATE_USER is called: ', action.payload);
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
}
