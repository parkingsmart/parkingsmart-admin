<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="id"></el-table-column>
      <el-table-column prop="name" label="名字"></el-table-column>
      <el-table-column prop="capacity" label="大小"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="editParkingLot(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" @click="logoutParkingLot(scope.$index, scope.row)">注销</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "parking-lots-table",
  data() {
    return {
      tableData: [
        {
          id: "1",
          name: "停车场A",
          capacity: "20"
        },
        {
          id: "2",
          name: "停车场b",
          capacity: "50"
        }
      ]
    };
  },
  methods: {
    editParkingLot(data) {
      console.log("修改" + data);
    },
    logoutParkingLot(data) {
      console.log("注销" + data);
    }
  }
};
</script>
