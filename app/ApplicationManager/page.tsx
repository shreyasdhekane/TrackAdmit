import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">
        Welcome to <span className="text-primary">TrackAdmit</span>
      </h1>
      <p className="text-muted-foreground">
        Start your college application today.
      </p>
      <button className="text-sm font-semibold bg-primary text-primary-foreground px-4 py-2 rounded-md border ">
        <Link href={"/ApplicationManager/universities"}>+ Add University</Link>
      </button>
    </div>
  );
};

export default page;
