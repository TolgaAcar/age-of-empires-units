<template>
  <div class="age-filter mb-10">
    <h3 class="mb-5">Ages</h3>

    <v-btn
      v-for="(age, index) in ages"
      :key="`age-btn${index}`"
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
import { mapActions } from "pinia";
import { useUnitsStore } from "../../stores/units";
import { Ages } from "../../constants/Ages";

export default {
  name: "AgeFilter",
  data() {
    return {
      selectedAge: Ages[0].value
    };
  },
  computed: {
    ages() {
      return Ages;
    }
  },
  methods: {
    onAgeButtonClick(age) {
      this.selectedAge = age.value;
    },
    isButtonSelected(age) {
      return this.selectedAge === age.value;
    },
    ...mapActions(useUnitsStore, ["setAgeFilter"])
  },
  watch: {
    selectedAge(val) {
      this.setAgeFilter(val);
    }
  }
};
</script>

<style></style>
