import LoginComponent from "@/components/LoginComponent";
import { getProviders } from "next-auth/react";

const SignInPage = async () => {
  const providers = await getProviders();

  return <LoginComponent providers={providers} />;
};

export default SignInPage;
