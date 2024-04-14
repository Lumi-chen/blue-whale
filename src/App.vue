<script setup>
import MainLayout from './layout/Layout.vue'
</script>

<template>
  <Suspense>
    <MainLayout>
      <router-view />
    </MainLayout>
  </Suspense>
</template>

<style lang="scss" scoped></style>
