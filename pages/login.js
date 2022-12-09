import Link from 'next/link';
import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import getError from '../utils/error';

export default function Login() {
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [session, redirect, router]);

  function submitHandler({ email, password }) {
    signIn('credentials', { email, password, redirect: false })
      .then((res) => {
        if (res.error) {
          toast.error(res.error);
        }
      })
      .catch((err) => {
        toast.error(getError(err));
      });
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
