<template>
  <a-checkbox v-model:checked="modelValue"
   v-bind="{
     ...$attrs,
     ...props,
   }"
  >{{ props?.text || '' }}</a-checkbox>
 </template>
 <script setup lang="ts">
 import { computed, reactive,  } from 'vue'
 import type { CheckboxProps } from 'ant-design-vue'

 interface IProps {
   checked: TValue
 }

 const props = defineProps<IProps & IAntDComponent['attrs'] & IAntDComponent['on']>()

 type TEmit = {
   'update:checked': [value: TValue]
 }

 const emit = defineEmits<TEmit>()

 const modelValue = computed({
   get() {
     return props.checked
   },
   set(value) {
     emit('update:checked', value)
   },
 })
 </script>

 <script lang="ts">
 export default {
   name: 'AntDCheckbox',
 }
 type TValue = CheckboxProps['checked']
 import { merge } from 'lodash-es'

 interface IAntDComponent {
   checked: TValue
   attrs?: {
     text?: string
     class?: string
     disabled? : CheckboxProps['disabled']
     value? : CheckboxProps['value']
     autofocus? : CheckboxProps['autofocus']
   }
   on?: {
     change?: CheckboxProps['onChange']
   }
 }

 export function useAntDCheckbox(_data_initConfig?: IAntDComponent): IAntDComponent {
   const data_defaultSettings = reactive<IAntDComponent>({
     checked: false,
     attrs: {
       text: '',
     },
   })
   const data_init = merge(data_defaultSettings, _data_initConfig)
   if (_data_initConfig?.checked !== undefined) {
     data_init.checked = _data_initConfig.checked
   }

   return data_init
 }
 </script>
 <style scoped lang="css">
 </style>