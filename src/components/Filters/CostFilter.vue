<template>
  <div class="cost-filter mb-10">
    <h3 class="mb-5">Costs</h3>

    <div class="cost-filter-wrapper">
      <div v-for="costType in costTypes" :key="costType">
        <v-row class="align-center mb-4">
          <v-col class="checkbox-wrapper" cols="2">
            <v-checkbox
              :label="costType"
              :value="costType"
              v-model="selectedCostTypes"
              color="var(--selected-link)"
              hide-details
            />
          </v-col>

          <v-col class="range-slider-wrapper">
            <v-range-slider
              :disabled="!selectedCostTypes.includes(costType)"
              v-model="costRanges[costType]"
              :max="200"
              :min="0"
              :step="1"
              thumb-label="always"
              color="var(--selected-link)"
              hide-details
              :data-testid="`range-slider${costType}`"
            />
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useUnitsStore } from "../../stores/units";
import { CostTypes } from "../../constants/CostTypes";

export default {
  name: "CostFilter",
  computed: {
    costTypes() {
      return CostTypes;
    },
    selectedCostTypes: {
      set(value) {
        this.setFilteredCostTypes(value);
      },
      get() {
        return this.filteredCostTypes;
      }
    },
    costRanges: {
      set(value) {
        this.setFilteredCostRanges(value);
      },
      get() {
        return this.filteredCostRanges;
      }
    },
    ...mapState(useUnitsStore, ["filteredCostTypes", "filteredCostRanges"])
  },
  methods: {
    ...mapActions(useUnitsStore, ["setFilteredCostTypes", "setFilteredCostRanges"])
  }
};
</script>

<style lang="scss" scoped>
.checkbox-wrapper {
  min-width: 110px;
}
.range-slider-wrapper {
  max-width: 350px;
}
</style>
