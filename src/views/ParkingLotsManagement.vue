<template>
  <div>
    <div>
      <ParkingLotsTable></ParkingLotsTable>
      <ParkingLotsPagination></ParkingLotsPagination>
    </div>
  </div>
</template>

<script>
import ParkingLotsTable from "../components/ParkingLotsTable.vue";
import ParkingLotsPagination from "../components/ParkingLotsPagination.vue";
export default {
  name: "parking-lots-management",
  components: {
    ParkingLotsTable,
    ParkingLotsPagination
  }
};
</script>
