import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';
import data from '../../utils/data';

export default function ProductScreen() {
  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((p) => p.slug === slug);

  if (!product) {
    return <Layout>No Product Found</Layout>;
  }

  return (
    <Layout title={product.name}>
      <Link href="/" className="py-2 block">
        Back to products
      </Link>

      <div className="grid md:grid-cols-4 gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width="640"
            height="640"
            layout="responsive"
          />
        </div>

        <div>
          <h1 className="text-lg font-bold">{product.name}</h1>
          <p>Category: {product.category}</p>
          <p>Brand: {product.brand}</p>
          <p>
            {product.rating} of {product.numReviews} reviews
          </p>
          <p>Description: {product.description}</p>
        </div>
        <div>
          <div className="card p-5">
            <div className="flex justify-between items-center mb-2">
              <p>Price</p>
              <p>{product.price}</p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <p>Status</p>
              <p>
                {product.countInStock > 0
                  ? 'In Stock'
                  : 'Currently unavailable'}
              </p>
            </div>
            <button className="button-primary w-full">Add to cart</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}