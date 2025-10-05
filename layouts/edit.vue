<template>
  <main>
    <slot />
  </main>
</template>

<script lang="ts" setup></script>

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
