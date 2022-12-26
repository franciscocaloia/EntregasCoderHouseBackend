import { getProduct } from "../server/routerProducts.js";
import { containerCart } from "../DAO/containerCart.js";
export const postCart = async () => {
  return await containerCart.save({ products: [] });
};
export const getById = async (id) => {
  return await containerCart.getById(id);
};
export const postCartProduct = async (idCart, idProduct) => {
  const cart = await containerCart.getById(parseInt(idCart));
  const product = await getProduct(parseInt(idProduct));
  if (product && cart) {
    cart.products.push(product);
    return await containerCart.update(idCart, cart);
  }
  return null;
};
export const deleteCartProduct = async (idCart, idProduct) => {
  const cart = await containerCart.getById(idCart);
  if (cart) {
    const filteredProducts = cart.products.filter(
      (e) => e._id !== idProduct && parseInt(e.id) !== idProduct
    );
    cart.products = filteredProducts;
    return await containerCart.update(idCart, cart);
  }
  return null;
};
export const deleteCart = async (idCart) => {
  const cart = await containerCart.getById(idCart);
  if (cart) {
    while (cart.products.length) {
      cart.products.pop();
    }
    return await containerCart.update(idCart, cart);
  }
  return null;
};
