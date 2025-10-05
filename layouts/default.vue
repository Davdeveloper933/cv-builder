<template>
  <Header />
  <main><slot /></main>
</template>

<script lang="ts" setup>
import Header from '~/components/UI/Header.vue'
</script>

<style>
#preview {
  ol,
  ul {
    @apply list-inside;
    p {
      @apply inline;
    }
  }
}
</style>
