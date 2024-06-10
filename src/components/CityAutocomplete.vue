<template>
  <Autocomplete
    ref="citiesAutocomplete"
    @search="handleSearch"
    :searchResults="citiesResults"
    placeholder="Search city"
  >
    <template #result="{ result }">
      {{ result }}
    </template>
  </Autocomplete>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import Autocomplete from "./CoreAutocomplete.vue";

const citiesAutocomplete = ref();
const store = useStore();

const citiesResults = computed(() => store.getters.getCitiesSearchResults);

const handleSearch = (query: string) => {
  store.dispatch("searchCities", query);
};

onMounted(() => {
  const input = citiesAutocomplete.value?.$refs.inputRef;
  input?.focus();
});
</script>
