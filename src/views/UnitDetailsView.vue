<template>
  <div class="unit-details">
    <UnitDetails v-if="unitDetails" :unit="unitDetails" />

    <h1 v-else>Unit not found</h1>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useUnitsStore } from "../stores/units";
import UnitDetails from "../components/Units/UnitDetails.vue";
import getUnitsData from "../module/UnitBusines";

export default {
  name: "UnitDetailsView",
  components: {
    UnitDetails
  },
  created() {
    this.checkUnitsList();
  },
  computed: {
    unitDetails() {
      return this.getUnitById(+this.$route.params.id);
    },
    ...mapState(useUnitsStore, ["units"])
  },
  methods: {
    checkUnitsList() {
      if (!this.units.length) {
        this.initializeUnitsData();
      }
    },
    initializeUnitsData() {
      const unitsData = getUnitsData();
      this.setUnits(unitsData);
    },
    ...mapActions(useUnitsStore, ["getUnitById", "setUnits"])
  }
};
</script>
