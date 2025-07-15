import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertResumeSchema, insertContactSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage_multer = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage_multer,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.pdf', '.doc', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, and DOCX files are allowed'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Resume routes
  app.post("/api/resume/upload", upload.single('resume'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const resumeData = {
        filename: req.file.filename,
        originalName: req.file.originalname,
        path: req.file.path,
        size: req.file.size
      };

      const validatedData = insertResumeSchema.parse(resumeData);
      const resume = await storage.createResume(validatedData);
      
      res.json({ message: "Resume uploaded successfully", resume });
    } catch (error) {
      console.error("Resume upload error:", error);
      res.status(500).json({ message: "Failed to upload resume" });
    }
  });

  app.get("/api/resume/latest", async (req, res) => {
    try {
      const resume = await storage.getLatestResume();
      if (!resume) {
        return res.status(404).json({ message: "No resume found" });
      }
      res.json(resume);
    } catch (error) {
      console.error("Get latest resume error:", error);
      res.status(500).json({ message: "Failed to get resume" });
    }
  });

  app.get("/api/resume/download/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const resumes = await storage.getAllResumes();
      const resume = resumes.find(r => r.id === id);
      
      if (!resume) {
        return res.status(404).json({ message: "Resume not found" });
      }

      if (!fs.existsSync(resume.path)) {
        return res.status(404).json({ message: "Resume file not found" });
      }

      res.download(resume.path, resume.originalName);
    } catch (error) {
      console.error("Download resume error:", error);
      res.status(500).json({ message: "Failed to download resume" });
    }
  });

  app.get("/api/resumes", async (req, res) => {
    try {
      const resumes = await storage.getAllResumes();
      res.json(resumes);
    } catch (error) {
      console.error("Get all resumes error:", error);
      res.status(500).json({ message: "Failed to get resumes" });
    }
  });

  app.delete("/api/resume/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const resumes = await storage.getAllResumes();
      const resume = resumes.find(r => r.id === id);
      
      if (!resume) {
        return res.status(404).json({ message: "Resume not found" });
      }

      // Delete file from filesystem
      if (fs.existsSync(resume.path)) {
        fs.unlinkSync(resume.path);
      }

      const deleted = await storage.deleteResume(id);
      if (deleted) {
        res.json({ message: "Resume deleted successfully" });
      } else {
        res.status(404).json({ message: "Resume not found" });
      }
    } catch (error) {
      console.error("Delete resume error:", error);
      res.status(500).json({ message: "Failed to delete resume" });
    }
  });

  // Contact routes
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.json({ message: "Message sent successfully", contact });
    } catch (error) {
      console.error("Contact submission error:", error);
      res.status(400).json({ message: "Invalid contact data" });
    }
  });

  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Get contacts error:", error);
      res.status(500).json({ message: "Failed to get contacts" });
    }
  });

  // Serve uploaded files
  app.use("/uploads", (req, res, next) => {
    const filePath = path.join(uploadsDir, req.path);
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).json({ message: "File not found" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
