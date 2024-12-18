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

export type BookType = {
  covers?: number[];
  title: string;
  cover_i?: number; // Optional if not all books have covers
  key: string;
};

type OpenLibraryResponse = { docs: BookType[] } | { works: BookType[] } | null; //TODO: consolidate the client for flexibility

export const searchForBooks = async (
  setBooks: React.Dispatch<React.SetStateAction<BookType[]>>,
  query: string,
  limit: number = 3
): Promise<void> => {
  const response = await openLibraryClient(
    baseUrl + `search.json?q=${query}&limit=${limit}`
  );
  if (response && "docs" in response) {
    setBooks(response.docs); // Use the fetched "docs" to update state.
  } else {
    console.error("No books found or failed to fetch data");
  }
};

// Could be incorporated into searchForBooks function to be less repetitive, but I believe this is more readable.
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
  setBook(response);
  /*   if (response && "works" in response) {
    //setBook(response.works);
  } else {
    console.error("No books found or failed to fetch data");
  } */
};

async function openLibraryClient(query: string): Promise<OpenLibraryResponse> {
  // API returns 'docs' when using search endpoint and 'works' when using trending/daily
  try {
    const response = await fetch(query, options);
    const data = await response.json();
    console.log(data);
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
