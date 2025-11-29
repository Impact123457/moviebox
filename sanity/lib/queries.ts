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
   `*[_type == "author" && email == $email][0]{
  _id,
  id,
  name,
  email,
  password,
  "image": image.asset->url,
  imageUrl
}`
);