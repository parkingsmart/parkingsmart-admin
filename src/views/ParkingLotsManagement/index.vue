<template>
  <div>
    <div>
      <ParkingLotsHeader></ParkingLotsHeader>
      <ParkingLotsTable></ParkingLotsTable>
      <ParkingLotsPagination></ParkingLotsPagination>
    </div>
  </div>
</template>

<script>
import ParkingLotsTable from "./components/ParkingLotsTable.vue";
import ParkingLotsPagination from "./components/ParkingLotsPagination.vue";
import ParkingLotsHeader from "./components/ParkingLotsHeader.vue";
export default {
  name: "parking-lots-management",
  components: {
    ParkingLotsTable,
    ParkingLotsPagination,
    ParkingLotsHeader,
  }
};
</script>
