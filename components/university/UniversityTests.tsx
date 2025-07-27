import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PencilRuler } from "lucide-react";

interface UniversityTestsProps {
  testsRequired: string[];
}

export function UniversityTests({ testsRequired }: UniversityTestsProps) {
  return (
    <Card className="bg-pink-50 dark:bg-pink-900/20 border-0 shadow-sm hover:shadow-md transition">
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <PencilRuler className="h-4 w-4 text-pink-600 dark:text-pink-300" />
        <CardTitle className="text-sm font-medium text-pink-700 dark:text-pink-200">
          Tests Required
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {testsRequired.map((test, index) => (
            <Badge
              key={index}
              className="bg-pink-100 text-pink-700 dark:bg-pink-800/40 dark:text-pink-100 rounded-full px-3 py-1 text-sm font-medium"
            >
              {test}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
