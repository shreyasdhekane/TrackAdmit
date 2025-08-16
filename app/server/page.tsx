import Home from "./inner";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

export default async function ServerPage() {
  // Preload university data instead of numbers
  const preloaded = await preloadQuery(api.universities.getByUserId, {
    userId: "user-id-here", // Replace with actual user ID
  });

  return (
    <main className="p-8 flex flex-col gap-4 mx-auto max-w-2xl">
      <h1 className="text-4xl font-bold text-center">
        University Application Tracker
      </h1>
      <Home preloaded={preloaded} />
    </main>
  );
}
