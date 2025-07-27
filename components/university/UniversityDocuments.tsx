import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";

interface UniversityDocumentsProps {
  documentRequired: string[];
}

export function UniversityDocuments({
  documentRequired,
}: UniversityDocumentsProps) {
  return (
    <Card className="bg-sky-50 dark:bg-sky-900/20 border-0 shadow-sm hover:shadow-md transition">
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <FileText className="h-4 w-4 text-sky-600 dark:text-sky-300" />
        <CardTitle className="text-sm font-medium text-sky-700 dark:text-sky-100">
          Documents Required
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {documentRequired.map((doc, index) => (
            <Badge
              key={index}
              className="bg-sky-100 text-sky-700 dark:bg-sky-800/40 dark:text-sky-100 rounded-full px-3 py-1 text-sm font-medium"
            >
              {doc}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
