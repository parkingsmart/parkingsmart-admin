<template>
  <div>
    <div>
      <ParkingLotsHeader @refreshTableData="refreshTableData"></ParkingLotsHeader>
      <el-table :data="tableData" :row-class-name="tableRowClassName" :highlight-current-row="true">
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="name" label="名字"></el-table-column>
        <el-table-column prop="size" label="大小">
          <template slot-scope="scope">
            <input v-if="scope.$index===currIndex" v-model="sizeInput" style="width:100px" />
            <span v-else>{{ tableData[scope.$index].size }} </span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" :disabled="!scope.row.active" @click="editParkingLot(scope.$index, scope.row)">{{ (scope.$index===currIndex)? '完成':'修改' }}</el-button>
            <el-button size="mini" :disabled="!scope.row.active" @click="logoutParkingLot(scope.$index, scope.row)">注销</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          background
          :page-size="pageSize"
          :total="totalPage"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import parkingLotApi from "../../apis/parkingLot.js";
import requestHandler from "../../utils/requestHandler.js";
import ParkingLotsHeader from "./components/ParkingLotsHeader.vue";
//import { fips } from 'crypto';
export default {
  name: "parking-lots-management",
  components: {
    ParkingLotsHeader
  },
  async created() {
    const tableData = await requestHandler
      .invoke(parkingLotApi.getAll())
      .loading()
      .exec();
    this.tableData = tableData.AllParkingLot;
    this.totalPage = tableData.AllParkingLotsNum;
  },
  data() {
    return {
      tableData: [],
      isEdit: false,
      sizeInput: "",
      editBtn: "修改",
      totalPage: 0,
      pageSize: 10,
      currIndex: -1
    };
  },
  methods: {
    tableRowClassName({ rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    editParkingLot(index, data) {
      if (! this.isEdit) {
        this.isEdit = true;
        this.currIndex = index;
      } else {
        this.isEdit = false;
        this.currIndex = -1;
        this.tableData[index].size = 0;
        if(Number.isInteger(Number(this.sizeInput))){
          this.tableData[index].size = Number(this.sizeInput);
        }
        this.putAParkingLotInfo(data);
        this.sizeInput = "";
      }
    },
    logoutParkingLot(index, data) {
      data.active = false;
      this.putAParkingLotInfo(data);
    },
    async putAParkingLotInfo(data) {
      await requestHandler
        .invoke(parkingLotApi.putAParkingLot(data.id, data))
        .loading()
        .exec();
    },
    async refreshTableData() {
      const tableData = await requestHandler
        .invoke(parkingLotApi.getAll())
        .loading()
        .exec();
      this.tableData = tableData.AllParkingLot;
    },
    async handleCurrentChange(page) {
      const tableData = await requestHandler
        .invoke(parkingLotApi.getAll(page))
        .loading()
        .exec();
      this.tableData = tableData.AllParkingLot;
    }
  }
};
</script>
<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>` `