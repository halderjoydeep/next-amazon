import Image from 'next/legacy/image';
import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import { IoMdTrash } from 'react-icons/io';
import { removeFromCart } from '../store/cart-slice';

export default function CartScreen() {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const dispatch = useDispatch();

  function removeFromCartHandler(slug) {
    dispatch(removeFromCart(slug));
  }

  return (
    <Layout title="Shopping Cart">
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
                    <td className="p-5 text-right">{item.quantity}</td>
                    <td className="p-5 text-right">
                      {item.quantity * item.product.price}
                    </td>
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
        </div>
      )}
    </Layout>
  );
}
