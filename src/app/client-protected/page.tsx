"use client";
import SeoMeta from "@/partials/SeoMeta";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const ClientProtected = async () => {
  const { data: session } = useSession() || {};
  useEffect(() => {
    if (!session) {
      redirect("/signin?callbackUrl=/client-protected");
    }
  }, [session]);
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
              <h2 className="mt-4 font-medium">
                You are logged in as:{" "}
                <span className="text-emerald-500">{session?.user?.name}</span>
              </h2>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ClientProtected;
