<template>
  <div
    v-if="resumeDataForEditing"
    class="flex min-h-[inherit] bg-white sticky text-black font-sans"
  >
    <div
      class="grid grid-cols-3 max-w-[793px] min-h-[1122px] overflow-hidden max-h-[1122px]"
    >
      <!-- Sidebar -->
      <div class="bg-[#222A35] col-span-1 text-white p-6 space-y-6">
        <div class="flex justify-center">
          <img
            :src="resumeDataForEditing.profileImage"
            alt="Profile photo"
            class="rounded-full h-40 w-40 object-cover"
          />
        </div>
        <div class="text-center">
          <h1 class="text-2xl font-bold space-x-2">
            <span>{{ resumeDataForEditing.name }}</span>
            <span>{{ resumeDataForEditing.lastName }}</span>
          </h1>
          <p class="text-blue-400">
            {{ resumeDataForEditing.jobTitle }}
          </p>
        </div>

        <div>
          <h2 class="text-lg uppercase font-semibold mb-2">
            {{ resumeDataForEditing.contact.label }}
          </h2>
          <ul class="list-none text-sm space-y-1">
            <li
              class="flex items-center space-x-2"
              :key="index"
              v-for="(field, index) in resumeDataForEditing.contact.list"
            >
              <div :key="indx" v-for="(value, indx) in field">
                <i
                  v-if="indx === 'icon'"
                  class="material-icons flex-1 text-white text-sm md:text-lg"
                  >{{ value }}</i
                >

                <span v-else>{{ value }}</span>
              </div>
            </li>
          </ul>
        </div>

        <div v-if="resumeDataForEditing.skills">
          <h2 class="text-lg font-semibold uppercase mb-2">
            {{ resumeDataForEditing.skills.label }}
          </h2>
          <ul class="list-[circle] list-inside">
            <li
              v-for="(skill, index) in resumeDataForEditing.skills.content"
              :key="index"
            >
              {{ skill }}
            </li>
          </ul>
        </div>

        <div>
          <h2 class="text-lg font-semibold uppercase mb-2">
            {{ resumeDataForEditing.languages?.label }}
          </h2>
          <ul class="text-sm list-inside list-[circle] space-y-1">
            <li
              v-for="(lang, i) in resumeDataForEditing.languages?.list"
              :key="i"
            >
              {{ lang.lang }}: {{ lang.level }}
            </li>
          </ul>
        </div>

        <div v-if="resumeDataForEditing.hobbies">
          <h2 class="text-lg font-semibold uppercase mb-2">
            {{ resumeDataForEditing.hobbies.label }}
          </h2>
          <ul class="list-[circle] list-inside">
            <li
              v-for="(hobbie, index) in resumeDataForEditing.hobbies.content"
              :key="index"
            >
              {{ hobbie }}
            </li>
          </ul>
        </div>
        <div v-if="resumeDataForEditing.leftColumnSections.length > 0">
          <div
            v-for="(section, i) in resumeDataForEditing.leftColumnSections"
            :key="i"
          >
            <div v-if="section">
              <h2 class="text-lg font-semibold uppercase mb-2">
                {{ section.title }}
              </h2>
              <ul class="list-[circle]">
                <li v-for="(item, index) in section.content" :key="index">
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="col-span-2 p-8 pb-0 space-y-8 overflow-hidden break-words">
        <section>
          <h2 class="text-2xl font-bold uppercase mb-2">
            {{ resumeDataForEditing.profile.label }}
          </h2>
          <ClientOnly>
            <Editor
              :id="'profile-aboutMe'"
              v-model="resumeDataForEditing.profile.aboutMe"
              :is-read-only="true"
            />
          </ClientOnly>
        </section>

        <section v-if="resumeDataForEditing.experience">
          <h2 class="text-2xl font-bold uppercase mb-2">
            {{ resumeDataForEditing.experience.label }}
          </h2>
          <div
            v-for="(job, index) in resumeDataForEditing.experience.list"
            :key="job.id"
            class="mb-4"
          >
            <div class="flex justify-between">
              <h3 class="font-semibold">{{ job.title }}</h3>
              <div>
                <span class="text-sm capitalize">{{
                  formatDate(job.dates.start)
                }}</span>
                -
                <span v-if="job.dates.current" class="capitalize">current</span>
                <span v-else>{{ formatDate(job.dates.end) }}</span>
              </div>
            </div>
            <p class="text-sm italic">
              <span>{{ job.company }} - </span
              ><span v-if="job.country !== ''">{{ job.country }}</span>
            </p>

            <ClientOnly>
              <Editor
                :id="'work-content-' + job.id"
                v-model="job.content"
                :is-read-only="true"
              />
            </ClientOnly>
          </div>
        </section>
        <section v-if="resumeDataForEditing.education">
          <h2 class="text-2xl font-bold uppercase mb-2">
            {{ resumeDataForEditing.education.label }}
          </h2>
          <div
            v-for="(edu, index) in resumeDataForEditing.education.list"
            :key="edu.id"
            class="mb-4"
          >
            <h3 class="font-semibold">{{ edu.title }}</h3>
            <p class="text-sm capitalize italic">
              <span>{{ formatDate(edu.dates.start) }}</span> -
              <span v-if="edu.dates.current" class="capitalize">current</span>
              <span v-else>{{ formatDate(edu.dates.end) }}</span>
            </p>
            <p class="text-sm">{{ edu.location }}</p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Editor from '~/components/Editor.vue'
import type { ResumeData } from '~/types'

defineProps<{
  resumeDataForEditing: ResumeData
}>()
</script>

<style scoped>
h2,
h1,
h3,
span,
li,
p {
  font-family: 'Open Sans', sans-serif;
}

.list-disc ol,
.list-disc ul {
  list-style-type: disc;
}
</style>
