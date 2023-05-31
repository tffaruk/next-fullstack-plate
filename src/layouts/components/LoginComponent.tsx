"use client";
import { signIn, useSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";
import { useState } from "react";

const LoginComponent = ({ authProviders }: any) => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const authProvider = Object.values(authProviders as any);
  console.log(authProvider, "data");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const { data } = useSession();
  if (data?.user) {
    redirect(callbackUrl || "/");
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });
  };
  return (
    <>
      <section>
        <div className="container mx-auto">
          <div className="row justify-center ">
            <div className="col-5 ">
              {authProvider.map((provider: any) =>
                provider.name !== "Credentials" ? (
                  <div key={provider.name}>
                    <button onClick={() => signIn("google")}>
                      Sign in with {provider.name}
                    </button>
                  </div>
                ) : (
                  <div key={provider.name}>
                    <form onSubmit={handleSubmit} className="mx-auto">
                      <input
                        required
                        id="useremail"
                        name="email"
                        type="email"
                        className="w-full"
                        autoFocus
                        // onChange={(e) =>
                        //   setUserInfo({ ...userInfo, email: e.target.value })
                        // }
                      />
                      <div>
                        <input
                          required
                          name="password"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                          className="mt-2 w-full"
                          // onChange={(e) =>
                          //   setUserInfo({ ...userInfo, password: e.target.value })
                          // }
                        />
                      </div>

                      <button type="submit">Sign In</button>
                    </form>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginComponent;
