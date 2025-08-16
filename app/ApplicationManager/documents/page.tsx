// app/documents/page.tsx
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
import DocumentCard from "@/components/DocumentCard";

interface Document {
  id: string;
  title: string;
  type: string;
  status: string;
  fileUrl?: string;
  notes?: string;
}

export default function DocumentsPage() {
  const { user, isLoaded } = useUser();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [editingDocument, setEditingDocument] = useState<Document | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const updateDocument = useMutation(api.documents.updateDocument);
  const deleteDocument = useMutation(api.documents.removeDocument);
  const getCurrentUser = useQuery(
    api.user.getCurrentUser,
    isLoaded && user ? { clerkId: user.id } : "skip",
  );

  useEffect(() => {
    if (getCurrentUser) {
      setCurrentUser(getCurrentUser);
    }
  }, [getCurrentUser]);

  const documents = useQuery(
    api.documents.getByUserId,
    currentUser ? { userId: currentUser._id } : "skip",
  );
  const createDocument = useMutation(api.documents.createDocument);

  const handleEdit = (id: string, document: Omit<Document, "id">) => {
    setEditingDocument({
      id,
      title: document.title,
      type: document.type,
      status: document.status,
      fileUrl: document.fileUrl || "",
      notes: document.notes || "",
    });
  };

  const handleUpdate = async () => {
    if (!editingDocument) return;

    try {
      await updateDocument({
        id: editingDocument.id as Id<"documents">,
        title: editingDocument.title,
        type: editingDocument.type,
        status: editingDocument.status,
        fileUrl: editingDocument.fileUrl,
        notes: editingDocument.notes,
      });

      setEditingDocument(null);
      toast("Document updated successfully");
    } catch {
      toast("Error updating document");
    }
  };

  const handleDelete = (id: Id<"documents">) => {
    deleteDocument({ id });
  };

  const [form, setForm] = useState({
    title: "",
    type: "LOR",
    status: "Not Started",
    fileUrl: "",
    notes: "",
  });

  const handleCreate = async () => {
    if (!currentUser) return;

    try {
      await createDocument({
        userId: currentUser._id,
        title: form.title,
        type: form.type,
        status: form.status,
        fileUrl: form.fileUrl,
        notes: form.notes,
        createdAt: Date.now(),
      });

      setForm({
        title: "",
        type: "LOR",
        status: "Not Started",
        fileUrl: "",
        notes: "",
      });

      setOpen(false);
      toast("Document added successfully");
    } catch {
      toast("Error creating document");
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
        <h1 className="text-3xl font-bold">Documents</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setOpen(true)}>Add Document</Button>
          </DialogTrigger>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>Add New Document</DialogTitle>
              <DialogDescription>Fill in the details below:</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Document Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />

              <div className="grid grid-cols-2 gap-4">
                <Select
                  value={form.type}
                  onValueChange={(val) => setForm({ ...form, type: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOR">
                      Letter of Recommendation
                    </SelectItem>
                    <SelectItem value="SOP">Statement of Purpose</SelectItem>
                    <SelectItem value="Transcript">Transcript</SelectItem>
                    <SelectItem value="Resume">Resume</SelectItem>
                    <SelectItem value="Test Scores">Test Scores</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={form.status}
                  onValueChange={(val) => setForm({ ...form, status: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Not Started">Not Started</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Input
                placeholder="Document URL (Google Drive, Dropbox, etc.)"
                value={form.fileUrl}
                onChange={(e) => setForm({ ...form, fileUrl: e.target.value })}
              />

              <Textarea
                placeholder="Notes"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </div>
            <Button onClick={handleCreate} className="mt-4 w-full">
              Create Document
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      {editingDocument && (
        <Dialog open={true} onOpenChange={() => setEditingDocument(null)}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>Edit Document</DialogTitle>
              <DialogDescription>
                Update the document details below:
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Document Title"
                value={editingDocument.title}
                onChange={(e) =>
                  setEditingDocument({
                    ...editingDocument,
                    title: e.target.value,
                  })
                }
              />

              <div className="grid grid-cols-2 gap-4">
                <Select
                  value={editingDocument.type}
                  onValueChange={(val) =>
                    setEditingDocument({
                      ...editingDocument,
                      type: val,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOR">
                      Letter of Recommendation
                    </SelectItem>
                    <SelectItem value="SOP">Statement of Purpose</SelectItem>
                    <SelectItem value="Transcript">Transcript</SelectItem>
                    <SelectItem value="Resume">Resume</SelectItem>
                    <SelectItem value="Test Scores">Test Scores</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={editingDocument.status}
                  onValueChange={(val) =>
                    setEditingDocument({
                      ...editingDocument,
                      status: val,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Not Started">Not Started</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Input
                placeholder="Document URL (Google Drive, Dropbox, etc.)"
                value={editingDocument.fileUrl}
                onChange={(e) =>
                  setEditingDocument({
                    ...editingDocument,
                    fileUrl: e.target.value,
                  })
                }
              />

              <Textarea
                placeholder="Notes"
                value={editingDocument.notes}
                onChange={(e) =>
                  setEditingDocument({
                    ...editingDocument,
                    notes: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex justify-between gap-4 mt-4">
              <Button
                variant="outline"
                onClick={() => setEditingDocument(null)}
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
        {documents?.map((doc) => (
          <DocumentCard
            key={doc._id}
            id={doc._id}
            title={doc.title}
            type={doc.type}
            status={doc.status}
            fileUrl={doc.fileUrl}
            notes={doc.notes}
            createdAt={doc.createdAt}
            onEdit={handleEdit}
            onDelete={() => handleDelete(doc._id)}
          />
        ))}
      </div>
    </div>
  );
}
