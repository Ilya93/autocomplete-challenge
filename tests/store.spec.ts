import { describe, expect, it } from "vitest";
import { books, cities } from "../src/data/data";
import store from "../src/store/index";
import { Book } from "../src/types/types";

// Tests for mutations
describe("Store mutations", () => {
  it("sets cities search results", () => {
    const results = ["san francisco", "san jose"];
    store.commit("setCitiesSearchResults", results);
    expect(store.state.searchResults.cities).toEqual(results);
  });

  it("sets books search results", () => {
    const results: Book[] = [
      { title: "Don Quixote", author: "Miguel De Cervantes" },
      { title: "Gulliver's Travels", author: "Jonathan Swift" },
    ];
    store.commit("setBooksSearchResults", results);
    expect(store.state.searchResults.books).toEqual(results);
  });
});

// Tests for actions
describe("Store actions", () => {
  it("searches cities correctly", async () => {
    await store.dispatch("searchCities", "san");
    const results = cities.filter((city) => city.toLowerCase().includes("san"));
    expect(store.state.searchResults.cities).toEqual(results);
  });

  it("searches books correctly", async () => {
    await store.dispatch("searchBooks", "don");
    const results = books.filter((book) =>
      book.title.toLowerCase().includes("don")
    );
    expect(store.state.searchResults.books).toEqual(results);
  });
});

// Tests for getters
describe("Store getters", () => {
  it("gets cities search results", () => {
    const results = ["san Francisco", "san jose"];
    store.commit("setCitiesSearchResults", results);
    expect(store.getters.getCitiesSearchResults).toEqual(results);
  });

  it("gets books search results", () => {
    const results: Book[] = [
      { title: "Don Quixote", author: "Miguel De Cervantes" },
      { title: "Gulliver's Travels", author: "Jonathan Swift" },
    ];
    store.commit("setBooksSearchResults", results);
    expect(store.getters.getBooksSearchResults).toEqual(results);
  });
});
