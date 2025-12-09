import {defineArrayMember, defineField, defineType} from 'sanity'

export const liked = defineType({
  name: 'liked',
  title: 'Liked',
  type: 'document',
  fields: [
    defineField({
      name: 'user',
      type: 'reference',
      to: {type: 'user'},
    }),
    defineField({
      name: 'movies',
      type: 'array',
      of: [{type: 'reference', to: [{ type: 'movie' }]}]
    }),
],
preview:{
    select: {
       title: 'name', 
    }
    }
})
    
