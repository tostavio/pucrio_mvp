import {
  DeleteBookmark,
  DeleteBookmarkProps,
  GetBookmarks,
  PostBookmarks,
  PostBookmarksProps,
} from "./types";

const BASE_URL = "http://localhost:5000/";

export async function getBookmarks() {
  const endpoint = new URL("/bookmarks", BASE_URL);
  try {
    const response = await fetch(endpoint);
    return response.json() as Promise<GetBookmarks>;
  } catch (error) {
    alert(error);
  }
}

export async function postBookmarks({ url, description }: PostBookmarksProps) {
  const endpoint = new URL("/bookmark", BASE_URL);
  const formData = new FormData();
  formData.append("url", url);
  formData.append("description", description);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });
    return response.json() as Promise<PostBookmarks>;
  } catch (error) {
    alert(error);
  }
}

export async function deleteBookmark({ bookmark_id }: DeleteBookmarkProps) {
  const endpoint = new URL(`/bookmark?bookmark_id=${bookmark_id}`, BASE_URL);

  try {
    const response = await fetch(endpoint, {
      method: "DELETE",
    });
    return response.json() as Promise<DeleteBookmark>;
  } catch (error) {
    alert(error);
  }
}
