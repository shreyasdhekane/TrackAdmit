"use client";

import { Preloaded, useMutation, usePreloadedQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home({
  preloaded,
}: {
  preloaded: Preloaded<typeof api.universities.getByUserId>;
}) {
  const universities = usePreloadedQuery(preloaded);
  const addUniversity = useMutation(api.universities.createUniversity);

  return (
    <>
      <div className="flex flex-col gap-4 bg-slate-200 dark:bg-slate-800 p-4 rounded-md">
        <h2 className="text-xl font-bold">Universities</h2>
        <code>
          <pre>{JSON.stringify(universities, null, 2)}</pre>
        </code>
      </div>
      <button
        className="bg-foreground text-background px-4 py-2 rounded-md mx-auto"
        onClick={() => {
          void addUniversity({
            userId: "current-user-id-here", // You'll need to pass the actual user ID
            name: "New University",
            slug: "new-university",
            program: "",
            country: "",
            city: "",
            deadline: Date.now(),
            status: "Planning",
            tier: "Moderate",
            fee: "",
            rank: "",
            notes: "",
            createdAt: Date.now(),
          });
        }}
      >
        Add New University
      </button>
    </>
  );
}
