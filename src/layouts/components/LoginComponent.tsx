"use client";

import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const LoginComponent = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const { data } = useSession();
  if (data && data.user) {
    // router.refresh();
    redirect(callbackUrl || "/");
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });
    console.log(res);
  };
  return (
    <>
      <section className="py-14">
        <div className="container mx-auto">
          <div className="row justify-center ">
            <div className="col-5 ">
              <div className="rounded bg-white px-8 pb-8 pt-6 shadow-md">
                <div>
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
                        Sign In
                      </button>
                    </div>
                  </form>
                </div>

                <div className="text-center">
                  <div className="relative after:absolute after:left-0 after:top-3 after:inline-block  after:h-[1px] after:w-full after:bg-light/30 after:px-2 after:content-['']">
                    <span className="relative z-20 bg-white px-4">or</span>
                  </div>
                  <button
                    onClick={() => signIn("google")}
                    className="btn btn-outline-primary mt-3 flex w-full items-center justify-center "
                  >
                    <FcGoogle className="mr-2 inline align-middle" /> Sign in
                    with Google
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginComponent;
