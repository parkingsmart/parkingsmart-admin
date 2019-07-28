<template>
  <div>
    <div>
      <ParkingLotsHeader></ParkingLotsHeader>
      <ParkingLotsTable></ParkingLotsTable>
      <ParkingLotsPagination></ParkingLotsPagination>
      <!-- <ParkingLotModal></ParkingLotModal> -->
    </div>
  </div>
</template>

<script>
// import ParkingLotModal from "../components/ParkingLotModal.vue";
import ParkingLotsTable from "./components/ParkingLotsTable.vue";
import ParkingLotsPagination from "./components/ParkingLotsPagination.vue";
import ParkingLotsHeader from "./components/ParkingLotsHeader.vue";
export default {
  name: "parking-lots-management",
  components: {
    ParkingLotsTable,
    ParkingLotsPagination,
    ParkingLotsHeader,
   // ParkingLotModal
  }
};
</script>
