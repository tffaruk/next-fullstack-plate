import LoginComponent from "@/components/LoginComponent";
import { getProviders } from "next-auth/react";
import { Suspense } from "react";

const SignInPage = async () => {
  const providers = await getProviders();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginComponent providers={providers} />
    </Suspense>
  );
};

export default SignInPage;
