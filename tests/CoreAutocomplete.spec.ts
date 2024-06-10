import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach } from "vitest";
import Autocomplete from "../src/components/CoreAutocomplete.vue";

describe("CoreAutocomplete.vue", () => {
  let wrapper: ReturnType<typeof mount>;

  beforeEach(() => {
    wrapper = mount(Autocomplete, {
      props: {
        searchResults: [],
        placeholder: "Search...",
      },
      slots: {
        result: `<template #result="{ result }">
                  {{ result }}
                </template>`,
      },
    });
  });

  it("emits search event with correct query", async () => {
    const input = wrapper.find("input");
    await input.setValue("san");
    await input.trigger("input");

    expect(wrapper.emitted().search).toBeTruthy();
    expect(wrapper.emitted().search[0]).toEqual(["san"]);
  });

  it("displays search results correctly", async () => {
    await wrapper.setProps({
      searchResults: ["san francisco", "san jose"],
    });

    const input = wrapper.find("input");
    await input.setValue("san");
    await input.trigger("input");

    await wrapper.vm.$nextTick();

    const results = wrapper.findAll("li");
    expect(results).toHaveLength(2);
    expect(results[0].text()).toBe("san francisco");
    expect(results[1].text()).toBe("san jose");
  });

  it('displays "enter at least 3 characters" message appropriately', async () => {
    const input = wrapper.find("input");

    // Before typing
    expect(wrapper.text()).not.toContain("Enter at least 3 characters");

    // After typing less than 3 characters
    await input.setValue("sa");
    await input.trigger("input");
    expect(wrapper.text()).toContain("Enter at least 3 characters");

    // After typing 3 or more characters
    await input.setValue("san");
    await input.trigger("input");
    expect(wrapper.text()).not.toContain("Enter at least 3 characters");
  });

  it("shows and hides the panel appropriately", async () => {
    const input = wrapper.find("input");

    // Show panel when input has focus and value length >= 3
    await input.setValue("San");
    await input.trigger("input");
    await wrapper.vm.$nextTick();

    let panel = wrapper.find(".autocomplete-panel");
    expect(panel.exists()).toBe(true);
    expect(panel.isVisible()).toBe(true);

    // Hide panel when clicking outside
    document.body.click();
    await wrapper.vm.$nextTick();

    panel = wrapper.find(".autocomplete-panel");
    expect(panel.exists()).toBe(false);
  });
});
