<template>
  <div class="about">
    <el-table
      :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
      border
      :highlight-current-row=true
      style="width: 100%" 
      :row-style="{'font-size':'14px', height:'65px'}"
      :default-sort="{prop:'id'}"
      :header-cell-style="{color:'black', 'font-size':'16px', 'padding-left':'10px'}"
      :cell-style="{'padding-left':'10px'}"
    >
      <el-table-column prop="id" label="id"></el-table-column>
      <el-table-column prop="carNumber" label="车牌号"></el-table-column>
      <el-table-column prop="oprType" label="类型"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="{row}">
          <el-button type="text" v-if="row.status==='无人处理'">指派</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :total="tableData.length"
      :page-size="pagesize"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "OrderPage",
  data() {
    return {
      pagesize: 10,
      currpage: 1,
      tableData: [
        {
          id: "1",
          carNumber: "粤A123456",
          oprType: "取车",
          status: "无人处理"
        },
        {
          id: "2",
          carNumber: "粤A123456",
          oprType: "取车",
          status: "无人处"
        },
        {
          id: "3",
          carNumber: "粤A123456",
          oprType: "取车",
          status: "无人处理"
        },
        { id: "4", carNumber: "粤A123456", oprType: "取车", status: "无人处理" }
      ]
    };
  },
  methods: {
    handleCurrentChange(cpage) {
      this.currpage = cpage;
    }
  }
};
</script>