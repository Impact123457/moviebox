import {defineArrayMember, defineField, defineType} from 'sanity'

export const movie = defineType({
  name: 'movie',
  title: 'Movie',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'release',
      type: 'date',
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'genre',
      type: 'array',
      of: [{type: 'reference', to: [{ type: 'genre' }]}]
    }),
    defineField({
      name: 'director',
      type: 'reference',
      to: {type: 'director'},
    }),
],
preview:{
    select: {
       title: 'name', 
    }
    }
})
    
