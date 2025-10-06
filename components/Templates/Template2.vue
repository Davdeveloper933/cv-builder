<template>
  <div
    v-if="resumeDataForEditing"
    :class="'max-w-' + forPreview.maxWidth"
    class="flex min-h-[inherit] max-w-[793px] bg-white text-[13px] text-gray-900"
  >
    <div
      :class="'grid-cols-' + forPreview.cols"
      class="grid template-wrapper min-h-[1122px] overflow-hidden max-h-[1122px]"
    >
      <!-- Sidebar -->
      <aside class="bg-[#305FEE] col-span-1 text-white py-6 space-y-5">
        <div class="md:px-6 px-3">
          <div>
            <h1
              class="md:text-2xl text-base sm:text-xl mb-3 uppercase font-bold leading-tight"
            >
              <span>{{ resumeDataForEditing.name }}</span
              ><br />
              <span>{{ resumeDataForEditing.lastName }}</span>
            </h1>
          </div>
          <div>
            <ul class="list-none text-xs sm:text-sm space-y-1">
              <li
                class="flex items-center space-x-2"
                :key="index"
                v-for="(field, index) in resumeDataForEditing.contact.list"
              >
                <div :key="indx" v-for="(value, indx) in field">
                  <i
                    v-if="indx === 'icon'"
                    class="material-icons text-white text-xs sm:text-sm md:text-lg"
                    >{{ value }}</i
                  >
                  <span v-else>{{ value }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h2
            class="bg-[#1946a3] md:px-6 px-3 text-sm md:text-base font-semibold uppercase"
          >
            {{ resumeDataForEditing.skills.label }}
          </h2>
          <div
            class="list-disc mt-4 md:px-6 px-3 list-inside text-xs sm:text-sm space-y-1"
          >
            <ul class="list-disc">
              <li
                v-for="(skill, index) in resumeDataForEditing.skills.content"
                :key="index"
              >
                {{ skill }}
              </li>
            </ul>
          </div>
        </div>
        <div v-if="resumeDataForEditing.certificates">
          <h2
            class="text-xs sm:text-sm md:text-base font-semibold bg-[#1946A3] uppercase md:px-6 px-3 mb-2"
          >
            <span class="align-sub">{{
              resumeDataForEditing.certificates.label
            }}</span>
          </h2>
          <div class="md:px-6 px-3">
            <ul class="list-disc list-inside">
              <li
                v-for="(certfct, index) in resumeDataForEditing.certificates
                  .content"
                :key="index"
              >
                {{ certfct }}
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h2
            class="text-sm md:text-base font-semibold bg-[#1946A3] uppercase md:px-6 px-3 mb-2"
          >
            <span class="align-sub">languages</span>
          </h2>
          <ul
            v-for="lang in resumeDataForEditing.languages?.list"
            class="list-none md:px-6 px-3 list-inside"
          >
            <li>{{ lang.lang }}, {{ lang.level }}</li>
          </ul>
        </div>
      </aside>

      <!-- Main Content -->
      <main
        :class="'col-span-' + forPreview.span"
        class="md:px-6 px-3 py-4 space-y-5 overflow-hidden break-words"
      >
        <section>
          <h2
            class="text-sm md:text-base mb-3 pt-0 font-bold text-[#305FEB] uppercase"
          >
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
          <h2
            class="text-sm md:text-base font-bold text-[#305FEB] uppercase mb-2"
          >
            {{ resumeDataForEditing.experience.label }}
          </h2>
          <div
            v-for="(job, index) in resumeDataForEditing.experience.list"
            :key="job.id"
          >
            <h3 class="font-semibold uppercase text-[#305FEB] mt-4">
              {{ job.title }}
            </h3>
            <p class="italic text-xs">
              <span>{{ job.company }}</span
              ><span v-if="job.country !== ''"> - {{ job.country }}</span>
            </p>
            <p class="italic capitalize text-xs">
              <span>{{ formatDate(job.dates.start) }}</span> -
              <span v-if="job.dates.current" class="capitalize">current</span>
              <span v-else>{{ formatDate(job.dates.end) }}</span>
            </p>
            <ClientOnly>
              <Editor
                :id="'work-content'"
                v-model="job.content"
                :is-read-only="true"
                class="list-disc mt-3"
              />
            </ClientOnly>
          </div>
        </section>

        <section>
          <h2
            class="text-sm md:text-base font-bold text-[#305FEB] uppercase mb-2"
          >
            {{ resumeDataForEditing.education.label }}
          </h2>
          <div
            v-for="(edu, index) in resumeDataForEditing.education.list"
            :key="edu.id"
          >
            <p class="text-xs font-semibold">{{ edu.title }}</p>
            <p class="text-xs">{{ edu.location }}</p>
            <p class="capitalize text-xs">
              <span>{{ formatDate(edu.dates.start) }}</span> -
              <span v-if="edu.dates.current" class="capitalize">current</span>
              <span v-else>{{ formatDate(edu.dates.end) }}</span>
            </p>
          </div>
        </section>

        <section v-if="resumeDataForEditing.awards">
          <h2
            class="text-sm md:text-base font-bold text-[#305FEB] uppercase mb-2"
          >
            {{ resumeDataForEditing.awards.label }}
          </h2>
          <ClientOnly>
            <Editor
              :id="'awards-section'"
              v-model="resumeDataForEditing.awards.contentHTML"
              :is-read-only="true"
              class="list-disc"
            />
          </ClientOnly>
        </section>

        <section v-if="resumeDataForEditing.affiliations">
          <h2
            class="text-sm md:text-base font-bold text-[#305FEB] uppercase mb-2"
          >
            {{ resumeDataForEditing.affiliations.label }}
          </h2>
          <ClientOnly>
            <Editor
              :id="'aff-section'"
              v-model="resumeDataForEditing.affiliations.contentHTML"
              :is-read-only="true"
              class="list-disc"
            />
          </ClientOnly>
        </section>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Editor from '~/components/Editor.vue'
import type { ResumeData } from '~/types'
import { formatDate } from '~/utils/helpers'

interface ForPreviewProps {
  cols: string
  span: string
  maxWidth: string
}

withDefaults(
  defineProps<{
    resumeDataForEditing: ResumeData
    forPreview: ForPreviewProps
  }>(),
  {
    forPreview: () => ({
      // Добавьте стрелочную функцию
      cols: '3',
      span: '2',
      maxWidth: '[793px]',
    }),
  },
)
</script>
<style scoped>
h2,
h1,
h3,
span,
li,
p {
  font-family: 'Gelasio', serif;
}
</style>
