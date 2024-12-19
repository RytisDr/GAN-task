import { Dispatch, SetStateAction } from "react";

// CONFIGS
const baseUrl = "https://openlibrary.org/";
// Recommended headers for Open Library API (might contact for usage limits)
const headers = new Headers({
  "User-Agent": "TestApp/1.0 (me@rtsdr.com)",
});

const options = {
  method: "GET",
  headers: headers,
};

type BookDescription = string | { type: string; value: string } | null;

export type BookType = {
  description: BookDescription;
  covers?: number[];
  title: string;
  cover_i?: number;
  key: string;
};

type OpenLibraryResponse =
  | { docs: BookType[] }
  | { works: BookType[] }
  | BookType // Single book for `works/:id`
  | null;

export const searchForBooks = async (
  setBooks: React.Dispatch<React.SetStateAction<BookType[]>>,
  query: string,
  limit: number = 3
): Promise<void> => {
  const response = await openLibraryClient(
    baseUrl + `search.json?q=${query}&limit=${limit}`
  );
  if (response && "docs" in response) {
    setBooks(response.docs);
  } else {
    console.error("No books found or failed to fetch data");
  }
};

export const getTrendingBooks = async (
  setBooks: React.Dispatch<React.SetStateAction<BookType[]>>,
  limit: number = 3
): Promise<void> => {
  const response = await openLibraryClient(
    baseUrl + `trending/daily.json?limit=${limit}`
  );
  if (response && "works" in response) {
    setBooks(response.works);
  } else {
    console.error("No books found or failed to fetch data");
  }
};

export const getBook = async (
  setBook: Dispatch<SetStateAction<BookType | null>>,
  id: string
): Promise<void> => {
  const response = await openLibraryClient(baseUrl + `works/${id}.json`);
  if (response && "title" in response) {
    setBook(response);
  } else {
    console.error("No book found or failed to fetch data");
  }
};

async function openLibraryClient(query: string): Promise<OpenLibraryResponse> {
  try {
    const response = await fetch(query, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null; // Return null in case of an error.
  }
}

// Removes the "/works/" or any prefix ending with "/" prefix from a book key.
export function removePrefix(key: string): string {
  const lastSlashIndex = key.lastIndexOf("/");
  return lastSlashIndex !== -1 ? key.slice(lastSlashIndex + 1) : key;
}

// Aims to fix messy API return for description to use in book details
export function getBookDescription(description: BookDescription): string {
  if (typeof description === "object" && description?.value) {
    return description.value;
  }
  if (typeof description === "string") {
    return description;
  }
  return "No description available";
}
