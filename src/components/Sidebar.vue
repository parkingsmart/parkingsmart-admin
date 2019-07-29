<template>
  <el-menu
    router
    :default-active="$route.path"
    text-color="#fff"
    background-color="#1F2D3D"
    active-text-color="#ffd04b"
  >
    <div v-for="(router, idx) in routers" :key="idx">
      <el-submenu v-if="router.type === 'group'" :index="idx + ''">
        <template slot="title">
          <span>{{router.title}}</span>
        </template>
        <el-menu-item
          v-for="item in router.items"
          :key="item.path"
          class="menu-item"
          :index="item.path"
          :route="{path: item.path}"
        >
          <font-awesome-icon :icon="item.navIcon" />
          <span slot="title">{{item.id}}</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item v-else class="menu-item" :index="router.path" :route="{path: router.path}">
        <font-awesome-icon :icon="router.navIcon" />
        <span slot="title">{{router.id}}</span>
      </el-menu-item>
    </div>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      routers: [
        { id: "订单管理", navIcon: "tachometer-alt", path: "/orderlist" },
        { id: "停车场管理", navIcon: "car", path: "/parking-lots" },
        { id: "用户管理", navIcon: "user-tie", path: "/users" },
        { id: "停车员管理", navIcon: "user-friends", path: "/parking-boys" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.menu-item svg {
  padding: 0 15px;
}

.menu-item {
  text-align: left;
}
</style>
