import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title ? title + '- Amazon' : 'Amazon'}</title>
        <meta name="description" content="ECommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col justify-between min-h-screen">
        <header>
          <nav className="flex justify-between items-center h-12 px-4 shadow-lg">
            <Link href="/" className="text-lg font-bold">
              Amazon
            </Link>
            <div>
              <Link href="/cart" className="p-2">
                Cart
              </Link>
              <Link href="/login" className="p-2">
                Login
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex justify-center items-center h-10 shadow-inner">
          {`${new Date().getFullYear()} © Amazon.clone.om`}
        </footer>
      </div>
    </>
  );
}
