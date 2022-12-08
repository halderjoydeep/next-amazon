import Image from 'next/legacy/image';
import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import { IoMdTrash } from 'react-icons/io';
import { addToCart, removeFromCart } from '../store/cart-slice';

export default function CartScreen() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0
  );

  const dispatch = useDispatch();

  function updateCartHandler(item, event) {
    dispatch(
      addToCart({
        product: item.product,
        quantity: +event.target.value,
      })
    );
  }

  function removeFromCartHandler(slug) {
    dispatch(removeFromCart(slug));
  }

  return (
    <Layout title="Shopping Cart">
      <h1 className="text-lg font-bold">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="mt-4">
          No Items here. <Link href="/">Go to Shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5 mt-4">
          <div className="md:col-span-3 overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="p-5 text-left">Item</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.product.slug} className="border-b">
                    <td>
                      <Link
                        href={`/product/${item.product.slug}`}
                        className="flex items-center"
                      >
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          width={50}
                          height={50}
                        />
                        &nbsp;
                        {item.product.name}
                      </Link>
                    </td>
                    <td className="p-5 text-right">
                      <select
                        value={item.quantity}
                        onChange={updateCartHandler.bind(null, item)}
                      >
                        {[...Array(item.product.countInStock).keys()].map(
                          (x) => (
                            <option value={x + 1} key={x}>
                              {x + 1}
                            </option>
                          )
                        )}
                      </select>
                    </td>
                    <td className="p-5 text-right">{item.product.price}</td>
                    <td className="text-center">
                      <button
                        onClick={removeFromCartHandler.bind(
                          null,
                          item.product.slug
                        )}
                      >
                        <IoMdTrash className="text-xl" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card p-5">
            <div className="pb-3 text-xl">
              Subtotal ({totalQuantity}): ${totalPrice}
            </div>
            <Link href="/checkout">
              <button className="button-primary w-full">Checkout</button>
            </Link>
          </div>
        </div>
      )}
    </Layout>
  );
}
