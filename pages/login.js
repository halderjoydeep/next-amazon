import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';
import { useForm } from 'react-hook-form';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function submitHandler({ email, password }) {
    console.log(email);
    console.log(password);
  }

  return (
    <Layout title="Login">
      <form
        className="max-w-screen-md mx-auto"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="text-xl font-bold mb-4">Login</h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="w-full"
            autoFocus
            {...register('email', {
              required: 'Please enter email',
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
                message: 'Please enter valid email address',
              },
            })}
          />
          {errors.email && (
            <div className="text-red-400">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="w-full"
            {...register('password', {
              required: 'Please enter password',
              minLength: {
                value: 6,
                message: 'Password must be of 6 Characters',
              },
            })}
          />
          {errors.password && (
            <div className="text-red-400">{errors.password.message}</div>
          )}
        </div>
        <button className="button-primary mb-4">Login</button>
        <div>
          Don&apos;t Have Account? <Link href="register">Register now</Link>
        </div>
      </form>
    </Layout>
  );
}
