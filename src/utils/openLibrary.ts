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
  title: string;
  cover_i?: number; // Optional if not all books have covers
  key: string;
};

type OpenLibraryResponse = { docs: BookType[] } | { works: BookType[] } | null;

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

async function openLibraryClient(query: string): Promise<OpenLibraryResponse> {
  // API returns 'docs' when using search endpoint and 'works' when using trending/daily
  try {
    const response = await fetch(query, options);
    const data = await response.json();
    if ("docs" in data || "works" in data) {
      return data; // Explicitly return the data if it contains "docs" or "works".
    }
    return null; // Return null if "docs" is not in the response.
  } catch (error) {
    console.error("Error:", error);
    return null; // Return null in case of an error.
  }
}
