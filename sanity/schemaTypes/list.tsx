import {GenerateIcon, UserIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const list = defineType({
  name: 'list',
  title: 'List',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
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
    
