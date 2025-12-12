import {defineArrayMember, defineField, defineType} from 'sanity'

export const user = defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      type: 'number',
    }),
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'surname',
      type: 'string',
    }),
    defineField({
      name: 'username',
      type: 'string',
    }),
    defineField({
      name: 'email',
      type: 'string',
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
      type: 'image',
    }),
],
preview:{
    select: {
       title: 'name', 
    }
    }
})
    
