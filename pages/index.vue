<template>
  <section>
    <div class="flex justify-center flex-col items-center">
      <h1 class="font-bold text-center max-w-2xl text-2xl">
        Build a Standout
        <span class="text-[#0A65AD] font-bold">CV</span> Instantly
      </h1>
      <h3 class="text-xl text-center max-w-2xl">
        Customizable templates, live preview, and instant PDF export —
        everything you need in one tool.
      </h3>
      <NuxtLink
        class="flex mt-4 justify-center font-bold items-center gap-1 px-3 py-1 rounded-xl bg-gradient-to-r bg-gray-800 text-white transition-colors router-link-active router-link-exact-active hover:bg-gray-900 active:bg-gray-900 active:text-white/80"
        variant="solid"
        color="gray"
        to="/try-free"
      >
        Build CV
        <i class="material-icons font-bold text-xl md:text-2xl"
          >arrow_forward</i
        >
      </NuxtLink>
    </div>
    <div>
      <div class="container mx-auto">
        <div class="flex justify-center mt-4 p-4">
          <LandingHeroImage />
          <!--          <img-->
          <!--            class="w-full sm:max-w-screen-sm border shadow-md shadow-black rounded-lg"-->
          <!--            src="/images/presentation.png"-->
          <!--            alt=""-->
          <!--          />-->
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import LandingHeroImage from '~/components/LandingHeroImage.vue'
</script>

<style></style>
