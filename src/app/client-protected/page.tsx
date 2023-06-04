"use client";
import SeoMeta from "@/partials/SeoMeta";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const ClientProtected = async () => {
  const { data: session } =
    useSession({
      required: true,
      onUnauthenticated() {
        redirect("/signin?callbackUrl=/client-protected");
      },
    }) || {};

  return (
    <>
      <SeoMeta title="Client Protected Page" />
      <section className="section-sm">
        <div className="container">
          <div className="row justify-center">
            <div className="text-center md:col-10 lg:col-7">
              <h1 className="text-2xl font-bold">
                This is a <span className="text-emerald-500">client-side</span>{" "}
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

export default ClientProtected;
