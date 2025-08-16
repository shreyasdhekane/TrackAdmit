import { University } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import {
  Link,
  CalendarDays,
  DollarSign,
  BarChart,
  ExternalLink,
} from "lucide-react";

interface DocumentStats {
  total: number;
  completed: number;
  inProgress: number;
  notStarted: number;
}
interface UniversityStatsProps {
  university: University;
  documentStats?: DocumentStats;
}

export function UniversityStats({ university }: UniversityStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {/* Deadline */}
      <Card className="bg-indigo-50 dark:bg-indigo-900/30 border-0 shadow-sm hover:shadow-md transition">
        <CardHeader className="pb-1 flex flex-row items-center gap-2">
          <CalendarDays className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          <CardTitle className="text-sm font-medium">
            Application Deadline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl font-semibold">
            {university.deadline
              ? format(new Date(university.deadline), "MMM d, yyyy")
              : "Not set"}
          </div>
          {university.deadline && (
            <p className="text-xs text-muted-foreground mt-1">
              {Math.max(
                Math.ceil(
                  (university.deadline - Date.now()) / (1000 * 60 * 60 * 24),
                ),
                0,
              )}{" "}
              days remaining
            </p>
          )}
        </CardContent>
      </Card>

      {/* Application Fee */}
      <Card className="bg-green-50 dark:bg-green-900/30 border-0 shadow-sm hover:shadow-md transition">
        <CardHeader className="pb-1 flex flex-row items-center gap-2">
          <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
          <CardTitle className="text-sm font-medium">Application Fee</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl font-semibold">
            {university.fee ? `$${university.fee}` : "Not specified"}
          </div>
        </CardContent>
      </Card>

      {/* Rank */}
      <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-0 shadow-sm hover:shadow-md transition">
        <CardHeader className="pb-1 flex flex-row items-center gap-2">
          <BarChart className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          <CardTitle className="text-sm font-medium">Personal Rank</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xl font-semibold">
            {university.rank ? (
              university.rank
            ) : (
              <span className="text-muted-foreground">Not specified</span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* University Website */}
      <Card className="bg-blue-50 dark:bg-blue-900/30 border-0 shadow-sm hover:shadow-md transition cursor-pointer">
        <CardHeader className="pb-1 flex flex-row items-center gap-2">
          <ExternalLink className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <CardTitle className="text-sm font-medium">
            Official Website
          </CardTitle>
        </CardHeader>
        <CardContent>
          {university.universityUrl ? (
            <a
              href={university.universityUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              <Link className="h-4 w-4 mr-1" />
              Visit
            </a>
          ) : (
            <p className="text-muted-foreground text-sm">Not available</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
