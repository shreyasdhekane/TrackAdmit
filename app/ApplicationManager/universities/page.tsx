// page.tsx
"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { User } from "@/lib/types";
import UniversityCard from "@/components/UniversityCard";

interface UniversityForm {
  id: string;
  name: string;
  program: string;
  country: string;
  city: string;
  deadline: string;
  status: string;
  tier: string;
  fee: string;
  rank: string;
  notes: string;
}

interface UniversityData {
  name: string;
  program: string;
  country: string;
  city: string;
  deadline: number;
  status: string;
  tier: string;
  fee: string;
  rank: string;
  notes: string;
  slug: string;
}

export default function UniversityPage() {
  const { user, isLoaded } = useUser();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [editingUniversity, setEditingUniversity] =
    useState<UniversityForm | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const updateUniversity = useMutation(api.universities.updateUniversity);
  const deleteUniversity = useMutation(api.universities.removeUniversity);
  const getCurrentUser = useQuery(
    api.user.getCurrentUser,
    isLoaded && user ? { clerkId: user.id } : "skip",
  );

  useEffect(() => {
    if (getCurrentUser) {
      setCurrentUser(getCurrentUser);
    }
  }, [getCurrentUser]);

  const universities = useQuery(
    api.universities.getByUserId,
    currentUser ? { userId: currentUser.clerkId } : "skip",
  );
  const createUniversity = useMutation(api.universities.createUniversity);

  const handleEdit = (
    id: string,
    university: Omit<UniversityData, "slug"> & { deadline: number },
  ) => {
    setEditingUniversity({
      id,
      name: university.name,
      program: university.program,
      country: university.country,
      city: university.city,
      deadline: new Date(university.deadline).toISOString().split("T")[0],
      status: university.status,
      tier: university.tier,
      fee: university.fee,
      rank: university.rank,
      notes: university.notes || "",
    });
  };

  const handleUpdate = async () => {
    if (!editingUniversity) return;

    try {
      await updateUniversity({
        id: editingUniversity.id as Id<"universities">,
        name: editingUniversity.name,
        program: editingUniversity.program,
        country: editingUniversity.country,
        city: editingUniversity.city,
        deadline: new Date(editingUniversity.deadline).getTime(),
        status: editingUniversity.status,
        tier: editingUniversity.tier,
        fee: editingUniversity.fee,
        rank: editingUniversity.rank,
        notes: editingUniversity.notes,
      });

      setEditingUniversity(null);
      toast("University updated successfully");
    } catch {
      toast("Error updating university");
    }
  };

  const handleDelete = (id: Id<"universities">) => {
    deleteUniversity({ id });
  };

  const [form, setForm] = useState({
    name: "",
    program: "",
    country: "",
    city: "",
    deadline: "",
    status: "Planning",
    tier: "Moderate",
    fee: "",
    rank: "",
    notes: "",
  });

  const handleCreate = async () => {
    if (!currentUser) return;

    try {
      await createUniversity({
        userId: currentUser._id,
        name: form.name,
        slug: form.name.toLowerCase().replaceAll(" ", "-"),
        program: form.program,
        country: form.country,
        city: form.city,
        deadline: new Date(form.deadline).getTime(),
        status: form.status,
        tier: form.tier,
        fee: form.fee,
        rank: form.rank,
        notes: form.notes,
        createdAt: Date.now(),
      });

      setForm({
        name: "",
        program: "",
        country: "",
        city: "",
        deadline: "",
        status: "Planning",
        tier: "Moderate",
        fee: "",
        rank: "",
        notes: "",
      });

      setOpen(false);
      toast("University added successfully");
    } catch {
      toast("Error creating university");
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!user) {
    router.push("/sign-in");
    return null;
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Universities</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setOpen(true)}>Add University</Button>
          </DialogTrigger>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>Add New University</DialogTitle>
              <DialogDescription>Fill in the details below:</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="University Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <Input
                placeholder="Program"
                value={form.program}
                onChange={(e) => setForm({ ...form, program: e.target.value })}
              />
              <Input
                placeholder="Country"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
              />
              <Input
                placeholder="City"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
              <Input
                type="date"
                value={form.deadline}
                onChange={(e) => setForm({ ...form, deadline: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Fee ($)"
                value={form.fee}
                onChange={(e) => setForm({ ...form, fee: e.target.value })}
              />
              <div className="flex flex-row gap-2">
                <Select
                  value={form.status}
                  onValueChange={(val) => setForm({ ...form, status: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Planning">Planning</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Submitted">Submitted</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Not Started">Not Started</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={form.tier}
                  onValueChange={(val) => setForm({ ...form, tier: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ambitious">Ambitious</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Safe">Safe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Input
                type="number"
                placeholder="Ranking (1-10)"
                value={form.rank}
                onChange={(e) => setForm({ ...form, rank: e.target.value })}
              />
              <Textarea
                placeholder="Notes"
                className="col-span-2"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </div>
            <Button onClick={handleCreate} className="mt-4 w-full">
              Create University
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      {editingUniversity && (
        <Dialog open={true} onOpenChange={() => setEditingUniversity(null)}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>Edit University</DialogTitle>
              <DialogDescription>
                Update the university details below:
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="University Name"
                value={editingUniversity.name}
                onChange={(e) =>
                  setEditingUniversity({
                    ...editingUniversity,
                    name: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Program"
                value={editingUniversity.program}
                onChange={(e) =>
                  setEditingUniversity({
                    ...editingUniversity,
                    program: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Country"
                value={editingUniversity.country}
                onChange={(e) =>
                  setEditingUniversity({
                    ...editingUniversity,
                    country: e.target.value,
                  })
                }
              />
              <Input
                placeholder="City"
                value={editingUniversity.city}
                onChange={(e) =>
                  setEditingUniversity({
                    ...editingUniversity,
                    city: e.target.value,
                  })
                }
              />
              <Input
                type="date"
                value={editingUniversity.deadline}
                onChange={(e) =>
                  setEditingUniversity({
                    ...editingUniversity,
                    deadline: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Fee ($)"
                value={editingUniversity.fee}
                onChange={(e) =>
                  setEditingUniversity({
                    ...editingUniversity,
                    fee: e.target.value,
                  })
                }
              />
              <div className="flex flex-row gap-2">
                <Select
                  value={editingUniversity.status}
                  onValueChange={(val) =>
                    setEditingUniversity({ ...editingUniversity, status: val })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Planning">Planning</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Submitted">Submitted</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={editingUniversity.tier}
                  onValueChange={(val) =>
                    setEditingUniversity({ ...editingUniversity, tier: val })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ambitious">Ambitious</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Safe">Safe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Input
                placeholder="Ranking (1-10)"
                value={editingUniversity.rank}
                onChange={(e) =>
                  setEditingUniversity({
                    ...editingUniversity,
                    rank: e.target.value,
                  })
                }
              />
              <Textarea
                placeholder="Notes"
                className="col-span-2"
                value={editingUniversity.notes}
                onChange={(e) =>
                  setEditingUniversity({
                    ...editingUniversity,
                    notes: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex justify-between gap-4 mt-4">
              <Button
                variant="outline"
                onClick={() => setEditingUniversity(null)}
                className="w-1/2"
              >
                Cancel
              </Button>
              <Button onClick={handleUpdate} className="w-1/2">
                Update
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {universities?.map((uni) => (
          <UniversityCard
            key={uni._id}
            id={uni._id}
            slug={uni.slug}
            name={uni.name}
            program={uni.program}
            city={uni.city}
            country={uni.country}
            deadline={uni.deadline}
            status={uni.status}
            fee={uni.fee}
            tier={uni.tier}
            rank={uni.rank}
            notes={uni.notes}
            onEdit={handleEdit}
            onDelete={() => handleDelete(uni._id)}
          />
        ))}
      </div>
    </div>
  );
}
