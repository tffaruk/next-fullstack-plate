import SeoMeta from "@/partials/SeoMeta";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authoptions } from "../api/auth/[...nextauth]/route";

const ServerProtected = async () => {
  const session = await getServerSession(authoptions);
  if (!session) {
    redirect("/signin");
  }
  return (
    <>
      <SeoMeta title="Server Protected Page" />
      <section className="section-sm">
        <div className="container">
          <div className="row justify-center">
            <div className="text-center md:col-10 lg:col-7">
              <h1 className="text-2xl font-bold">
                This is a <span className="text-emerald-500">server-side</span>{" "}
                protected page
              </h1>
              <h2 className="mt-4 font-medium">You are logged in as:</h2>
              <p className="mt-4">{session?.user?.name}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServerProtected;
