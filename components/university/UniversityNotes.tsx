import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StickyNote } from "lucide-react";

interface UniversityNotesProps {
  notes: string;
}

export function UniversityNotes({ notes }: UniversityNotesProps) {
  return (
    <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-0 shadow-sm hover:shadow-md transition">
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <StickyNote className="h-4 w-4 text-yellow-600 dark:text-yellow-300" />
        <CardTitle className="text-sm font-medium text-yellow-800 dark:text-yellow-100">
          Application Notes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm max-w-none dark:prose-invert text-yellow-900 dark:text-yellow-100">
          {notes.split("\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
