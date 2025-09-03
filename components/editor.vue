<template>
  <div>
    <ckeditor
      v-model="editorHtml"
      :class="{ isReadOnly: isReadOnly }"
      :config="editorConfig"
      :editor="ClassicEditor"
      @ready="onEditorReady"
    ></ckeditor>
  </div>
</template>
<script setup>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { editorInstance } from '~/composables/states'
import '@ckeditor/ckeditor5-build-classic/build/translations/ru'
import cloneDeep from 'lodash-es/cloneDeep.js'

const { push, isWatching } = useHistoryFunctions()
const props = defineProps(['modelValue', 'isReadOnly', 'id', 'resumeData'])
const emit = defineEmits(['update:modelValue'])
const readOnly = ref(false)
let toolbarOptions = ref([
  'undo',
  'redo',
  '|',
  'bold',
  'italic',
  '|',
  'link',
  '|',
  'bulletedList',
  'numberedList',
  '|',
  'outdent',
  'indent',
])
let oldModelValue = cloneDeep(props.modelValue)
let newValue = cloneDeep(props.modelValue)

const editorConfig = ref({
  language: 'ru',
  toolbar: props.isReadOnly ? [] : toolbarOptions,
})

const isEditorFocused = () => {
  const el = document.querySelectorAll('.ck-editor__editable')
  return Array.from(el).some(
    (item) =>
      item.classList.contains('ck-focused') &&
      !item.classList.contains('ck-blurred'),
  )
}

const editorHtml = computed({
  get: () => props.modelValue,
  set: (value) => {
    isWatching.value = true
    emit('update:modelValue', value)
    newValue = cloneDeep(value)
    console.log(oldModelValue, newValue)
    if (oldModelValue !== newValue && isEditorFocused()) {
      push(props.resumeData)
    }
    oldModelValue = cloneDeep(value)
  },
})

const onEditorReady = (editor) => {
  editorInstance.value = editor

  readOnly.value = props.isReadOnly
  if (props.isReadOnly) {
    editor.enableReadOnlyMode(props.id)
    editorConfig.value.toolbar = []
  } else {
    editor.disableReadOnlyMode(props.id)
    editorConfig.value.toolbar = toolbarOptions.value
  }
}
</script>

<style>
.isReadOnly + .ck-editor .ck.ck-editor__main > .ck-editor__editable {
  background: inherit !important;
}

.ck.ck-balloon-panel.ck-powered-by-balloon {
  display: none !important;
  opacity: 0;
}

.ck-read-only p {
  font-size: inherit !important;
  font-family: inherit !important;
}

.ck-content a {
  color: blue;
  text-decoration: underline;
}

.ck-content ul {
  padding-left: 0;
  list-style: inside;
}
.ck-content ol {
  padding-left: 0;
  list-style: inside;
  list-style-type: decimal;
}

.ck-content > * {
  font-size: 0.75rem /* 12px */;
  line-height: 1rem /* 16px */;
}

@media (min-width: 768px) {
  .ck-content > * {
    font-size: 0.875rem !important;
    line-height: 1.25rem !important;
  }
}

.ck-editor .ck-editor__editable .ck-list-bogus-paragraph {
  display: inline;
}

.isReadOnly + .ck-editor .ck-editor__editable .ck-list-bogus-paragraph {
  display: inline;
}

.isReadOnly + .ck-editor ul {
  padding-left: 0;
  list-style: inside;
}

.list-disc .isReadOnly + .ck-editor ul {
  list-style: disc inside;
}

.list-none .isReadOnly + .ck-editor ul {
  list-style: none;
}

.list-decimal .isReadOnly + .ck-editor ol {
  list-style: decimal inside;
}

.list-decimal .ck-editor ol {
  list-style: decimal inside;
}

.list-disc .ck-editor ul {
  list-style: disc inside;
}

.isReadOnly + .ck-editor оl {
  padding-left: 0;
  list-style: inside;
}

.isReadOnly + .ck-editor .ck.ck-editor__top {
  border: 0;
  display: none;
}

.isReadOnly
  + .ck-editor
  .ck.ck-editor__main
  > .ck-editor__editable:not(.ck-focused) {
  border: 0;
  padding: 0;
  ul,
  ol {
    padding-left: 0;
  }
}

.ck-read-only.ck.ck-editor__editable_inline > :last-child {
  margin-bottom: 0;
}

.ck-read-only.ck.ck-editor__editable_inline > :first-child {
  margin-top: 0;
}

.ck.ck-editor__editable_inline {
  overflow: visible;
}
</style>
