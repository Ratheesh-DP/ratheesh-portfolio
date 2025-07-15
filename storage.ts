import { users, resumes, contacts, type User, type InsertUser, type Resume, type InsertResume, type Contact, type InsertContact } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createResume(resume: InsertResume): Promise<Resume>;
  getLatestResume(): Promise<Resume | undefined>;
  getAllResumes(): Promise<Resume[]>;
  deleteResume(id: number): Promise<boolean>;
  
  createContact(contact: InsertContact): Promise<Contact>;
  getAllContacts(): Promise<Contact[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private resumes: Map<number, Resume>;
  private contacts: Map<number, Contact>;
  private currentUserId: number;
  private currentResumeId: number;
  private currentContactId: number;

  constructor() {
    this.users = new Map();
    this.resumes = new Map();
    this.contacts = new Map();
    this.currentUserId = 1;
    this.currentResumeId = 1;
    this.currentContactId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createResume(insertResume: InsertResume): Promise<Resume> {
    const id = this.currentResumeId++;
    const resume: Resume = { 
      ...insertResume, 
      id, 
      uploadedAt: new Date() 
    };
    this.resumes.set(id, resume);
    return resume;
  }

  async getLatestResume(): Promise<Resume | undefined> {
    const allResumes = Array.from(this.resumes.values());
    return allResumes.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())[0];
  }

  async getAllResumes(): Promise<Resume[]> {
    return Array.from(this.resumes.values()).sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
  }

  async deleteResume(id: number): Promise<boolean> {
    return this.resumes.delete(id);
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date() 
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getAllContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}

export const storage = new MemStorage();
