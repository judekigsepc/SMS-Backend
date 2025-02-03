import { z } from "zod";
import { Types } from "mongoose";

// Class schema
export const iClassSchema = z.object({
  name: z.string().min(1, { message: "Class name is required." }),
  forSchool: z.instanceof(Types.ObjectId, { message: "Invalid school ID." }),
  subjects: z.array(z.instanceof(Types.ObjectId), { message: "Invalid subject IDs." }),
});

// Configuration schema
export const iConfigSchema = z.object({});

// Learner schema
export const iLearnerSchema = z.object({
  userDetails: z.instanceof(Types.ObjectId, { message: "Invalid user details ID." }),
  class: z.instanceof(Types.ObjectId, { message: "Invalid class ID." }),
  forSchool: z.instanceof(Types.ObjectId, { message: "Invalid school ID." }),
});

// Parent schema
export const iParentSchema = z.object({
  userDetails: z.instanceof(Types.ObjectId, { message: "Invalid user details ID." }),
  forLearner: z.instanceof(Types.ObjectId, { message: "Invalid learner ID." }),
  forSchool: z.instanceof(Types.ObjectId, { message: "Invalid school ID." }),
});

// Education levels schema
const educationLevelsSchema = z.union([
  z.literal("nursery"),
  z.literal("primary"),
  z.literal("secondary"),
  z.literal("tertiary"),
  z.literal("other"),
]);

// School schema
export const iSchoolSchema = z.object({
  name: z.string().min(1, { message: "School name is required." }),
  // logoUrl: z.string().url({ message: "Invalid logo URL." }), lOGO URL ISNT VALIDATED
  address: z.string().min(1, { message: "Address is required." }),
  contactEmail: z.string().email({ message: "Invalid email format." }),
  yearOfEstablishment: z.string().or(z.number().int().min(1900, { message: "Year of establishment must be a valid year." })),
  schoolType: z.union([
    z.literal("private"),
    z.literal("government"),
    z.literal("NGO"),
  ]),
  educationLevels: z.union([educationLevelsSchema, z.array(educationLevelsSchema)]),
  phoneNumbers: z.array(z.string({message:'Phone Number should be string'})),
  otherInfo: z.object({}).optional(),
});

// Stream schema
export const iStreamSchema = z.object({
  name: z.string().min(1, { message: "Stream name is required." }),
  forSchool: z.instanceof(Types.ObjectId, { message: "Invalid school ID." }),
});

// Subject schema
export const iSubjectSchema = z.object({
  name: z.string().min(1, { message: "Subject name is required." }),
  forSchool: z.instanceof(Types.ObjectId, { message: "Invalid school ID." }),
});

// Teacher schema
export const iTeacherSchema = z.object({
  userDetails: z.instanceof(Types.ObjectId, { message: "Invalid user details ID." }),
  classes: z.array(z.instanceof(Types.ObjectId), { message: "Invalid class IDs." }),
  subjects: z.array(z.instanceof(Types.ObjectId), { message: "Invalid subject IDs." }),
  forSchool: z.instanceof(Types.ObjectId, { message: "Invalid school ID." }),
});

// Term schema
export const iTermSchema = z.object({
  name: z.string().min(1, { message: "Term name is required." }),
  forSchool: z.instanceof(Types.ObjectId, { message: "Invalid school ID." }),
});

// User schema
export const iUserSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  otherNames: z.string().optional(),
  password: z.string().min(6, { message: "Password must be at least 6 characters long." }).optional(),
  isAdmin: z.boolean(),
  email: z.string().email({ message: "Invalid email format." }),
  forSchool: z.instanceof(Types.ObjectId, { message: "Invalid school ID." }),
});

