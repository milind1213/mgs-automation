import { getDataArray, getFirstRow, getData } from '../../utils/mysql-database-util';

export async function getBrands() {
  return await getDataArray('SELECT * FROM brands');
}

export async function getProducts() {
  return await getDataArray('SELECT * FROM products');
}

export async function getUsers() {
  return await getDataArray('SELECT * FROM users');
}

export async function getBrand() {
  return await getFirstRow('SELECT id, brand_name AS name FROM brands LIMIT 1');
}

export async function getProduct() {
  return await getFirstRow('SELECT id, product_name AS name, price FROM products LIMIT 1');
}

export async function getUser() {
  return await getFirstRow('SELECT id, user_name AS name, email FROM users LIMIT 1');
}

export { getData };
