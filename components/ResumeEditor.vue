<template>
  <div
    v-if="resumeData"
    class="max-h-[1200px] sticky overflow-y-scroll bg-white shadow-lg p-2 space-y-6"
  >
    <div v-if="isCustomTemplate" class="">
      <DisplaySections :resume-data="resumeData" />
      <ThemePicker :resume-data="resumeData" class="mt-8" />
      <LayoutToggle :resume-data="resumeData" class="mt-8" />
    </div>
    <!-- Profile Image -->
    <div class="flex" v-if="'profileImage' in resumeData">
      <ProfileImage
        :isCustomTemplate="isCustomTemplate"
        :resume-data="resumeData"
        :src="resumeData.profileImage"
      />
    </div>

    <div class="bg-gray-50 p-4 rounded-lg shadow-sm">
      <PersonalDetails :resume-data="resumeData" />
    </div>

    <!-- Skills Sections -->
    <div class="grid gap-4" v-if="resumeData.skills.show">
      <DynamicEditorSection
        :content-list="resumeData.skills"
        :model-value="listInputModels.inputText"
      />
      <DynamicEditorSection
        :content-list="resumeData.additionalSections?.softSkills"
        :model-value="listInputModels.inputText"
      />
    </div>

    <!-- Certificates -->
    <div
      class="bg-gray-50 p-4 rounded-lg shadow-sm"
      v-if="resumeData.certificates?.show"
    >
      <DynamicEditorSection
        :content-list="resumeData.certificates"
        :model-value="listInputModels.inputText"
      />
    </div>

    <!-- Languages -->
    <div v-if="resumeData.languages?.show">
      <h3
        class="mb-2 uppercase font-bold text-sm uppercase my-2 tracking-wider"
      >
        languages
      </h3>
      <div>
        <LanguageSelectUI
          class="w-full"
          :languages="resumeData.languages.list"
        />
      </div>
    </div>

    <!-- Hobbies -->
    <div class="grid gap-4" v-if="resumeData.hobbies">
      <DynamicEditorSection
        :content-list="resumeData.hobbies"
        :model-value="listInputModels.inputText"
      />
    </div>

    <!-- Profile (About Me) -->
    <div
      v-if="resumeData.profile?.show"
      class="bg-white p-4 rounded-lg shadow-sm"
    >
      <DynamicEditorSection
        :resume-data="resumeData"
        :profile="resumeData.profile"
      />
    </div>

    <!-- Experience -->
    <div
      v-if="resumeData.experience?.show"
      class="bg-white p-4 rounded-lg shadow-sm"
    >
      <DynamicEditorSection
        :resume-data="resumeData"
        :experience="resumeData.experience"
      />
    </div>

    <!-- Education -->
    <div
      v-if="resumeData.education?.show"
      class="bg-white p-4 rounded-lg shadow-sm"
    >
      <DynamicEditorSection :education="resumeData.education" />
    </div>

    <!-- Awards -->
    <div v-if="resumeData.awards" class="bg-gray-50 p-4 rounded-lg shadow-sm">
      <DynamicEditorSection :content-list="resumeData.awards" />
    </div>

    <!-- Affiliations -->
    <div
      v-if="resumeData.affiliations"
      class="bg-gray-50 p-4 rounded-lg shadow-sm"
    >
      <DynamicEditorSection :content-list="resumeData.affiliations" />
    </div>

    <div v-if="isCustomTemplate">
      <!--      Left Column Sections-->
      <div class="bg-white p-4 rounded-lg shadow-sm">
        <DynamicEditorSection
          :resume-data="resumeData"
          :left-column-list="resumeData.leftColumnSections"
        />
      </div>

      <!--      Custom Sections-->
      <div class="bg-white p-4 rounded-lg shadow-sm">
        <DynamicEditorSection
          :resume-data="resumeData"
          :custom-section-list="resumeData.customSections"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ResumeData } from '~/types'
import LanguageSelectUI from '~/components/UI/LanguageSelectUI.vue'
import useEditor from '~/composables/useEditor'
import DynamicEditorSection from '~/components/editor/DynamicEditorSection.vue'
import ProfileImage from '~/components/editor/ProfileImage.vue'
import PersonalDetails from '~/components/editor/PersonalDetails.vue'
import useHistory from '~/composables/useHistory'
import DisplaySections from '~/components/editor/DisplaySections.vue'
import ThemePicker from '~/components/editor/ThemePicker.vue'
import LayoutToggle from '~/components/editor/LayoutToggle.vue'
import { useCVState } from '~/data/useCVState'

interface Props {
  resumeData: ResumeData
  template: ResumeData
  reset: (template: ResumeData | undefined) => void
}

const props = defineProps<Props>()

const { listInputModels } = useEditor()
const { setCurrent, push } = useHistory()
const { history } = useCVState()

onMounted(() => {
  if (history.value.length < 1) {
    push(props.resumeData)
  }
  setCurrent(props.resumeData)
})

const route = useRoute()
const isCustomTemplate = computed(() => route.fullPath === '/edit-custom')
</script>

<style scoped>
/* width */
::-webkit-scrollbar {
  width: 1px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px #dad8d8;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #ece9e9;
}
</style>
