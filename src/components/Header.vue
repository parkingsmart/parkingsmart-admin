<template>
  <div class="nav-container">
    <el-breadcrumb separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="item in items" :key="item.path" :to="item">{{item.meta.id}}</el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
    <div class="btn-container">
      <div class="avatar-container">
        <el-dropdown trigger="click">
          <div>
            <img
              class="user-avatar able"
              src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
            />
            <font-awesome-icon class="icon able" icon="angle-down" />
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <span>退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    items: {
      get() {
        return this.$route.matched.filter(item => item.meta.id);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.nav-container {
  width: 100%;
  height: 49px;
  display: flex;
  overflow: hidden;
  justify-content: space-between;
  border-bottom: 1px solid #d8dce5;

  /deep/ .el-breadcrumb {
    font-size: 14px;
    margin-left: 20px;
    line-height: 50px;
    display: inline-block;

    /deep/ .el-breadcrumb__inner {
      font-weight: 400;
    }
  }

  .btn-container {
    display: flex;
  }

  .avatar-container {
    height: 100%;
    display: flex;
    padding: 0 8px;
    font-size: 18px;
    color: #5a5e66;
    margin-right: 20px;
    align-items: center;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }

    .icon {
      top: 25px;
      right: -20px;
      position: absolute;
    }
  }
}

.el-dropdown-menu__item {
  line-height: 30px;
}

.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all 0.5s;
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
