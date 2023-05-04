export enum INPUT_TYPES {
  URL = "url",
  DESCRIPTION = "description",
}

export interface Bookmark {
  id: number;
  url: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export type Bookmarks = Bookmark[];

export interface GetBookmarks {
  bookmarks: Bookmark[];
}

export interface PostBookmarksProps {
  description: string;
  url: string;
}

export type PostBookmarks = Bookmark;

export interface DeleteBookmarkProps {
  bookmark_id: number;
}

export interface DeleteBookmark {
  id?: number;
  message?: string;
}
