<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="3">
        <el-button
          type="primary"
          size="medium "
          @click="dialogVisible = true"
          class="parking-lots-header-add-btn"
        >新建</el-button>
      </el-col>
      <el-col :span="8" :offset="13">
        <div class="parking-lots-header-search">
          <el-select v-model="value" placeholder="选项一" style="width:150px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input v-model="input" style="width:150px"></el-input>
          <el-button type="primary" size="medium " suffix-icon="el-icon-search">搜索</el-button>
          <el-checkbox v-model="checked" label="复合搜索" border></el-checkbox>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "parking-lots-header",
  data() {
    return {
      input: "",
      value: "",
      checked: false,
      options: [{ value: 1, label: 1 }]
    };
  },
  methods: {
    
  }
};
</script>
<style>
.parking-lots-header-add-btn {
  float: left;
  margin: 20px;
}
.parking-lots-header-search {
  margin: 20px;
}
</style>
