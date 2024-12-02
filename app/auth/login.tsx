"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginPage() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="text-center">
        <h1 className="text-3xl text-blue-600">Welcome, {session.user.name}</h1>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white px-4 py-2 rounded mt-4"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-blue-600">Login</h1>
      <button
        onClick={() => signIn("credentials")}
        className="bg-yellow-500 text-white px-4 py-2 rounded mt-4"
      >
        Login with Email
      </button>
    </div>
  );
}
