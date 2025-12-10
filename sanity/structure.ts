import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem("user").title("User"),
      S.documentTypeListItem("movie").title("Movie"),
      S.documentTypeListItem("genre").title("Genre"),
      S.documentTypeListItem("director").title("Director"),
      S.documentTypeListItem("comment").title("Comment"),
      S.documentTypeListItem("liked").title("Liked"),
      S.documentTypeListItem("watched").title("Watched"),
      S.documentTypeListItem("diary").title("Diary")
    ])
