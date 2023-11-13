<template>
  <h1 class="page-title mb-10">Unit Detail Page</h1>

  <div class="unit-details">
    <v-row class="detail-row" v-for="(value, key) in unit" :key="key">
      <template v-if="key === 'cost'">
        <template v-for="(costValue, costKey) in value" :key="costKey">
          <v-col cols="3" class="detail-row-col">{{ costKey }} Cost:</v-col>
          <v-col cols="9" class="detail-row-col">{{ costValue }}</v-col>
        </template>
      </template>

      <template v-else>
        <v-col cols="3" class="detail-row-col">{{ getDisplayFieldName(key) }}:</v-col>
        <v-col cols="9" class="detail-row-col">
          {{ value.toString() }}
        </v-col>
      </template>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "UnitDetails",
  props: {
    unit: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    getDisplayFieldName(fieldName) {
      return fieldName
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
  }
};
</script>

<style lang="scss" scoped>
.page-title {
  text-align: center;
}

.detail-row-col {
  border: 1px solid;
  word-break: break-all;
}
</style>
