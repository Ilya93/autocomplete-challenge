<template>
  <div class="autocomplete flex justify-center">
    <input
      class="search-input w-2/6"
      type="text"
      :placeholder="placeholder"
      ref="inputRef"
      v-model="inputValue"
      @input="handleInput"
    />

    <div ref="panel">
      <div v-if="showPanel" class="autocomplete-panel">
        <ul class="w-2/6">
          <div v-if="inputValue.length >= 3">
            <li v-for="(result, index) in searchResults" :key="index">
              <slot name="result" :result="result"></slot>
            </li>
            <li v-if="searchResults.length === 0">No results found</li>
          </div>
          <li v-if="inputValue.length < 3">Enter at least 3 characters</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";

const props = defineProps<{
  searchResults: any[];
  placeholder: string;
}>();
const emit = defineEmits<{
  search: [query: string];
}>();

const inputRef = ref<HTMLInputElement | null>(null);
const inputValue = ref("");
const showPanel = ref(false);
const panel = ref(null);

const handleInput = () => {
  showPanel.value = true;
  if (inputValue.value.length >= 3) {
    emit("search", inputValue.value);
  }
};

onClickOutside(panel, (event) => {
  if (!(event.target as HTMLInputElement).classList.contains("search-input")) {
    showPanel.value = false;
  }
});
</script>

<style scoped>
.search-input {
  font-size: 1rem;
  color: #334155;
  background: #ffffff;
  padding: 0.5rem 0.75rem;
  border: 1px solid #cbd5e1;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s,
    box-shadow 0.2s, outline-color 0.2s;
  appearance: none;
  border-radius: 6px;
  outline-color: transparent;
}
.search-input:focus {
  outline: 1px solid #10b981;
  outline-offset: -1px;
  box-shadow: none;
  border-color: #94a3b8;
}
.autocomplete-panel ul {
  background: #ffffff;
  color: #334155;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.1);
}
.autocomplete {
  position: relative;
}
.autocomplete-panel ul {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: white;
  border: 1px solid #ccc;
  z-index: 1;
  margin-top: 2px;
}
.autocomplete-panel li {
  padding: 5px;
}
</style>
