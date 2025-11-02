<script setup lang="ts">
import useEditor from '~/composables/useEditor'
import Editor from '~/components/Editor.vue'
import type {
  CustomSections,
  EducationSection,
  ExperienceSection,
  LabelContent,
  LeftColumnSections,
  Profile,
} from '~/types/editor'
import DateRange from '~/components/UI/DateRange.vue'
import InputLegend from '~/components/UI/InputLegend.vue'
import EditSectionLabel from '~/components/editor/EditSectionLabel.vue'
import type { ResumeData } from '~/types'
import { useCVState } from '~/data/useCVState'

defineProps<{
  contentList?: LabelContent
  profile?: Profile
  experience?: ExperienceSection
  education?: EducationSection
  customSectionList?: CustomSections
  leftColumnList?: LeftColumnSections
  modelValue?: string
  resumeData?: ResumeData
}>()

const {
  removeSectionItem,
  addNewAnySection,
  listInputModels,
  addNewSectionListItem,
  removeCustomSectionItem,
} = useEditor()

const { emptyFields } = useCVState()
</script>

<template>
  <div class="space-y-8 text-sm text-gray-800">
    <!-- Content List Section -->
    <div v-if="contentList !== undefined" class="space-y-6">
      <!-- List Input (Skills, etc.) -->
      <div v-if="contentList.content" class="space-y-4">
        <EditSectionLabel
          :make-editable="false"
          v-model:label="contentList.label"
        />

        <!-- New Item Input -->
        <div class="flex items-normal">
          <input
            v-model="listInputModels.inputText"
            class="w-full px-3 py-2 border md:text-sm text-xs border-gray-300 rounded-l-lg focus-visible:outline-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Title"
            type="text"
          />
          <button
            class="p-1 border border-blue-600 md:text-sm text-xs bg-blue-600 text-white rounded-e-full hover:bg-blue-700 transition"
            @click="
              addNewSectionListItem(
                contentList.content,
                listInputModels.inputText,
              )
            "
          >
            <i class="material-icons text-white font-bold text-lg">add</i>
          </button>
        </div>

        <!-- Existing Items -->
        <div
          v-for="(skill, i) in contentList.content"
          :key="i"
          class="flex gap-2 items-center"
        >
          <input
            v-model="contentList.content[i]"
            class="w-full px-3 py-2 border md:text-sm text-xs border-gray-300 rounded-lg"
            placeholder="Title"
            type="text"
          />
          <button class="" @click="removeSectionItem(contentList.content, i)">
            <i class="material-icons text-red-600 text-lg">delete</i>
          </button>
        </div>
      </div>

      <!-- Rich Text (contentHTML) -->
      <div v-else-if="contentList.contentHTML" class="space-y-2">
        <EditSectionLabel
          :make-editable="false"
          v-model:label="contentList.label"
        />

        <ClientOnly>
          <Editor
            :id="'awards-section'"
            v-model="contentList.contentHTML"
            :is-read-only="false"
            :resume-data="resumeData"
          />
        </ClientOnly>
      </div>
    </div>

    <!-- Profile Section -->
    <div v-if="profile !== undefined" class="space-y-2">
      <EditSectionLabel :make-editable="false" v-model:label="profile.label" />

      <ClientOnly>
        <Editor
          :id="'profile-aboutMe'"
          v-model="profile.aboutMe"
          :is-read-only="false"
          :resume-data="resumeData"
        />
      </ClientOnly>
    </div>

    <!-- Experience Section -->
    <div v-if="experience !== undefined" class="space-y-4">
      <EditSectionLabel
        :make-editable="false"
        v-model:label="experience.label"
      />
      <button
        class="px-4 py-2 bg-blue-600 text-white rounded-lg uppercase text-xs md:text-sm mb-4 hover:bg-blue-700 transition"
        @click="addNewAnySection(experience.list, 'experience', emptyFields)"
      >
        Add new experience section
      </button>
      <div v-if="experience.list?.length" class="space-y-4">
        <div
          v-for="(work, i) in experience.list"
          :key="work.id"
          class="space-y-4 bg-gray-50 p-4 rounded-xl border"
        >
          <input
            v-model="work.title"
            class="w-full px-3 md:text-sm text-xs py-2 border rounded-lg"
            placeholder="Title"
            type="text"
          />
          <DateRange :sec="work.dates" :i="i" />

          <div class="flex gap-4 md:gap-2 md:flex-nowrap flex-wrap">
            <InputLegend
              :resume-data="resumeData"
              :field-label="'Company'"
              v-model="work.company"
            />

            <InputLegend
              :resume-data="resumeData"
              :field-label="'Country'"
              v-model="work.country"
            />
          </div>

          <ClientOnly>
            <Editor
              :id="'work-content-' + work.id"
              v-model="work.content"
              :is-read-only="false"
              :resume-data="resumeData"
            />
          </ClientOnly>
          <div class="flex justify-start">
            <button
              class="px-4 py-2 bg-red-600 text-white rounded-lg uppercase text-xs md:text-sm hover:bg-red-700 transition"
              @click="removeSectionItem(experience.list, i)"
            >
              remove Section item
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Education Section -->
    <div v-if="education !== undefined" class="space-y-4">
      <EditSectionLabel
        :make-editable="false"
        v-model:label="education.label"
      />
      <button
        class="px-4 py-2 bg-blue-600 text-white rounded-lg uppercase text-xs md:text-sm mb-4 hover:bg-blue-700 transition"
        @click="addNewAnySection(education.list, 'education', emptyFields)"
      >
        Add new education section
      </button>
      <div v-if="education.list?.length" class="space-y-4">
        <div
          v-for="(edu, i) in education.list"
          :key="edu.id"
          class="space-y-4 bg-gray-50 p-4 rounded-xl border"
        >
          <input
            v-model="edu.title"
            class="w-full px-3 py-2 border rounded-lg"
            placeholder="Title"
            type="text"
          />

          <DateRange :sec="edu.dates" :i="i" />

          <input
            v-model="edu.location"
            class="w-full px-3 py-2 border rounded-lg"
            placeholder="Location"
            type="text"
          />
          <div class="flex justify-start">
            <button
              class="px-4 py-2 bg-red-600 text-white rounded-lg uppercase text-xs md:text-sm hover:bg-red-700 transition"
              @click="removeSectionItem(education.list, i)"
            >
              REMOVE section item
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Left Column Section -->
    <div v-if="leftColumnList !== undefined" class="space-y-4">
      <div v-if="resumeData?.layout === 'twoColumn'">
        <h3 class="mb-2 font-bold text-sm uppercase my-2 tracking-wider">
          left column sections
        </h3>
        <button
          class="px-4 py-2 bg-blue-600 text-white rounded-lg uppercase text-xs md:text-sm mb-4 hover:bg-blue-700 transition"
          @click="
            addNewAnySection(leftColumnList, 'customSection', emptyFields)
          "
        >
          ADD NEW SECTION
        </button>
        <div v-if="leftColumnList.length" class="space-y-4">
          <div
            v-for="(sec, i) in leftColumnList"
            :key="sec.id"
            class="space-y-4 bg-gray-50 p-4 rounded-xl border"
          >
            <div class="flex flex-col space-y-2">
              <input
                v-model="sec.title"
                class="w-full text-sm px-3 py-2 border rounded-lg"
                placeholder="section name"
                type="text"
              />
              <input
                v-model="sec.description"
                class="w-full text-sm px-3 py-2 border rounded-lg"
                placeholder="section desc"
                type="text"
              />
            </div>
            <ClientOnly>
              <Editor
                :id="'leftColumnListSection-' + i"
                v-model="sec.contentHTML"
                :is-read-only="false"
                :resume-data="resumeData"
              />
            </ClientOnly>
            <button
              class="px-4 py-2 bg-red-600 text-white rounded-lg uppercase text-xs md:text-sm hover:bg-red-700 transition"
              @click="removeCustomSectionItem(i, leftColumnList)"
            >
              REMOVE SECTION
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Custom Section -->
    <div v-if="customSectionList !== undefined" class="space-y-4">
      <div>
        <h3 class="mb-2 font-bold text-sm uppercase my-2 tracking-wider">
          Custom sections
        </h3>
        <button
          class="px-4 py-2 bg-blue-600 text-white rounded-lg uppercase text-xs md:text-sm mb-4 hover:bg-blue-700 transition"
          @click="
            addNewAnySection(customSectionList, 'customSection', emptyFields)
          "
        >
          ADD NEW custom SECTION
        </button>

        <div v-if="customSectionList.length">
          <div
            v-for="(sec, i) in customSectionList"
            :key="sec.id"
            class="space-y-4 bg-gray-50 p-4 rounded-xl border"
          >
            <div class="flex flex-col space-y-2">
              <input
                v-model="sec.title"
                class="w-full text-sm px-3 py-2 border rounded-lg"
                placeholder="section name"
                type="text"
              />
              <input
                v-model="sec.description"
                class="w-full text-sm px-3 py-2 border rounded-lg"
                placeholder="section desc"
                type="text"
              />
              <div>
                <DateRange :sec="sec.dates" :i="i" :resume-data="resumeData" />
              </div>
            </div>
            <ClientOnly>
              <Editor
                :id="'customSection-' + i"
                v-model="sec.contentHTML"
                :is-read-only="false"
                :resume-data="resumeData"
              />
            </ClientOnly>
            <button
              class="px-4 py-2 bg-red-600 text-white rounded-lg uppercase text-xs md:text-sm hover:bg-red-700 transition"
              @click="removeCustomSectionItem(i, customSectionList)"
            >
              REMOVE SECTION
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
