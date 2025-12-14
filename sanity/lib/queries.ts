import {defineQuery} from "next-sanity";

export const USER_BY_GITHUB_ID_QUERY = defineQuery(
    `*[_type == "user" && id == $id][0]{
    _id,
    name,
    username,
    gmail,
    image,
    bio
    }`
);

export const USER_BY_ID_QUERY = defineQuery(
   `*[_type == "user" && _id == $id][0]{
  _id,
  id,
  surname,
  username,
  bio,
  email,
  password,  
  name,
  "image": image.asset->url,
}`);

export const USER_BY_EMAIL_QUERY = defineQuery(
   `*[_type == "user" && email == $email][0]{
  _id,  
  name,
  surname,
  username,
  bio,
  email,
  password,
  "image": image.asset->url,
}`
);

export const CHECK_FOR_EXISTING_USER = `*[_type == "author" && email == $email][0]`;

export const MOVIE_BY_ID_QUERY = `
*[_type == "movie" && _id == $id][0]{
  _id,
  title,
  release,
  description,
   genre[]->{
    _id,
    name
    },
  director->{
    name,
    surname
  },
  "image": image.asset->url
}`;
export const MOVIE_QUERY = 
  defineQuery(`*[_type == "movie" && !defined($search) || title match $search] | order(_createdAt desc) {
    _id,
    title,
    release,
    description,
    genre ->{
    _id, name
    },
    director ->{
    name
    },
    "image": image.asset->url,
  }`);
  
export const LIKED_MOVIE = (userId: string) => `*[_type == "liked" && user._ref == "${userId}"]{
  movies[]->{
    _id,
    name,
    title,
    release,
    description,
    "image": image.asset->url,
    "genre": genre[]->name,
    "director": director->name
  }
}`

export const WATCHED_MOVIE = (userId: string) => `*[_type == "watched" && user._ref == "${userId}"]{
  movies[]->{
    _id,
    name,
    title,
    release,
    description,
    "image": image.asset->url,
    "genre": genre[]->name,
    "director": director->name
  }
}`

export const SEEN_MOVIE = (userId: string) => `*[_type == "diary" && user._ref == "${userId}"]{
  movies[]->{
    _id,
    name,
    title,
    release,
    description,
    "image": image.asset->url,
    "genre": genre[]->name,
    "director": director->name
  }
}`

export const USER_QUERY = 
  defineQuery(`*[_type == "movie"]{
    _id,
    name,
    username,
    gmail,
    bio,
    password,
    "image": image.asset->url,
  }`);

  export const LIKE_BY_USER_ID_QUERY = defineQuery(`
    *[_type == "liked" && user._ref == $userId][0]
  `);

  export const LIKE_BY_MOVIE_USER_ID_QUERY = defineQuery(`
    *[
      _type == "liked" &&
      references($id) &&
      user._ref == $userId
     ][0]
  `)

  export const WATCHED_BY_USER_ID_QUERY = defineQuery(`
    *[_type == "diary" && user._ref == $userId][0]
  `);

  export const WATCHED_BY_MOVIE_USER_ID_QUERY = defineQuery(`
    *[
      _type == "diary" &&
      references($id) &&
      user._ref == $userId
     ][0]
  `)//če je pravi user in če je že v arrayu

  export const WATCHLIST_BY_USER_ID_QUERY = defineQuery(`
    *[_type == "watch" && user._ref == $userId][0]
  `);

  export const WATCHLIST_BY_MOVIE_USER_ID_QUERY = defineQuery(`
    *[
      _type == "watch" &&
      references($id) &&
      user._ref == $userId
     ][0]
  `)