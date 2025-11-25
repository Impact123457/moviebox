import {defineArrayMember, defineField, defineType} from 'sanity'

export const user = defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'username',
      type: 'string',
    }),
    defineField({
      name: 'email',
      type: 'string',
      validation: (Rule) => Rule.min(10).required().error("Enter you email."),
    }),
    defineField({
      name: 'bio',
      type: 'text',
    }),
    defineField({
      name: 'password',
      type: 'string',
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
    
