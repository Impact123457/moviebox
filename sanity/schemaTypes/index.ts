import { type SchemaTypeDefinition } from 'sanity';
import { user } from "@/sanity/schemaTypes/user";
import { directior } from './director';
import { movie } from './movie';
import { genre } from './genre';
import { list } from './list';
import { comment } from './comment';


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [user, directior, movie, genre, list, comment],
}
