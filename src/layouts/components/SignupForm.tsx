"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";

const SignupForm = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const handleSubmit = async (e: any): Promise<void> => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/user", userInfo);

      if (res.status === 201) {
        setUserInfo({
          email: "",
          password: "",
        });
        setMessage(res.data.data.message);
        setTimeout(() => {
          setMessage("");
        }, 1000);
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        setMessage(error.response.data.data.message);
        setTimeout(() => {
          setMessage("");
        }, 1000);
      }
    }
  };
  return (
    <section className="py-14">
      <div className="container mx-auto">
        <div className="row justify-center ">
          <div className="col-5 ">
            <div className="rounded bg-white px-8 pb-8 pt-6 shadow-md">
              <form onSubmit={handleSubmit} className="mb-6">
                <div className="mb-4">
                  <label
                    className="mb-2 block text-sm font-bold text-text"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-text shadow focus:outline-none"
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={userInfo.email}
                    onChange={(e) =>
                      setUserInfo({
                        ...userInfo,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="mb-2 block text-sm font-bold text-text"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-text shadow focus:outline-none"
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={userInfo.password}
                    onChange={(e) =>
                      setUserInfo({
                        ...userInfo,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button className="btn btn-primary w-full" type="submit">
                    Sign up
                  </button>
                </div>
              </form>
              {message && <p className="text-center text-red-500">{message}</p>}
              <p className="text-center">
                All ready have an account{" "}
                <Link href="/signin" className="font-medium text-primary">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupForm;
