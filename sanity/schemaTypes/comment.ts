import {defineField, defineType} from 'sanity'
import { UserIcon } from "lucide-react";

export const comment = defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  icon: UserIcon,
    fields: [
        defineField({
            name: "title",
            type:"string",
        }),
        defineField({
            name: "slug",
            type:"slug",
            options:{
                source: "title",
            }
        }),
        defineField({
            name: 'user',
            type: 'reference',
            to: {type: 'user'},
        }),
        defineField({
            name: "description",
            type:"markdown",
        }),
    ],
    preview: {
        select: {
            title: "title",
        },
    },
})
    
