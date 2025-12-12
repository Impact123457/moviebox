import { z } from 'zod';
export const formSchema = z.object = ({
    username: z.string().min(3).max(100),
    bio: z.string().min(10).max(200),
})