<template>
  <div class="container">
    <div>
      <el-button @click="dialogFormVisible = true" class="userBtn">Add</el-button>
    </div>

    <div class="tab-box">
      <el-table
        :data="tableData"
        style="width: 100%"
        @expand-change="openTransfer"
        :expand-row-keys="expands"
        :row-key="(row) => row.id"
      >
        <el-table-column align="center" type="expand">
          <template style="display: flex;">
            <el-transfer
              v-model="value"
              :props="{
                key: 'id',
                label: 'label'
              }"
               filterable
              :filter-method="filterMethod"
              filter-placeholder="请输入搜索内容"
              :titles="['可选停车场', '管理的停车场']"
              @change="handleChange"
              :data="parkingLots">
            </el-transfer>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="id" label="id"/>
        <el-table-column align="center" prop="name" label="姓名" />
        <el-table-column align="center" prop="phone" label="电话" />
        <el-table-column align="center" prop="isWork" label="状态">
          <template slot-scope="props">
            <span v-text="props.row.work ? '上班' : '下班'" />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template>
            <el-button size="mini">修改</el-button>
            <el-button type="danger" size="mini">注销</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="page-box">
      <el-pagination
        background
        :total="count"
        :page-size="pageSize"
        :page-sizes="pageSizes"
        :current-page.sync="page"
        @current-change="pageChange"
        @size-change="pageSizeChange"
        layout="prev, pager, next"
      />
    </div>
  </div>
</template>

<script>
import userApi from '../../apis/userApi';
import parkingLotApi from '../../apis/parkingLot';

export default {
  data() {
    return {
      page: 1,
      count: 0,
      rules: {},
      pageSize: 10,
      tableData: [],
      pageSizes: [10, 20, 50],
      value: [],
      expands: [],
      allParkingLots: []
    };
  },
  async created() {
    this.refreshPage();
    this.allParkingLots = (await parkingLotApi.getAll()).AllParkingLot;
  },
  methods: {
    async refreshPage() {
      const data = await userApi.getParkingBoyPage(this.page, this.pageSize);
      this.count = data.totalElements;
      this.tableData = data.content;
    },
    pageChange(page) {
      this.page = page;
      this.refreshPage();
    },
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.refreshPage();
    },
    async openTransfer(row, rows) {
      if (rows.length) {
        this.expands = [];
        this.expands.push(row.id);
        this.value = (await userApi.getParkingLotsByUserId(row.id)).map(item => item.id);
      } else {
        this.expands = [];
      }
    },
    async handleChange(value, direction, movedKeys) {
      if (value.length > 3) {
        this.$message.warning('停车员不能管理超过三个停车场');
        this.value = (await userApi.getParkingLotsByUserId(this.expands[0])).map(item => item.id);
        return ;
      }
      if (direction === 'left') {
        await userApi.leavingParkingLots(this.expands[0], movedKeys);
      } else if (this.expands.length){
        await userApi.appointParkingLots(this.expands[0], movedKeys);
      }
    },
    filterMethod(query, item) {
      if (query) {
        return item.name.indexOf(query) > -1;
      }
      return true;
    }
  },
  computed: {
    parkingLots() {
      return this.allParkingLots
        .filter(parkingLot => !parkingLot.manager || (this.expands.length && parkingLot.manager === this.expands[0]))
        .map(parkingLot => {
          let o = Object.assign({}, parkingLot);
          o.label = `${parkingLot.name} (${parkingLot.size})`;
          return o;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.tab-box {
  /deep/ .el-transfer {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.page-box {
  margin: 20px;
  text-align: center;
}

.userBtn {
  float: left;
  background-color: #409eff;
  color: white;
  margin: 20px;
}
</style>
