import LoginComponent from "@/components/LoginComponent";
import { getProviders } from "next-auth/react";

const SignInPage = async () => {
  const providers = await getProviders();

  return <LoginComponent authProviders={providers} />;
};

export default SignInPage;
