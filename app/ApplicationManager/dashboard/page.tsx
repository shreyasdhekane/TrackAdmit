"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { format } from "date-fns";
import { Flame } from "lucide-react";

export default function DashboardPage() {
  const { user } = useUser();
  const currentUser = useQuery(api.user.getCurrentUser, {
    clerkId: user?.id || "",
  });
  const universities = useQuery(api.universities.getByUserId, {
    userId: currentUser?._id || "",
  });
  const documents = useQuery(api.documents.getByUserId, {
    userId: currentUser?._id || "",
  });

  // Calculate stats
  const totalUniversities = universities?.length || 0;

  // Count submitted applications (where submitted is true)
  const applicationsSubmitted =
    universities?.filter((u) => u.status.toLowerCase() === "submitted")
      .length || 0;

  // Count completed documents (where status is "completed")
  const documentsCompleted =
    documents?.filter((d) => d.status.toLowerCase() === "completed").length ||
    0;

  // Calculate total fees (sum of all university fees)
  const totalFees =
    universities?.reduce((sum, uni) => {
      // Remove any non-numeric characters from fee string except decimal point
      const feeValue = parseFloat(uni.fee?.replace(/[^0-9.]/g, "") || "0");
      return sum + feeValue;
    }, 0) || 0;

  const stats = [
    { title: "Total Universities", value: totalUniversities },
    { title: "Applications Submitted", value: applicationsSubmitted },
    { title: "Documents Completed", value: documentsCompleted },
    { title: "Total Fees", value: `$${totalFees.toFixed(2)}` },
  ];
  const documentActivities =
    documents?.map((doc) => ({
      name: doc.title,
      status: doc.status,
      date: doc.createdAt,
      type: "document",
    })) || [];
  const universityActivities =
    universities?.map((uni) => ({
      name: `Updated ${uni.name}`,
      status: uni.status,
      date: uni.createdAt,
      type: "university",
    })) || [];
  // Format recent activities from documents
  const recentActivities = [...documentActivities, ...universityActivities]
    .sort((a, b) => b.date - a.date)
    .slice(0, 6)
    .map((activity) => ({
      ...activity,
      date: format(new Date(activity.date), "MMM d, h:mm a"),
    }));

  // Get upcoming deadlines (next 30 days)
  const upcomingDeadlines =
    universities
      ?.filter((uni) => {
        const deadlineDate = new Date(uni.deadline);
        const today = new Date();
        const thirtyDaysFromNow = new Date();
        thirtyDaysFromNow.setDate(today.getDate() + 30);
        return deadlineDate > today && deadlineDate <= thirtyDaysFromNow;
      })
      .sort((a, b) => a.deadline - b.deadline) || [];

  const getStatusBadge = (status: string) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case "completed":
        return <Badge className="bg-green-100 text-green-700">Completed</Badge>;
      case "in_review":
      case "in review":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">In Review</Badge>
        );
      case "results_pending":
      case "results pending":
        return (
          <Badge className="bg-blue-100 text-blue-700">Results Pending</Badge>
        );
      case "not started":
      case "not_started":
        return <Badge className="bg-gray-100 text-gray-700">Not Started</Badge>;
      case "submitted":
        return (
          <Badge className="bg-purple-100 text-purple-700">Submitted</Badge>
        );
      case "planning":
        return (
          <Badge className="bg-orange-100 text-orange-700">Planning</Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button className="text-sm font-semibold bg-green-100 text-green-800 px-4 py-2 rounded-md border border-green-300 hover:bg-green-200 transition">
          <Link href={"/ApplicationManager/universities"}>
            + Add University
          </Link>
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="bg-white dark:bg-zinc-900 shadow-md hover:shadow-lg transition rounded-xl"
          >
            <CardContent className="py-6 flex flex-col gap-1 items-start justify-center">
              <span className="text-muted-foreground text-sm">
                {stat.title}
              </span>
              <div className="text-2xl font-semibold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Deadlines & Activity */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Upcoming Deadlines */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingDeadlines.length > 0 ? (
              <div className="space-y-4">
                {upcomingDeadlines.map((uni) => (
                  <div key={uni._id} className="flex flex-col">
                    <p className="font-medium">{uni.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(uni.deadline), "MMM d, yyyy")}
                    </p>
                    {uni.status && (
                      <div className="mt-1">{getStatusBadge(uni.status)}</div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-[100px]">
                <p className="text-muted-foreground">
                  Chill! No upcoming deadlines
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="col-span-5">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {recentActivities.length > 0 ? (
              <div className="space-y-6">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="space-y-1">
                      <div className="flex flex-row gap-2">
                        <Flame className="w-4 h-4 text-amber-600" />
                        <p className="text-sm font-medium leading-none">
                          {activity.name}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {activity.date}
                      </p>
                    </div>
                    {getStatusBadge(activity.status)}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-[100px]">
                <p className="text-muted-foreground">No recent activity</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
