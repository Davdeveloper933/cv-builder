<script setup lang="ts">
import type { ResumeData } from '~/types'
import InputLegend from '~/components/UI/InputLegend.vue'

defineProps<{
  resumeData: ResumeData
}>()
</script>

<template>
  <div class="space-y-6">
    <h3 class="font-bold font-sans text-sm sm:text-base uppercase my-2">
      personal details
    </h3>
    <div class="flex flex-col space-y-6">
      <InputLegend
        :resume-data="resumeData"
        :field-label="'Name'"
        v-model="resumeData.name"
      />
      <InputLegend
        :resume-data="resumeData"
        :field-label="'Last Name'"
        v-model="resumeData.lastName"
      />

      <div v-if="resumeData.hasOwnProperty('jobTitle')">
        <InputLegend
          :resume-data="resumeData"
          :field-label="'Job Title'"
          v-model="resumeData.jobTitle"
        />
      </div>
    </div>
    <!--      personal details [contacts]-->
    <div class="flex flex-col space-y-6">
      <div
        class="flex flex-col space-y-2"
        v-for="(field, index) in resumeData.contact.list"
        :key="index"
      >
        <div :key="indx" v-for="(value, indx) in field">
          <InputLegend
            v-if="indx !== 'icon'"
            :field-label="Object.keys(field)[1]"
            v-model="field[indx]"
            :resume-data="resumeData"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
