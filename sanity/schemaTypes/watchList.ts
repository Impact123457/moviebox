import {defineArrayMember, defineField, defineType} from 'sanity';

export const watchList = defineType({
  name: 'watchList',
  title: 'WatchList',
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
    
