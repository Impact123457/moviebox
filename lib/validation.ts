import { z } from "zod";

export const profileSchema = z.object({
    username: z.string().min(3).max(50),
    bio: z.string().max(100),
    file: z
    .instanceof(File)
    .nullable()
    .optional()
    .refine(
      (file) =>
        file === null ||
        file === undefined ||
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg"
    )
})

