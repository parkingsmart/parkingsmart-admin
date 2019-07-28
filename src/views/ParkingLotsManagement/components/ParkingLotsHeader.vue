<template>
  <div>
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
    <div>
      <el-dialog title="新建停车场" :visible.sync="dialogVisible" width="30%">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
          <el-form-item label="停车场名字" prop="name">
            <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="停车场容量" prop="size">
            <el-input type="text" v-model="ruleForm.size" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelModal('ruleForm')">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import parkingLotApi from "../../../apis/parkingLot.js";
import requestHandler from "../../../utils/requestHandler.js";
export default {
  name: "parking-lots-header",
  props: ["tableData"],
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入停车场名字"));
      } else if (this.isNameIncluded(value)) {
        callback(new Error("已存在该停车场"));
      } else {
        callback();
      }
    };
    var validateSize = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入停车场容量"));
      } else if (!this.isSizeValid(value)) {
        callback(new Error("请输入合法的停车场容量"));
      } else {
        callback();
      }
    };
    return {
      input: "",
      value: "",
      ruleForm: {
        name: "",
        size: ""
      },
      checked: false,
      options: [{ value: 1, label: 1 }],
      dialogVisible: false,
      rules: {
        name: [{ validator: validateName, trigger: "blur" }],
        size: [{ validator: validateSize, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.dialogVisible = false;
          let data = {
            name: this.ruleForm.name,
            size: this.ruleForm.size,
            active: true,
            parkedNum: 0
          };
          await requestHandler
            .invoke(parkingLotApi.postAParkingLot(data))
            .loading()
            .exec();
          this.$emit("refreshTableData");
          this.$refs[formName].resetFields();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    cancelModal(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false;
    },
    isNameIncluded(formName) {
      let bool = false;
      this.tableData.forEach(element => {
        if (element.name === formName) {
          bool = true;
        }
      });
      return bool;
    },
    isSizeValid(formName) {
      return Number.isInteger(Number(formName));
    }
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
