"use server";

import SeoMeta from "@/partials/SeoMeta";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { authoptions } from "../api/auth/[...nextauth]/route";
const getData = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
    cache: "no-store",
  });
};
const ServerProtected = async () => {
  const session = await getServerSession(authoptions);
  if (!session) {
    redirect("/signin?callBack=/server-protected");
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SeoMeta title="Server Protected Page" />
      <section className="section-sm">
        <div className="container">
          <div className="row justify-center">
            <div className="text-center md:col-10 lg:col-7">
              {!session ? (
                <h1 className="text-2xl font-bold">
                  This is a{" "}
                  <span className="text-emerald-500">server-side</span>{" "}
                  protected page
                </h1>
              ) : (
                <h2 className="mt-4 font-medium">
                  You are logged in as:{" "}
                  <span className="text-emerald-500">
                    {session?.user?.name}
                  </span>
                </h2>
              )}
            </div>
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export default ServerProtected;
