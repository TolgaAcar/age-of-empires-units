<template>
  <div class="unit-list">
    <v-data-table
      class="pa-5"
      theme="dark"
      :headers="headers"
      :items="filteredUnitList"
      sticky
      hover
      items-per-page="-1"
    >
      <template v-slot:item="{ item }">
        <tr @click="onRowClick(item.id)">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.age }}</td>
          <td>{{ getTotalCostOfUnit(item) }}</td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useUnitsStore } from "../../stores/units";
import { Headers } from "../../constants/TableHeaders";
import { CostTypes } from "../../constants/CostTypes";

export default {
  name: "UnitList",
  computed: {
    headers() {
      return Headers;
    },
    filteredUnitList() {
      return this.units.filter((unit) => {
        // Check if the unit passes both the age and cost type filters
        const passesAgeFilter = this.ageFilter === "All" || unit.age === this.ageFilter;

        let passesCostFilter;

        if (this.filteredCostTypes.length === 0) {
          passesCostFilter = true;
        } else {
          passesCostFilter =
            unit.cost &&
            this.filteredCostTypes.every((costType) => {
              const unitCost = unit.cost[costType];

              // Check if the cost type is present in the unit's cost property
              if (unitCost === undefined) {
                return false;
              }

              const minRange = this.filteredCostRanges[costType][0];
              const maxRange = this.filteredCostRanges[costType][1];
              return unitCost >= minRange && unitCost <= maxRange;
            });
        }

        return passesAgeFilter && passesCostFilter;
      });
    },
    ...mapState(useUnitsStore, ["units", "ageFilter", "filteredCostTypes", "filteredCostRanges"])
  },
  methods: {
    getTotalCostOfUnit(item) {
      const totalCostArray = CostTypes.map((type) => this.getCostType(item, type));

      return totalCostArray.filter(Boolean).join(", ");
    },
    getCostType(item, costType) {
      return item.cost && item.cost[costType] ? `${costType}: ${item.cost[costType]}` : "";
    },
    onRowClick(itemId) {
      this.$router.push({ name: "UnitDetails", params: { id: itemId } });
    }
  }
};
</script>
