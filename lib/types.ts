// types.ts
import { Id } from "@/convex/_generated/dataModel";

export interface User {
  _id: Id<"users">;
  _creationTime?: number;
  clerkId: string;
  email: string;
  username: string;
  createdAt: number;
}

export interface University {
  _id: Id<"universities">;
  _creationTime?: number;
  userId: string;
  name: string;
  slug: string;
  program: string;
  country: string;
  city: string;
  deadline: number;
  status: string;
  tier: string;
  fee: string;
  rank: string;
  notes?: string;
  testsRequired?: string[];
  universityUrl?: string;
  documentsRequired?: string[];
  submitted?: boolean;
  result?: string;
  createdAt: number;
}

export interface Document {
  _id: Id<"documents">;
  _creationTime?: number;
  userId: string;
  title: string;
  type: string;
  status: string;
  universityId?: Id<"universities">;
  reviewer?: string;
  fileUrl?: string;
  notes?: string;
  createdAt: number;
}
