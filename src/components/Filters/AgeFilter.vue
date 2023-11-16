<template>
  <div class="age-filter mb-10">
    <h3 class="mb-5" data-testid="age-filter-title">Ages</h3>

    <v-btn
      v-for="(age, index) in ages"
      :key="`age-btn${index}`"
      :id="`filter-${index}`"
      @click="onAgeButtonClick(age)"
      :color="isButtonSelected(age) ? 'var(--selected-link)' : ''"
      variant="outlined"
      rounded="0"
    >
      {{ age.name }}
    </v-btn>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useUnitsStore } from "../../stores/units";
import { Ages } from "../../constants/Ages";

export default {
  name: "AgeFilter",
  computed: {
    ages() {
      return Ages;
    },
    selectedAge: {
      set(value) {
        this.setAgeFilter(value);
      },
      get() {
        return this.ageFilter;
      }
    },
    ...mapState(useUnitsStore, ["ageFilter"])
  },
  methods: {
    onAgeButtonClick(age) {
      this.selectedAge = age.value;

      this.$emit("onAgeButtonClick", this.selectedAge); // Emit the event with the selected age for testing purposes
    },
    isButtonSelected(age) {
      return this.selectedAge === age.value;
    },
    ...mapActions(useUnitsStore, ["setAgeFilter"])
  }
};
</script>

<style></style>
