export type Book = {
  title: string;
  author: string;
};

export interface State {
  cities: string[];
  books: Book[];
  searchResults: {
    cities: string[];
    books: Book[];
  };
}
