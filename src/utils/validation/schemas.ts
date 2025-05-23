import { z } from "zod";
import { Types } from "mongoose";

// Class schema
export const iClassSchema = z.object({
  name: z.string().min(1, { message: "Class name is required." }),
  subjects: z.array(z.string(), { message: "Invalid subject IDs." }),
});

// Configuration schema
export const iConfigSchema = z.object({});

// Learner schema
export const iLearnerSchema = z.object({
  userDetails: z.instanceof(Types.ObjectId, { message: "Invalid user details ID." }),
  class: z.instanceof(Types.ObjectId, { message: "Invalid class ID." }),
});

// Parent schema
export const iParentSchema = z.object({
  userDetails: z.instanceof(Types.ObjectId, { message: "Invalid user details ID." }),
  forLearner: z.instanceof(Types.ObjectId, { message: "Invalid learner ID." }),
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
});

// Subject schema
export const iSubjectSchema = z.object({
  name: z.string().min(1, { message: "Subject name is required." })
});

// Teacher schema
export const iTeacherSchema = z.object({
  userDetails: z.instanceof(Types.ObjectId, { message: "Invalid user details ID." }),
  classes: z.array(z.instanceof(Types.ObjectId), { message: "Invalid class IDs." }),
  subjects: z.array(z.instanceof(Types.ObjectId), { message: "Invalid subject IDs." }),
});

// Term schema
export const iTermSchema = z.object({
  name: z.string().min(1, { message: "Term name is required." }),
});

// User schema
export const iUserSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  otherNames: z.string().optional(),
  password: z.string().min(8, { message: "Password must be at least 6 characters long." }).optional(),
  email: z.string().email({ message: "Invalid email format." }),
  // forSchool: z.instanceof(Types.ObjectId, { message: "Invalid school ID." }),
}).passthrough();

//Admin schema 
export const iAdminSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"), 
  email: z.string().email("Invalid email format"),
  phoneNumber: z.string().min(10, "Phone number must be valid"),
});

export const adminLoginSchema = z.object({
  userName: z.string({message:'Username is required and should be string'}),
  password:z.string({message:'Password required and should be string'})
})

export const schoolAdminSchema  = z.object({
  schoolRole: z.string({message: 'School admin role is required and must be string'})
})

export const userLoginSchema  = z.object({
  identifier: z.string().email().or(z.string()),
  password: z.string()
})
