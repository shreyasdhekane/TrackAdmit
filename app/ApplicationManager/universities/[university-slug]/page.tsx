"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Document, University } from "@/lib/types";
import { UniversityHeader } from "@/components/university/UniversityHeader";
import { UniversityStats } from "@/components/university/UniversityStats";
import { UniversityDocuments } from "@/components/university/UniversityDocuments";
import { UniversityNotes } from "@/components/university/UniversityNotes";
import { UniversityTests } from "@/components/university/UniversityTests";
import { UniversityMap } from "@/components/university/UniversityMap";

export default function UniversityPage() {
  const params = useParams();
  const universitySlug = params["university-slug"] as string;

  const universityData = useQuery(
    api.universities.getUniversityBySlug,
    universitySlug ? { slug: universitySlug } : "skip",
  ) as { university: University } | undefined;

  const allDocuments = useQuery(api.documents.getByUserId, {
    userId: universityData?.university.userId || "",
  }) as Document[] | undefined;

  if (!universityData)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  const { university } = universityData;

  const universityDocuments = (allDocuments?.filter(
    (doc: Document) => doc.universityId === university._id,
  ) || []) as Document[];

  const documentStats = {
    total: universityDocuments.length,
    completed: universityDocuments.filter(
      (d: Document) => d.status === "completed",
    ).length,
    inProgress: universityDocuments.filter(
      (d: Document) => d.status === "in_review" || d.status === "in progress",
    ).length,
    notStarted: universityDocuments.filter(
      (d: Document) => d.status === "not_started" || !d.status,
    ).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-blue-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-black px-4 py-10">
      <div className="max-w-7xl mx-auto space-y-10">
        <UniversityHeader
          university={university}
          universitySlug={universitySlug}
        />

        <div className=" shadow-md rounded-2xl p-6">
          <UniversityStats
            university={university}
            documentStats={documentStats}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side */}
          <div className="w-full lg:w-2/3 space-y-6">
            {university.documentsRequired &&
              university.documentsRequired.length > 0 && (
                <UniversityDocuments
                  documentRequired={university.documentsRequired}
                />
              )}

            {university.testsRequired &&
              university.testsRequired.length > 0 && (
                <UniversityTests testsRequired={university.testsRequired} />
              )}
            {university.notes && <UniversityNotes notes={university.notes} />}
          </div>

          {/* Right Side */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
              <UniversityMap
                city={university.city}
                country={university.country}
                name={university.name}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
