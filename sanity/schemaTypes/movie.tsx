import {defineArrayMember, defineField, defineType} from 'sanity'

export const movie = defineType({
  name: 'movie',
  title: 'Movie',
  type: 'document',
  fields: [
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
      type: 'url',
    }),
    defineField({
      name: 'genre',
      type: 'reference',
      to: {type: 'genre'},
    }),
],
preview:{
    select: {
       title: 'name', 
    }
    }
})
    
