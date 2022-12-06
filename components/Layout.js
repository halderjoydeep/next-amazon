import Head from 'next/head';
import React from 'react';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>{title ? title + '- Amazon' : 'Amazon'}</title>
        <meta name="description" content="ECommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <header>Header</header>
        <main>{children}</main>
        <footer>Footer</footer>
      </div>
    </>
  );
}
