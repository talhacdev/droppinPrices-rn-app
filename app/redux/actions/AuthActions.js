import {UPDATE_CART, UPDATE_PRODUCTS} from '../types';

export const UpdateProducts = payload => ({
  type: UPDATE_PRODUCTS,
  payload,
});

export const UpdateCart = payload => ({
  type: UPDATE_CART,
  payload,
});
