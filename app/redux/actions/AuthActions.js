import {
  UPDATE_CART,
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_USER,
} from '../types';

export const UpdateProducts = payload => ({
  type: UPDATE_PRODUCTS,
  payload,
});

export const UpdateCart = payload => ({
  type: UPDATE_CART,
  payload,
});

export const UpdateCategories = payload => ({
  type: UPDATE_CATEGORIES,
  payload,
});

export const UpdateUser = payload => ({
  type: UPDATE_USER,
  payload,
});
