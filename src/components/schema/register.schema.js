import { z } from "zod";

export const ownerSchema = z
  .object({
    username: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .max(30, { message: "Name cannot exceed 30 characters" }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({ message: "Invalid email id" }),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(8)
      .refine(
        (value) =>
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
            value ?? ""
          ),
        "Password should contain at least one letter, one number and one special character"
      ),
    confirmPassword: z
      .string({
        required_error: " Password  is required",
      })
      .min(8),
    address: z.string({
      required_error: "Address is required",
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

// ^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$
