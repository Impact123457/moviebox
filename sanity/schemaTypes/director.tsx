import {UserIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const directior = defineType({
  name: 'director',
  title: 'Director',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'surname',
      type: 'string',
    }),
    defineField({
      name: 'biography',
      type: 'text',
    }),
    defineField({
      name: 'image',
      type: 'url',
    }),
],
preview:{
    select: {
       title: 'name', 
    }
    }
})
    
