'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

export default function SignIn() {
  // const {data: session} = useSession();
  const {data: session} = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) {
      router.push('/admin/');
    }
  }, [session, router])
  const [values, setValues] = useState({
    username: '',
    password: ''
  });

  const handleValueChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      await signIn('admin', {
        username: values.username,
        password: values.password,
        callbackUrl: '/admin'
      });
      setLoading(false);
    } catch (error) {
      console.log(error, 'sigin failed!');
    }
  };
  return (
    <section className="position-relative h-100 pt-5 pb-4">
      <div className="container d-flex flex-wrap justify-content-center justify-content-xl-start h-100 pt-5">
        <div
          className="w-100 align-self-end pt-1 pt-md-4 pb-4"
          style={{ maxWidth: '526px' }}
        >
          <h1 className="text-center text-xl-start">Admin Dashboard</h1>
          <p className="text-center text-xl-start pb-3 mb-3">
            Please log in to access admin dashboard
          </p>
          <form
            className="needs-validation mb-2"
            noValidate
            onSubmit={handleSubmit}
          >
            <div className="position-relative mb-4">
              <label htmlFor="username" className="form-label fs-base">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="form-control form-control-lg"
                required
                name="username"
                value={values.username}
                onChange={handleValueChanged}
              />
              <div className="invalid-feedback position-absolute start-0 top-100">
                Please enter a valid email address!
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label fs-base">
                Password
              </label>
              <div className="password-toggle">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control form-control-lg"
                  required
                  value={values.password}
                  onChange={handleValueChanged}
                />
                <label
                  className="password-toggle-btn"
                  aria-label="Show/hide password"
                >
                  <input className="password-toggle-check" type="checkbox" />
                  <span className="password-toggle-indicator"></span>
                </label>
                <div className="invalid-feedback position-absolute start-0 top-100">
                  Please enter your password!
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary shadow-primary btn-lg w-100"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
