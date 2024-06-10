<template>
  <div
    id="app"
    class="flex flex-col gap-y-4 justify-center content-center w-full mt-60"
  >
    <div class="flex flex-col gap-y-4 justify-center">
      <h1 class="text-center font-bold text-2xl">Autocomplete</h1>
      <CityAutocomplete ref="firstAutocomplete" />
      <BookAutocomplete />
    </div>
  </div>
</template>

<script setup lang="ts">
import CityAutocomplete from "./components/CityAutocomplete.vue";
import BookAutocomplete from "./components/BookAutocomplete.vue";
</script>
