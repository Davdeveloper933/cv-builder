<template>
  <div
    v-if="resumeDataForEditing"
    ref="resumeblock"
    class="bg-white text-black font-sans max-w-[793px] min-h-[1122px] md:overflow-hidden max-h-auto md:max-h-[1122px] mx-auto"
  >
    <!-- Header -->
    <div class="bg-[#2c3a50] text-white font-sans mx-auto">
      <div class="flex items-center gap-8 px-8 pt-9">
        <!-- Profile Photo -->
        <img
          :src="resumeDataForEditing.profileImage"
          alt="Profile"
          class="w-48 h-48 rounded-full object-cover"
        />

        <!-- Info -->
        <div class="flex-1">
          <h1 class="text-4xl font-extrabold uppercase text-white">
            {{ resumeDataForEditing.name }} {{ resumeDataForEditing.lastName }}
          </h1>
          <p class="text-[#7cb342] text-xl font-semibold mt-1">
            {{ resumeDataForEditing.jobTitle }}
          </p>
          <ClientOnly>
            <Editor
              :id="'profile-aboutMe'"
              v-model="resumeDataForEditing.profile.aboutMe"
              :is-read-only="true"
            />
          </ClientOnly>
        </div>
      </div>

      <div
        class="bg-[#1c252f] mt-6 px-6 py-3 flex flex-wrap items-center justify-between text-sm rounded-md"
      >
        <div
          v-for="(field, index) in resumeDataForEditing.contact.list"
          :key="index"
          class="flex items-center gap-2 text-white"
        >
          <div v-for="(val, key) in field" :key="key">
            <i
              v-if="key === 'icon' && val !== 'linkedin'"
              class="material-icons main-color text-xl md:text-2xl"
              >{{ val }}</i
            >
            <img
              class="bg-[#70AD47] link-img"
              v-else-if="key === 'icon' && val === 'linkedin'"
              :src="'/images/linkedin.png'"
              alt="icon"
            />
            <span v-else>{{ val }}</span>
          </div>
        </div>
      </div>
    </div>

    <div
      class="grid p-8 mt-6 grid-cols-3 bg-white md:grid-cols-3 gap-8 justify-between"
    >
      <!-- Left Column -->
      <div class="md:col-span-2 col-span-2 space-y-12">
        <section v-if="resumeDataForEditing.experience">
          <h2 class="text-lg font-bold main-color mb-2 uppercase">
            {{ resumeDataForEditing.experience.label }}
          </h2>
          <div
            v-for="job in resumeDataForEditing.experience.list"
            :key="job.id"
            class="mb-4"
          >
            <p class="font-bold text-black">{{ job.title }}</p>
            <div class="flex justify-between items-center">
              <span class="italic block text-gray-800">
                {{ job.company }} – {{ job.country }}
              </span>
              <p class="text-sm text-gray-600">
                {{ formatDate(job.dates.start) }} –
                {{ formatDate(job.dates.end) }}
              </p>
            </div>
            <ClientOnly>
              <Editor
                :id="'work-content'"
                v-model="job.content"
                :is-read-only="true"
              />
            </ClientOnly>
          </div>
        </section>

        <section v-if="resumeDataForEditing.education">
          <h2 class="text-lg font-bold main-color mb-2 uppercase">
            {{ resumeDataForEditing.education.label }}
          </h2>
          <div v-for="edu in resumeDataForEditing.education.list" :key="edu.id">
            <p class="font-bold text-black">{{ edu.title }}</p>
            <div class="flex justify-between items-center">
              <span class="italic text-gray-800">{{ edu.location }}</span>
              <p class="text-sm text-gray-600">
                {{ formatDate(edu.dates.start) }} –
                {{ formatDate(edu.dates.end) }}
              </p>
            </div>
          </div>
        </section>
      </div>

      <!-- Right Column -->
      <div class="space-y-20 col-span-1 bg-white">
        <section class="space-y-3" v-if="resumeDataForEditing.skills">
          <div>
            <h2 class="text-lg font-bold main-color mb-2 uppercase">skills</h2>
            <div>
              <p class="font-bold text-black mb-2">
                {{ resumeDataForEditing.skills.label }}
              </p>
              <ul class="list-disc list-inside text-sm text-gray-700">
                <li
                  v-for="(skill, index) in resumeDataForEditing.skills.content"
                  :key="index"
                >
                  {{ skill }}
                </li>
              </ul>
            </div>
          </div>

          <div v-if="resumeDataForEditing.additionalSections?.softSkills">
            <p class="font-bold text-black mb-2">
              {{ resumeDataForEditing.additionalSections?.softSkills.label }}
            </p>
            <ul class="list-disc list-inside text-sm text-gray-700">
              <li
                v-for="(skill, index) in resumeDataForEditing.additionalSections
                  .softSkills.content"
                :key="index"
              >
                {{ skill }}
              </li>
            </ul>
          </div>
        </section>

        <section v-if="resumeDataForEditing.languages">
          <h2 class="text-lg font-bold main-color mb-2 uppercase">
            {{ resumeDataForEditing.languages.label }}
          </h2>
          <ul class="list-disc list-inside text-sm text-gray-700">
            <li
              v-for="(lang, i) in resumeDataForEditing.languages.list"
              :key="i"
            >
              {{ lang.lang }}: {{ lang.level }}
            </li>
          </ul>
        </section>

        <section v-if="resumeDataForEditing.hobbies">
          <h2 class="text-lg font-bold main-color mb-2 uppercase">
            {{ resumeDataForEditing.hobbies.label }}
          </h2>
          <ul class="list-disc list-inside text-sm text-gray-700">
            <li
              v-for="(hobbie, index) in resumeDataForEditing.hobbies.content"
              :key="index"
            >
              {{ hobbie }}
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Editor from '~/components/editor.vue'
import type { ResumeData } from '~/types'

defineProps<{
  resumeDataForEditing: ResumeData
}>()
</script>

<style scoped>
.list-disc ol,
.list-disc ul {
  list-style-type: disc;
}

.main-color {
  color: #70ad47;
}

.link-img {
  max-width: 23px;
}
</style>
