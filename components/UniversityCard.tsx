import { format } from "date-fns";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  GraduationCap,
  Landmark,
  MapPin,
  Calendar,
  DollarSign,
  Star,
  Edit,
  Trash2,
  MoveUpRight,
} from "lucide-react";
import { Button } from "./ui/button";

export interface UniversityCardProps {
  id: string;
  slug: string;
  name: string;
  program: string;
  city: string;
  country: string;
  deadline: number;
  status: string;
  fee: string;
  tier: string;
  rank: string;
  notes?: string;
  onEdit: (id: string, updates: any) => void;
  onDelete: (id: string) => void;
}

function daysUntilDeadline(deadline: number): number {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const diffTime = deadlineDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
export default function UniversityCard({
  id,
  slug,
  name,
  program,
  city,
  country,
  deadline,
  status,
  fee,
  tier,
  rank,
  onEdit,
  onDelete,
}: UniversityCardProps) {
  return (
    <Card className="border border-border/50 hover:border-border shadow-sm hover:shadow-md transition-all duration-300  rounded-xl overflow-hidden group bg-card/50 hover:bg-card">
      <CardContent className="p-0">
        {/* University Header with colored status bar */}
        <div className="bg-gradient-to-r from-accent/10 to-primary/5 p-4 ">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-foreground flex flex-wrap items-center gap-2 break-words">
                <Landmark className="text-primary" size={20} />
                <span className="group-hover:text-primary transition-colors">
                  {name}
                </span>
              </h2>
              <p className="text-sm text-muted-foreground flex  items-center gap-1">
                <GraduationCap
                  size={16}
                  className="text-secondary-foreground"
                />
                {program}
              </p>
            </div>

            <div className="flex sm:flex-col gap-2 sm:items-end justify-between sm:justify-end">
              <div className="flex flex-wrap gap-2">
                <Badge
                  className={cn(
                    "border-2 font-medium px-2 py-0.5 text-xs",
                    tier === "Ambitious" &&
                      "border-orange-400/40 bg-orange-100/20 text-orange-700 dark:text-orange-400 hover:brightness-110 transition-colors",
                    tier === "Moderate" &&
                      "border-sky-500/40 bg-sky-100/20 text-sky-700 dark:text-sky-400 hover:brightness-110 transition-colors",
                    tier === "Safe" &&
                      "border-emerald-400/40 bg-emerald-100/20 text-emerald-700 dark:text-emerald-400 hover:brightness-110 transition-colors",
                  )}
                >
                  {tier}
                </Badge>

                <Badge
                  variant="outline"
                  className={cn(
                    "border-2 font-medium px-2 py-0.5 text-xs",
                    status === "Planning" &&
                      "border-yellow-500/30 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
                    status === "In Progress" &&
                      "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400",
                    status === "Submitted" &&
                      "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400",
                  )}
                >
                  {status}
                </Badge>
              </div>

              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() =>
                          onEdit(id, {
                            name,
                            program,
                            country,
                            city,
                            deadline,
                            status,
                            fee,
                            tier,
                            rank,
                          })
                        }
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <Edit size={18} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>Edit</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => onDelete(id)}
                        className="text-red-600 hover:text-red-700 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>Delete</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </div>

        {/* University Details */}
        <div className="p-4 space-y-3">
          {/* Location */}
          <div className="flex items-start gap-2">
            <MapPin
              size={18}
              className="text-rose-500 dark:text-rose-400 mt-0.5 flex-shrink-0"
            />
            <div>
              <p className="text-sm font-medium text-foreground">
                {city}, {country}
              </p>
              <p className="text-xs text-muted-foreground">Location</p>
            </div>
          </div>

          {/* Deadline with progress indicator */}
          <div className="flex items-start gap-2">
            <Calendar
              size={18}
              className="text-emerald-500 dark:text-emerald-400 mt-0.5 flex-shrink-0"
            />
            <div>
              <p className="text-sm font-medium text-foreground">
                {format(deadline, "MMM dd, yyyy")}
              </p>
              <p className="text-xs text-muted-foreground">
                {daysUntilDeadline(deadline) > 0
                  ? `${daysUntilDeadline(deadline)} days remaining`
                  : "Deadline passed"}
              </p>
              <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                <div
                  className="bg-emerald-500 dark:bg-emerald-400 h-1.5 rounded-full"
                  style={{
                    width: `${Math.min(100, Math.max(0, 100 - (daysUntilDeadline(deadline) / 30) * 100))}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-2">
              <DollarSign
                size={16}
                className="text-amber-500 dark:text-amber-400"
              />
              <div>
                <p className="text-xs text-muted-foreground">Fee</p>
                <p className="text-sm font-medium text-foreground">${fee}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Star size={16} className="text-amber-500 dark:text-amber-400" />
              <div>
                <p className="text-xs text-muted-foreground">Ranking</p>
                <p className="text-sm font-medium text-foreground">{rank}/10</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="relative ">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="absolute bottom-0.25 right-2 rounded-full bg-secondary-foreground hover:bg-primary text-background p-2 shadow-md transition-transform hover:-translate-y-1"
                asChild
              >
                <a href={`universities/${slug}`}>
                  <MoveUpRight size={18} />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" align="center" className="text-sm">
              Apply Now
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
}
