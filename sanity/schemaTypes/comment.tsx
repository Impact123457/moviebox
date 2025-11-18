import {defineArrayMember, defineField, defineType} from 'sanity'

export const comment = defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    defineField({
      name: 'user',
      type: 'reference',
      to: {type: 'user'},
    }),
    defineField({
      name: 'text',
      type: 'text',
    }),
],
preview:{
    select: {
       title: 'name', 
    }
    }
})
    
