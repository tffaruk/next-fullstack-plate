import LoginComponent from "@/components/LoginComponent";
import { getProviders } from "next-auth/react";
import { Suspense } from "react";

const SignInPage = async () => {
  const providers = await getProviders();

  const authProviders = Object.values(providers as any) || {};
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginComponent authProviders={authProviders} />
    </Suspense>
  );
};

export default SignInPage;
