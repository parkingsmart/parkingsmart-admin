<template>
  <div class="about">
    <el-table
      :data="orders"
      :highlight-current-row="true"
      style="width: 100%"
      :default-sort="{prop:'id'}"
    >
      <el-table-column align="center" prop="id" label="订单号"></el-table-column>
      <el-table-column align="center" prop="carNumber" label="车牌号"></el-table-column>
      <el-table-column align="center" prop="userId" label="用户ID"></el-table-column>
      <el-table-column align="center" prop="appointAddress" label="交付地点"></el-table-column>
      <el-table-column align="center" prop="createAt" :formatter="dateFormat" label="开始时间"></el-table-column>
      <el-table-column align="center" prop="appointTime" :formatter="dateFormat" label="预约时间"></el-table-column>
      <el-table-column align="center" prop="endAt" :formatter="dateFormat" label="结束时间"></el-table-column>
      <el-table-column align="center" prop="parkingLotId" label="停车场ID"></el-table-column>
      <el-table-column align="center" prop="status" label="状态">
        <template slot-scope="{row}">
          <span>{{ getStatus(row.status) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作">
        <template slot-scope="{row}">
          <el-button size="mini" v-if="row.status===0">指派</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin: 20px;text-align: center;"
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
    this.requestOrder(1);
  },
  methods: {
    handleCurrentChange(cpage) {
      this.currpage = cpage;
      this.requestOrder(cpage);
    },
    getStatus(status) {
      let result;
      switch (status) {
      case 0:
        result = "无人处理";
        break;
      case 1:
        result = "停车中";
        break;
      case 2:
        result = "已停车";
        break;
      case 3:
        result = "取车中";
        break;
      case 4:
        result = "已完成";
        break;
      default:
        break;
      }
      return result;
    },
    async requestOrder(page) {
      const response = await RequestHandler.invoke(
        OrderPageApi.getAllOrders(page)
      )
        .msg()
        .loading()
        .exec();
      this.orders = response.orders;
      this.number = response.AllOrdersNum;
      console.log(this.orders);
    },
    dateFormat: function(row, column) {
      if (row[column.property] !== null) {
        let date = new Date(row[column.property]);
        let theDate = date
          .toLocaleString()
          .replace(/上午/, "")
          .replace(/下午/, "")
          .replace('/', "-")
          .replace('/', "-");
        return theDate;
      }
    }
  }
};
</script>