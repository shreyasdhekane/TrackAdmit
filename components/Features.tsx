import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CalendarClock, FileStack, School2 } from "lucide-react"; // Icons for app-related features
import { ReactNode } from "react";

export default function Features() {
  return (
    <section className="bg-zinc-50 py-8 md:py-16 dark:bg-transparent">
      <div className="@container mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            Designed for Every Applicant
          </h2>
          <p className="mt-4 text-muted-foreground">
            Everything you need to stay on top of your applications, deadlines,
            and documents — all in one place.
          </p>
        </div>

        <Card className="@min-4xl:max-w-full @min-4xl:grid-cols-3 @min-4xl:divide-x @min-4xl:divide-y-0 mx-auto mt-8 grid max-w-sm divide-y overflow-hidden shadow-zinc-950/5 *:text-center md:mt-16">
          {/* Feature 1 */}
          <div className="group shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <CardDecorator>
                <CalendarClock className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-medium">Deadline Tracker</h3>
            </CardHeader>

            <CardContent>
              <p className="text-sm">
                Stay ahead of all your submission deadlines with smart reminders
                and an intuitive calendar view.
              </p>
            </CardContent>
          </div>

          {/* Feature 2 */}
          <div className="group shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <CardDecorator>
                <FileStack className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-medium">Document Organizer</h3>
            </CardHeader>

            <CardContent>
              <p className="mt-3 text-sm">
                Upload, sort, and track your resumes, SOPs, and LORs with status
                labels and doc validation.
              </p>
            </CardContent>
          </div>

          {/* Feature 3 */}
          <div className="group shadow-zinc-950/5">
            <CardHeader className="pb-3">
              <CardDecorator>
                <School2 className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-medium">University Dashboard</h3>
            </CardHeader>

            <CardContent>
              <p className="mt-3 text-sm">
                See side-by-side comparisons of universities, required docs,
                test scores, and more — all at a glance.
              </p>
            </CardContent>
          </div>
        </Card>
      </div>
    </section>
  );
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
    />
    <div
      aria-hidden
      className="bg-radial to-background absolute inset-0 from-transparent to-75%"
    />
    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">
      {children}
    </div>
  </div>
);
