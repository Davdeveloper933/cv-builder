<template>
  <div
    v-if="resumeDataForEditing"
    class="min-w-[inherit] custom-template max-h-[inherit] min-h-[inherit] mx-auto p-8 bg-white text-gray-900 font-sans space-y-8"
  >
    <div class="flex items-start justify-between">
      <div class="flex flex-col items-start space-y-1">
        <h1 class="text-3xl font-bold text-primary space-x-2 uppercase">
          <span>{{ resumeDataForEditing.name }} </span>
          <span>{{ resumeDataForEditing.lastName }}</span>
        </h1>
        <p class="text-lg tracking-wide">{{ resumeDataForEditing.jobTitle }}</p>
        <img
          v-if="resumeDataForEditing.profileImage !== ''"
          class="resume-photo text-right w-40 rounded-lg"
          :src="resumeDataForEditing.profileImage"
          alt="Photo"
        />
      </div>

      <div>
        <div class="space-y-1 text-sm">
          <p
            :class="{
              'border-b border-primary-lighter pb-1':
                index < resumeDataForEditing.contact.list.length - 1,
            }"
            v-for="(contact, index) in resumeDataForEditing.contact.list"
            :key="index"
            class="text-right"
          >
            <span :key="indx" v-for="(value, indx) in contact">{{
              value
            }}</span>
          </p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-8">
      <div class="md:col-span-1 space-y-8">
        <section v-if="resumeDataForEditing.skills.show">
          <div class="flex items-center">
            <h2 class="text-sm font-bold text-primary uppercase mr-4">
              {{ resumeDataForEditing.skills.label }}
            </h2>
            <div class="flex-grow border-t border-primary-lighter"></div>
          </div>
          <ul class="list-disc list-inside text-sm mt-2 space-y-1">
            <li
              :key="index"
              v-for="(skill, index) in resumeDataForEditing.skills.content"
            >
              {{ skill }}
            </li>
          </ul>
        </section>

        <section v-if="resumeDataForEditing.certificates?.show">
          <div class="flex items-center">
            <h2 class="text-sm font-bold text-primary uppercase mr-4">
              {{ resumeDataForEditing.certificates.label }}
            </h2>
            <div class="flex-grow border-t border-primary-lighter"></div>
          </div>
          <ul class="list-disc list-inside text-sm mt-2 space-y-1">
            <li
              :key="index"
              v-for="(cer, index) in resumeDataForEditing.certificates.content"
            >
              {{ cer }}
            </li>
          </ul>
        </section>
        <section v-if="resumeDataForEditing.languages.show">
          <div class="flex items-center">
            <h2 class="text-sm font-bold text-primary uppercase mr-4">
              {{ resumeDataForEditing.languages.label }}
            </h2>
            <div class="flex-grow border-t border-primary-lighter"></div>
          </div>
          <ul class="list-disc list-inside text-sm mt-2 space-y-1">
            <li
              :key="index"
              v-for="(lang, index) in resumeDataForEditing.languages.list"
            >
              {{ lang.lang }}: {{ lang.level }}
            </li>
          </ul>
        </section>

        <div v-if="resumeDataForEditing.leftColumnSections.length > 0">
          <section
            v-for="(sec, i) in resumeDataForEditing.leftColumnSections"
            :key="sec.id"
          >
            <div class="flex items-center">
              <h2 class="text-sm font-bold text-primary uppercase mr-4">
                {{ sec.title }}
              </h2>
              <div class="flex-grow border-t border-primary-lighter"></div>
            </div>
            <div v-if="sec.description" class="text-sm">
              <p>{{ sec.description }}</p>
            </div>
            <ClientOnly>
              <Editor
                :id="'leftColumnSection-' + i"
                v-model="sec.contentHTML"
                :is-read-only="true"
                class="list-disc"
              />
            </ClientOnly>
          </section>
        </div>
      </div>

      <div class="md:col-span-2 space-y-8">
        <section v-if="resumeDataForEditing.profile.show">
          <div class="flex items-center">
            <h2 class="text-sm font-bold text-primary uppercase mr-4">
              {{ resumeDataForEditing.profile.label }}
            </h2>
            <div class="flex-grow border-t border-primary-lighter"></div>
          </div>
          <ClientOnly>
            <Editor
              :id="'profile-aboutMe'"
              v-model="resumeDataForEditing.profile.aboutMe"
              :is-read-only="true"
              class="text-sm list-disc leading-relaxed mt-2"
            />
          </ClientOnly>
        </section>

        <section v-if="resumeDataForEditing.experience.show">
          <div class="flex items-center mb-2">
            <h2 class="text-sm font-bold text-primary uppercase mr-4">
              {{ resumeDataForEditing.experience.label }}
            </h2>
            <div class="flex-grow border-t border-primary-lighter"></div>
          </div>
          <div
            v-for="(job, index) in resumeDataForEditing.experience.list"
            :key="job.id"
            class="mb-4"
          >
            <h3 class="font-semibold">
              <span v-if="job.company">{{ job.company }}</span
              ><span v-if="job.country"> - {{ job.country }}</span>
              <div class="float-right italic text-sm">
                ({{ formatDate(job.dates.start) }} -
                <span v-if="job.dates.current">present</span>
                <span v-else>{{ formatDate(job.dates.end) }}</span
                >)
              </div>
            </h3>
            <p class="text-sm">{{ job.title }}</p>
            <ClientOnly>
              <Editor
                :id="'work-content'"
                class="list-disc"
                v-model="job.content"
                :is-read-only="true"
              />
            </ClientOnly>
          </div>
        </section>

        <section v-if="resumeDataForEditing.education.show">
          <div class="flex items-center mb-2">
            <h2 class="text-sm font-bold text-primary uppercase mr-4">
              {{ resumeDataForEditing.education.label }}
            </h2>
            <div class="flex-grow border-t border-primary-lighter"></div>
          </div>
          <div
            v-for="(edu, index) in resumeDataForEditing.education.list"
            :key="edu.id"
            class="text-sm mb-4"
          >
            <div class="font-bold flex justify-between items-center">
              <div>
                <span v-if="edu.location">{{ edu.location }}</span>
                ({{ formatDate(edu.dates.start) }} -
                <span v-if="edu.dates.current">present</span>
                <span v-else>{{ formatDate(edu.dates.end) }}</span
                >)
              </div>
            </div>
            <p v-if="edu.title">{{ edu.title }}</p>
          </div>
        </section>

        <div v-if="resumeDataForEditing.customSections.length > 0">
          <section
            v-for="(sec, i) in resumeDataForEditing.customSections"
            :key="i"
          >
            <div class="flex items-center mb-2">
              <h2 class="text-sm font-bold text-primary uppercase mr-4">
                {{ sec.title }}
              </h2>
              <div class="flex-grow border-t border-primary-lighter"></div>
            </div>
            <div class="flex items-center justify-between">
              <p v-if="sec.description" class="text-sm">
                {{ sec.description }}
              </p>
              <div class="font-semibold italic text-sm">
                ({{ formatDate(sec.dates.start) }} -
                <span v-if="sec.dates.current">present</span>
                <span v-else>{{ formatDate(sec.dates.end) }}</span>
              </div>
            </div>

            <ClientOnly>
              <Editor
                :id="'customSection-' + i"
                v-model="sec.contentHTML"
                :is-read-only="true"
                class="list-disc"
              />
            </ClientOnly>
          </section>
        </div>
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

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');
body {
  font-family: 'Open Sans', sans-serif;
}
</style>
