'use client';

import { useActionState } from 'react';
import { authenticate } from '@/lib/actions';

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="email" className="block mb-1 font-medium">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="password" className="block mb-1 font-medium">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          minLength={6}
          required
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <button
        aria-disabled={isPending}
        type="submit"
        className="w-full bg-emerald-800 text-white px-4 py-2 rounded hover:bg-emerald-900"
      >
        {isPending ? 'Signing in...' : 'Sign In'}
      </button>
      {errorMessage && (
        <p role="alert" className="text-sm text-red-600">{errorMessage}</p>
      )}
    </form>
  );
}