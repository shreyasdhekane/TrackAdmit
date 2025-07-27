import { University } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  XCircle,
  Clock,
  Hourglass,
  CalendarClock,
  BadgeCheck,
  HelpCircle,
} from "lucide-react";

interface UniversityHeaderProps {
  university: University;
  universitySlug: string;
}

export function UniversityHeader({
  university,
  universitySlug,
}: UniversityHeaderProps) {
  const displayField = (value: any, fallback = "Not specified") =>
    value ? value : <span className="text-muted-foreground">{fallback}</span>;

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return <Badge className="bg-green-100 text-green-700">Completed</Badge>;
      case "in_review":
      case "in review":
        return (
          <Badge className="bg-yellow-100 text-yellow-700">In Progress</Badge>
        );
      case "Submitted":
        return (
          <Badge className="bg-purple-100 text-purple-700">Submitted</Badge>
        );
      case "Planning":
        return <Badge className="bg-blue-100 text-blue-700">Planning</Badge>;
      case "not_started":
      case "not started":
        return <Badge className="bg-gray-100 text-gray-700">Not Started</Badge>;
      default:
        return <Badge>{status || "Unknown"}</Badge>;
    }
  };
  const getResultBadge = (result: string) => {
    switch (result?.toLowerCase()) {
      case "admit":
        return (
          <Badge className="bg-emerald-100 text-emerald-700 gap-1 inline-flex items-center">
            <CheckCircle className="w-4 h-4" /> Admit
          </Badge>
        );
      case "reject":
        return (
          <Badge className="bg-rose-100 text-rose-700 gap-1 inline-flex items-center">
            <XCircle className="w-4 h-4" /> Rejected
          </Badge>
        );
      case "waitlisted":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 gap-1 inline-flex items-center">
            <Hourglass className="w-4 h-4" /> Waitlisted
          </Badge>
        );
      case "deferred":
        return (
          <Badge className="bg-orange-100 text-orange-700 gap-1 inline-flex items-center">
            <CalendarClock className="w-4 h-4" /> Deferred
          </Badge>
        );
      case "interview":
        return (
          <Badge className="bg-indigo-100 text-indigo-700 gap-1 inline-flex items-center">
            <BadgeCheck className="w-4 h-4" /> Interview
          </Badge>
        );
      case "conditional admit":
        return (
          <Badge className="bg-teal-100 text-teal-700 gap-1 inline-flex items-center">
            <CheckCircle className="w-4 h-4" /> Conditional
          </Badge>
        );
      case "waiting":
        return (
          <Badge className="bg-slate-100 text-slate-700 gap-1 inline-flex items-center">
            <Clock className="w-4 h-4" /> Waiting
          </Badge>
        );
      default:
        return (
          <Badge className="bg-muted text-muted-foreground gap-1 inline-flex items-center">
            <HelpCircle className="w-4 h-4" /> {result || "Unknown"}
          </Badge>
        );
    }
  };
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            {university.name}
          </h1>
          <p className="text-muted-foreground text-lg">
            {university.program} • {university.city}, {university.country}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link
              href={`/ApplicationManager/universities/${universitySlug}/edit`}
            >
              Edit Application
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="rounded-full bg-muted px-4 py-1 text-sm font-medium text-muted-foreground">
          {displayField(university.tier)}
        </div>
        {getStatusBadge(university.status)}
        {university.result && getResultBadge(university.result)}
      </div>
    </div>
  );
}
