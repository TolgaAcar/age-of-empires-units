<template>
  <div class="units-page">
    <h1 class="page-title mb-10">Units Page</h1>

    <div class="filters-wrapper">
      <AgeFilter />
      <CostFilter />
    </div>

    <div class="unit-list-wrapper">
      <UnitList />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useUnitsStore } from "../stores/units";
import getUnitsData from "../module/UnitBusines";
import UnitList from "../components/Units/UnitList.vue";
import AgeFilter from "../components/Filters/AgeFilter.vue";
import CostFilter from "../components/Filters/CostFilter.vue";

export default {
  name: "UnitsView",
  components: {
    UnitList,
    AgeFilter,
    CostFilter
  },
  created() {
    this.initializeUnitsData();
  },
  computed: {
    ...mapState(useUnitsStore, ["units"])
  },
  methods: {
    initializeUnitsData() {
      const unitsData = getUnitsData();
      this.setUnits(unitsData);
    },
    ...mapActions(useUnitsStore, ["setUnits"])
  }
};
</script>

<style lang="scss" scoped>
.page-title {
  text-align: center;
}
</style>
