import {UserIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const genre = defineType({
  name: 'genre',
  title: 'Genre',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
],
preview:{
    select: {
       title: 'name', 
    }
    }
})
    
