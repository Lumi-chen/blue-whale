<template>
  <h3 class="mode-title">🎉 Welcome Back，Lumi</h3>
  <el-row type="flex" class="flex-top">
    <el-col class="user mode-box ">
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </el-col>
    <el-col class="mode-box "></el-col>
  </el-row>
  <el-row type="flex" class="flex-middle">
    <el-col class="mode-box"></el-col>
    <el-col class="list mode-box "></el-col>
  </el-row>
</template>

<script setup></script>

<style lang="scss" scoped>
.flex-top {
  .el-col {
    border-radius: 8px;
    height: 120px;
    padding: 16px;
    flex: 1;
    display: flex;
  }

  .user {
    margin-right: 16px;
    flex: 2;
  }
}

.flex-middle {
  height: calc(100% - 120px);

  .el-col {
    border-radius: 8px;
    padding: 16px;
    flex: 2;
  }

  .list {
    margin-left: 16px;
    flex: 1;
  }
}

.el-row+.el-row {
  margin-top: 16px;
}
</style>