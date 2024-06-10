import { createStore } from "vuex";
import { State, Book } from "../types/types";
import { cities, books } from "../data/data";

export default createStore<State>({
  devtools: true,
  state: {
    cities,
    books,
    searchResults: {
      cities: [],
      books: [],
    },
  },
  mutations: {
    setCitiesSearchResults(state, results: string[]) {
      state.searchResults.cities = results;
    },
    setBooksSearchResults(state, results: Book[]) {
      state.searchResults.books = results;
    },
  },
  actions: {
    searchCities({ commit }, query: string) {
      const results = cities.filter((city) =>
        city.toLowerCase().includes(query.toLowerCase())
      );
      commit("setCitiesSearchResults", results);
    },
    searchBooks({ commit }, query: string) {
      const results = books.filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase())
      );
      commit("setBooksSearchResults", results);
    },
  },
  getters: {
    getCitiesSearchResults: (state) => state.searchResults.cities,
    getBooksSearchResults: (state) => state.searchResults.books,
  },
});
