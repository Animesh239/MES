import { z } from "zod";
import { RegistrationFormData } from "./RegistrationFormData";
// import { LoginFormData } from "./loginFormData";

export const generateZodSchema = (
  registrationFormData: typeof RegistrationFormData
) => {
  const schemaObject: Record<string, z.ZodSchema> = {};

  registrationFormData.forEach((field) => {
    if (field.zod) {
      switch (field.zod) {
        case "text":
          schemaObject[field.id] = z
            .string()
            .min(1, `${field.label} is required`);

          break;
        case "number":
          schemaObject[field.id] = z
            .string()
            .min(10, `${field.label} must be 10 digits number`);
          break;
        case "year":
          schemaObject[field.id] = z
            .string()
            .min(4, `${field.label} must be 4 digits number`)
            .max(4, `${field.label} must be 4 digits number`);
          break;
        case "optional":
          schemaObject[field.id] = z.string().optional();
          break;
        default:
          break;
      }
    }
  });

  return z.object(schemaObject);
};
