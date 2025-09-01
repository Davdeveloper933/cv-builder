<template>
  <div
    @blur="isVisible = !isVisible"
    class="dropdown relative w-full bg-white shadow-md rounded-lg"
  >
    <input
      @focus="isVisible = !isVisible"
      v-model="searchQuery"
      class="search-input md:text-sm text-xs border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition rounded-md"
      placeholder="Search..."
      type="text"
    />

    <ul
      ref="dropdownRef"
      :class="isVisible ? 'block' : 'hidden'"
      class="absolute w-full py-3.5 bg-white z-50 dropdown-list max-h-52 divide-y divide-gray-200"
    >
      <li
        v-for="(item, i) in filteredItems"
        :key="item.id"
        class="dropdown-item hover:bg-gray-100 rounded-md transition"
      >
        <label class="flex w-full items-center justify-between">
          <label
            class="checkbox-container flex items-center space-x-2 text-sm text-gray-800"
          >
            <input
              :checked="languages.some((lang) => lang.lang === item.lang)"
              class="checkbox"
              type="checkbox"
              @change="toggleSelection(item.lang, i)"
            />
            <span class="text">{{ item.lang }}</span>
          </label>

          <select
            v-model="selected[i]"
            class="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
            @change="toggleLevelSelection(item.lang, i)"
          >
            <option v-for="level in item.levels" :value="level">
              {{ level }}
            </option>
          </select>
        </label>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

type Language = {
  lang: string
  level: string
}

const props = defineProps({
  languages: {
    type: Array<Language>,
    default: [],
  },
})

const { push, current } = useHistoryFunctions()
const selected = ref<string[]>([])
const isVisible = ref(false)
const languagesOptions = ref([
  { id: 1, lang: 'English', levels: ['Beginner', 'Amateur', 'Competent'] },
  { id: 2, lang: 'French', levels: ['Beginner', 'Amateur', 'Competent'] },
  { id: 3, lang: 'Spanish', levels: ['Beginner', 'Amateur', 'Competent'] },
  { id: 4, lang: 'German', levels: ['Beginner', 'Amateur', 'Competent'] },
  { id: 5, lang: 'Armenian', levels: ['Beginner', 'Amateur', 'Competent'] },
  { id: 6, lang: 'Russian', levels: ['Beginner', 'Amateur', 'Competent'] },
  { id: 7, lang: 'Hindi', levels: ['Beginner', 'Amateur', 'Competent'] },
])

const searchQuery = ref('')

const filteredItems = computed(() =>
  languagesOptions.value.filter((item) =>
    item.lang.toLowerCase().includes(searchQuery.value.toLowerCase()),
  ),
)

const toggleSelection = (language: string, i: number) => {
  const index = props.languages.findIndex((item) => item.lang === language)
  const langAndExperience = {
    lang: language,
    level: selected.value[i],
  }
  if (index === -1) {
    props.languages.push(langAndExperience)
  } else {
    props.languages.splice(index, 1)
  }
  push(current.value)
}

const toggleLevelSelection = (language: string, i: number) => {
  const languageItem = props.languages.find((item) => item.lang === language)
  if (!languageItem) return
  languageItem.level = selected.value[i]
  push(current.value)
  console.log(languageItem, language)
}

const dropdownRef = ref<HTMLElement | null>(null)

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isVisible.value = false
  }
}

onMounted(() => {
  selected.value = languagesOptions.value.map((lang) => lang.levels[0])
  document.addEventListener('mousedown', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>

<style scoped>
.search-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.dropdown-list {
  list-style: none;
  margin: 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow-y: auto;
  scrollbar-width: thin;
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
}

.checkbox-container {
  display: flex;
  align-items: center;
}

.checkbox {
  margin-right: 10px;
  accent-color: blue; /* Синий цвет для чекбокса */
}

.text {
  flex: 1;
}

.selected-languages {
  margin-top: 15px;
  border-top: 1px solid #ccc;
  padding-top: 10px;
}

.selected-languages ul {
  list-style: none;
  padding: 0;
}

.selected-languages li {
  margin: 5px 0;
}
</style>
