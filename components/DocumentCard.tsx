// DocumentCard.tsx
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
  FileText,
  Link,
  Calendar,
  User,
  Edit,
  Trash2,
  MoveUpRight,
} from "lucide-react";
import { Button } from "./ui/button";

export interface DocumentCardProps {
  id: string;
  title: string;
  type: string;
  status: string;
  fileUrl?: string;
  notes?: string;
  createdAt: number;
  onEdit: (id: string, updates: any) => void;
  onDelete: (id: string) => void;
}

export default function DocumentCard({
  id,
  title,
  type,
  status,
  fileUrl,
  notes,
  createdAt,
  onEdit,
  onDelete,
}: DocumentCardProps) {
  return (
    <Card className="border border-border/50 hover:border-border shadow-sm hover:shadow-md transition-all duration-300 rounded-xl overflow-hidden group bg-card/50 hover:bg-card">
      <CardContent className="p-0">
        {/* Document Header */}
        <div className="bg-gradient-to-r from-accent/10 to-primary/5 p-4">
          <div className="flex justify-between items-start gap-3">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-foreground flex flex-wrap items-center gap-2 break-words">
                <FileText className="text-primary" size={20} />
                <span className="group-hover:text-primary transition-colors">
                  {title}
                </span>
              </h2>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                {type}
              </p>
            </div>

            <div className="flex gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() =>
                        onEdit(id, {
                          title,
                          type,
                          status,
                          fileUrl,
                          notes,
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

        {/* Document Details */}
        <div className="p-4 space-y-3">
          {/* Status */}
          <div className="flex items-start gap-2">
            <User
              size={18}
              className="text-rose-500 dark:text-rose-400 mt-0.5 flex-shrink-0"
            />
            <div>
              <Badge
                variant="outline"
                className={cn(
                  "border-2 font-medium px-2 py-0.5 text-xs",
                  status === "Not Started" &&
                    "border-gray-500/30 bg-gray-500/10 text-gray-600 dark:text-gray-400",
                  status === "In Progress" &&
                    "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400",
                  status === "Completed" &&
                    "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400",
                )}
              >
                {status}
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">Status</p>
            </div>
          </div>

          {/* File Link */}
          {fileUrl && (
            <div className="flex items-start gap-2">
              <Link
                size={18}
                className="text-emerald-500 dark:text-emerald-400 mt-0.5 flex-shrink-0"
              />
              <div>
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-foreground hover:underline"
                >
                  View Document
                </a>
                <p className="text-xs text-muted-foreground">File Link</p>
              </div>
            </div>
          )}

          {/* Notes */}
          {notes && (
            <div className="flex items-start gap-2">
              <FileText
                size={18}
                className="text-amber-500 dark:text-amber-400 mt-0.5 flex-shrink-0"
              />
              <div>
                <p className="text-sm font-medium text-foreground line-clamp-2">
                  {notes}
                </p>
                <p className="text-xs text-muted-foreground">Notes</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
