<template>
  <div class="about">
    <el-table
      :data="orders"
      border
      :highlight-current-row="true"
      style="width: 100%"
      :row-style="{'font-size':'14px', height:'65px'}"
      :default-sort="{prop:'id'}"
      :header-cell-style="{color:'black', 'font-size':'16px', 'padding-left':'10px'}"
      :cell-style="{'padding-left':'10px'}"
    >
      <el-table-column prop="id" label="id"></el-table-column>
      <el-table-column prop="carNumebr" label="车牌号"></el-table-column>
      <el-table-column prop="type" label="类型">
        <template slot-scope="{row}">
          <span>{{ getType(row.type) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="{row}">
          <span>{{ getStatus(row.status) }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="{row}">
          <el-button type="text" v-if="row.status===0">指派</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :total="number"
      :page-size="pagesize"
    ></el-pagination>
  </div>
</template>

<script>
import RequestHandler from "../utils/requestHandler";
import OrderPageApi from "../apis/orderPageApi";

export default {
  name: "OrderPage",
  data() {
    return {
      pagesize: 10,
      currpage: 1,
      orders: [],
      number: 0
    };
  },
  async created() {
    this.requestOrder(1,true);
  },
  methods: {
    handleCurrentChange(cpage) {
      this.currpage = cpage;
      this.requestOrder(cpage,false);
    },
    getType(type) {
      return type === 1 ? "取车" : "存车";
    },
    getStatus(status) {
      return status === 2 ? "已完成" : status === 1 ? "存取中" : "无人处理";
    },
    async requestOrder(page, isFirst) {
      let response;
      if (isFirst) {
        response = await RequestHandler.invoke(OrderPageApi.getAllOrders())
          .msg()
          .loading()
          .exec();
      } else {
        response = await RequestHandler.invoke(OrderPageApi.getAllOrders(page))
          .msg()
          .loading()
          .exec();
      }
      this.orders = response.pageOrders;
      this.number = response.AllOrdersNum;
      console.log(response);
    }
  }
};
</script>