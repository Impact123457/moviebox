import {defineArrayMember, defineField, defineType} from 'sanity'

export const watched = defineType({
  name: 'watched',
  title: 'Watched',
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
preview: {
    select: {
      title: 'title',
    }
  }
})
    
