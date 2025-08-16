"use client";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import { University } from "@/lib/types";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EditUniversityPage() {
  const params = useParams();
  const router = useRouter();
  const universitySlug = params["university-slug"] as string;

  const universityData = useQuery(
    api.universities.getUniversityBySlug,
    universitySlug ? { slug: universitySlug } : "skip",
  ) as { university: University } | undefined;

  const updateUniversity = useMutation(api.universities.updateUniversityFields);

  const [formData, setFormData] = useState<Partial<University>>({
    name: "",
    program: "",
    country: "",
    city: "",
    deadline: undefined,
    status: "Planning",
    tier: "Moderate",
    result: "Waiting",
    fee: "",
    rank: "",
    notes: "",
    universityUrl: "",
    testsRequired: [],
    documentsRequired: [],
  });

  // Initialize form with current data when loaded
  useEffect(() => {
    if (universityData?.university) {
      setFormData(universityData.university);
    }
  }, [universityData]);

  if (!universityData) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { _id, ...rest } = formData as University;
      await updateUniversity({
        id: _id,
        ...rest,
      });
      router.push(`/ApplicationManager/universities/${universitySlug}`);
    } catch (error) {
      console.error("Error updating university:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Edit University Application</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">University Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="program">Program</Label>
            <Input
              id="program"
              name="program"
              value={formData.program || ""}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              name="country"
              value={formData.country || ""}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              value={formData.city || ""}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline">Deadline</Label>
            <Input
              type="date"
              id="deadline"
              name="deadline"
              value={
                formData.deadline
                  ? format(new Date(formData.deadline), "yyyy-MM-dd")
                  : ""
              }
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  deadline: e.target.value
                    ? new Date(e.target.value).getTime()
                    : undefined,
                }))
              }
            />
          </div>
          <div className="flex flex-row gap-2">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status || ""}
                onValueChange={(val) =>
                  setFormData((prev) => ({ ...prev, status: val }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Planning">Planning</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Submitted">Submitted</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Not Started">Not Started</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tier">Tier</Label>
              <Select
                value={formData.tier || ""}
                onValueChange={(val) =>
                  setFormData((prev) => ({ ...prev, tier: val }))
                }
              >
                <SelectTrigger id="tier">
                  <SelectValue placeholder="Select a tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ambitious">Ambitious</SelectItem>
                  <SelectItem value="Moderate">Moderate</SelectItem>
                  <SelectItem value="Safe">Safe</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="fee">Application Fee</Label>
            <Input
              id="fee"
              name="fee"
              type="number"
              value={formData.fee || ""}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rank">Personal Rank</Label>
            <Input
              type="number"
              id="rank"
              name="rank"
              value={formData.rank || ""}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="universityUrl">University Website URL</Label>
            <Input
              id="universityUrl"
              name="universityUrl"
              type="url"
              value={formData.universityUrl || ""}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="testsRequired">
              Tests Required (comma separated)
            </Label>
            <Input
              id="testsRequired"
              name="testsRequired"
              value={formData.testsRequired?.join(", ") || ""}
              onChange={(e) =>
                handleArrayChange("testsRequired", e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="documentsRequired">
              Documents Required (comma separated)
            </Label>
            <Input
              id="documentsRequired"
              name="documentsRequired"
              value={formData.documentsRequired?.join(", ") || ""}
              onChange={(e) =>
                handleArrayChange("documentsRequired", e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tier">Result</Label>
            <Select
              value={formData.result || ""}
              onValueChange={(val) =>
                setFormData((prev) => ({ ...prev, result: val }))
              }
            >
              <SelectTrigger id="result">
                <SelectValue placeholder="Select result" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Waiting">Waiting</SelectItem>
                <SelectItem value="Admit">Admit</SelectItem>
                <SelectItem value="Reject">Reject</SelectItem>
                <SelectItem value="Waitlisted">Waitlisted</SelectItem>
                <SelectItem value="Deferred">Deferred</SelectItem>
                <SelectItem value="Interview">Interview</SelectItem>
                <SelectItem value="Conditional Admit">
                  Conditional Admit
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes || ""}
              onChange={handleChange}
              rows={5}
            />
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              router.push(`/ApplicationManager/universities/${universitySlug}`)
            }
          >
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
}
