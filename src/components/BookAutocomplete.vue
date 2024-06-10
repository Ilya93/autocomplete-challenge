<template>
  <Autocomplete
    @search="handleSearch"
    :searchResults="booksResults"
    placeholder="Search book"
  >
    <template #result="{ result }">
      <strong>{{ result.title }}</strong> by {{ result.author }}
    </template>
  </Autocomplete>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import Autocomplete from "./CoreAutocomplete.vue";

const store = useStore();

const booksResults = computed(() => store.getters.getBooksSearchResults);

const handleSearch = (query: string) => {
  store.dispatch("searchBooks", query);
};
</script>
