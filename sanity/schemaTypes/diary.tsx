import {defineArrayMember, defineField, defineType} from 'sanity';

export const diary = defineType({
  name: 'diary',
  title: 'Diary',
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
    
