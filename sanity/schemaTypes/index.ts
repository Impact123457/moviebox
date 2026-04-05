import { type SchemaTypeDefinition } from 'sanity';
import { user } from "@/sanity/schemaTypes/user";
import { directior } from './director';
import { movie } from './movie';
import { genre } from './genre';
import { comment } from './comment';
import { liked } from './liked';
import { watched } from './watched';
import { watchList } from './watchList';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [user, directior, movie, genre, comment, liked, watched, watchList],
}
