import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create Supabase client with better configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  headers: {
    "Content-Type": "application/json",
  },
});

// Types
export interface Profile {
  id: string;
  full_name: string;
  title: string[]; // Array of strings
  github?: string; // New field
  linkedin?: string; // New field
  email?: string; // New field
  updated_at?: string;
}

export interface Experience {
  id: string;
  user_id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
  achievements: string[];
  created_at?: string;
  updated_at?: string;
}

export interface Education {
  id: string;
  user_id: string;
  degree: string;
  university: string;
  duration: string;
  cgpa: string;
  achievements: string[];
  created_at?: string;
  updated_at?: string;
}

export interface Skill {
  id: string;
  user_id: string;
  name: string;
  level: number;
  category: string;
  created_at?: string;
  updated_at?: string;
}

export interface Project {
  id: string;
  user_id: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  created_at?: string;
  updated_at?: string;
}

// Add this with your other interfaces
export interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at?: string;
}

// Authentication check utility
const checkAuth = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    // Attempt token refresh
    const { error: refreshError } = await supabase.auth.refreshSession();
    if (refreshError) throw new Error("Session expired - please login again");
    return checkAuth();
  }

  if (!user) throw new Error("Not authenticated");
  return user;
};

// Updated API Functions
export const api = {
  // Profile
  getProfile: async () => {

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // No rows found
        // Create initial profile if missing
        const { data: newData } = await supabase
          .from("profiles")
          .select()
          .single();
        return newData;
      }
      throw error;
    }

    // Ensure the title field is an array
    if (data.title && typeof data.title === "string") {
      data.title = data.title.split("/").map((title: string) => title.trim());
    }

    return data;
  },

  updateProfile: async (profile: Partial<Profile>) => {
    const user = await checkAuth();

    // Send the title field as an array
    const updatedProfile = {
      ...profile,
      title: profile.title, // Already an array
    };

    const { data, error } = await supabase
      .from("profiles")
      .update(updatedProfile)
      .eq("id", user.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Experiences
  getExperiences: async () => {

    const { data, error } = await supabase
      .from("experiences")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  addExperience: async (
    experience: Omit<Experience, "id" | "user_id" | "created_at" | "updated_at">
  ) => {
    console.log("Experience data being sent:", experience); // Debugging line

    const user = await checkAuth();

    const { data, error } = await supabase
      .from("experiences")
      .insert({
        ...experience,
        user_id: user.id,
        achievements: Array.isArray(experience.achievements)
          ? experience.achievements
          : experience.achievements?.split(",").map((a) => a.trim()) || [],
        location: experience.location || null,
        description: experience.description || null,
      })
      .select()
      .single();

    if (error) {
      console.error("Detailed error:", error);
      throw new Error(`Failed to add experience: ${error.message}`);
    }
    return data;
  },

  updateExperience: async (id: string, experience: Partial<Experience>) => {
    const user = await checkAuth();

    const achievements =
      experience.achievements && Array.isArray(experience.achievements)
        ? experience.achievements
        : experience.achievements?.split(",").map((a) => a.trim());

    const { data, error } = await supabase
      .from("experiences")
      .update({ ...experience, achievements })
      .eq("id", id)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  deleteExperience: async (id: string) => {
    const user = await checkAuth();

    const { error } = await supabase
      .from("experiences")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) throw error;
  },

  // Education
  getEducation: async () => {

    const { data, error } = await supabase
      .from("education")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  addEducation: async (
    education: Omit<Education, "id" | "user_id" | "created_at" | "updated_at">
  ) => {
    const user = await checkAuth();

    const achievements = Array.isArray(education.achievements)
      ? education.achievements
      : education.achievements?.split(",").map((a) => a.trim()) || [];

    const { data, error } = await supabase
      .from("education")
      .insert({ ...education, user_id: user.id, achievements })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  updateEducation: async (id: string, education: Partial<Education>) => {
    const user = await checkAuth();

    const achievements =
      education.achievements && Array.isArray(education.achievements)
        ? education.achievements
        : education.achievements?.split(",").map((a) => a.trim());

    const { data, error } = await supabase
      .from("education")
      .update({ ...education, achievements })
      .eq("id", id)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  deleteEducation: async (id: string) => {
    const user = await checkAuth();

    const { error } = await supabase
      .from("education")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) throw error;
  },

  // Skills
  getSkills: async () => {

    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  addSkill: async (
    skill: Omit<Skill, "id" | "user_id" | "created_at" | "updated_at">
  ) => {
    const user = await checkAuth();

    const { data, error } = await supabase
      .from("skills")
      .insert({ ...skill, user_id: user.id })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  updateSkill: async (id: string, skill: Partial<Skill>) => {
    const user = await checkAuth();

    const { data, error } = await supabase
      .from("skills")
      .update(skill)
      .eq("id", id)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  deleteSkill: async (id: string) => {
    const user = await checkAuth();

    const { error } = await supabase
      .from("skills")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) throw error;
  },

  // Projects
  getProjects: async () => {

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  addProject: async (
    project: Omit<Project, "id" | "user_id" | "created_at" | "updated_at">
  ) => {
    const user = await checkAuth();

    const tech = Array.isArray(project.tech)
      ? project.tech
      : project.tech?.split(",").map((t) => t.trim()) || [];

    const { data, error } = await supabase
      .from("projects")
      .insert({ ...project, user_id: user.id, tech })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  updateProject: async (id: string, project: Partial<Project>) => {
    const user = await checkAuth();

    const tech =
      project.tech && Array.isArray(project.tech)
        ? project.tech
        : project.tech?.split(",").map((t) => t.trim());

    const { data, error } = await supabase
      .from("projects")
      .update({ ...project, tech })
      .eq("id", id)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  deleteProject: async (id: string) => {
    const user = await checkAuth();

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) throw error;
  },
  // Add these to your api object
  submitContact: async (contact: Omit<Contact, "id" | "created_at">) => {
    const { data, error } = await supabase
      .from("contacts")
      .insert(contact)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  getContacts: async () => {
    const user = await checkAuth();

    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  getMetrics: async () => {
    const { data, error } = await supabase
      .from("metrics")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  addMetric: async (metricData: any) => {
    const { data, error } = await supabase
      .from("metrics")
      .insert(metricData)
      .single();

    if (error) throw error;
    return data;
  },

  updateMetric: async (id: string, metricData: any) => {
    const { data, error } = await supabase
      .from("metrics")
      .update(metricData)
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  deleteMetric: async (id: string) => {
    const { error } = await supabase.from("metrics").delete().eq("id", id);

    if (error) throw error;
    return true;
  },

  getLogo: async () => {
    try {
      console.log("Fetching logo data...");

      const { data, error } = await supabase
        .from("logos")
        .select("storage_path, file_name")
        .order("created_at", { ascending: false })
        .maybeSingle();

      if (error) {
        console.error("Error fetching logo:", error);
        return null;
      }

      console.log("Fetched logo data:", data);
      return data;
    } catch (error) {
      console.error("Error in getLogo:", error);
      return null;
    }
  },

  uploadLogo: async (file: File) => {
    try {
      // Check existing logo
      const { data: existing } = await supabase
        .from("logos")
        .select("*")
        .maybeSingle();

      // Delete existing logo if it exists
      if (existing) {
        // Delete from storage
        await supabase.storage.from("logos").remove([existing.storage_path]);

        // Delete from database
        await supabase.from("logos").delete().eq("id", existing.id);
      }

      // Generate unique filename
      const fileName = `logo-${Date.now()}.png`;

      // Upload new file
      const { error: uploadError } = await supabase.storage
        .from("logos")
        .upload(fileName, file, {
          contentType: "image/png",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Insert new record
      const { data, error: insertError } = await supabase
        .from("logos")
        .insert({
          file_name: fileName,
          storage_path: fileName,
        })
        .select()
        .single();

      if (insertError) {
        // Cleanup uploaded file on db error
        await supabase.storage.from("logos").remove([fileName]);
        throw insertError;
      }

      return data;
    } catch (error) {
      console.error("Logo upload error:", error);
      throw error;
    }
  },

  getLogoUrl: (storagePath: string) => {
    if (!storagePath) return null;

    const { data } = supabase.storage.from("logos").getPublicUrl(storagePath);

    return data.publicUrl;
  },
};
