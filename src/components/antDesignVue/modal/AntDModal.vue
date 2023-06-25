<template>
  <a-modal v-model:visible="modelVisible" v-bind="{ ...$attrs, ...props }">
    <template #title v-if="slot_title">
      <h3 class="ant-modal-title">
        <slot name="title" />
      </h3>
    </template>

    <template #default>
      <section class="ro-ant-modal-body">
        <slot name="default" />
      </section>
    </template>

    <template #footer v-if="slot_footer">
      <slot name="footer" />
    </template>
  </a-modal>
</template>
<script setup lang="ts">
import { computed, reactive, useSlots } from 'vue'
import type { ModalProps } from 'ant-design-vue'

interface IProps {
  visible: TValue
}

const props = defineProps<IProps & IAntDComponent['attrs'] & IAntDComponent['on']>()

type TEmit = {
  'update:visible': [value: TValue]
}

const emit = defineEmits<TEmit>()
const slots = useSlots()

const slot_title = computed(() => (slots.title ? slots.title() : undefined))
const slot_footer = computed(() => (slots.footer ? slots.footer() : undefined))

const modelVisible = computed({
  get() {
    return props.visible
  },
  set(value) {
    emit('update:visible', value)
  },
})
</script>

<script lang="ts">
export default {
  name: 'AntDModal',
}

import { merge } from 'lodash-es'
type TValue = boolean

interface IAntDComponent {
  visible: TValue
  attrs?: {
    class?: string
    width?: ModalProps['width']
    okText?: ModalProps['okText']
    cancelText?: ModalProps['cancelText']
    okButtonProps?: ModalProps['okButtonProps']
    cancelButtonProps?: ModalProps['cancelButtonProps']
    okType?: ModalProps['okType']
    zIndex?: ModalProps['zIndex']
    closable?: ModalProps['closable']
  }
  on?: {
    ok?: ModalProps['onOk']
    cancel?: ModalProps['onCancel']
  }
}

export function useAntDModal(_data_initConfig?: IAntDComponent): IAntDComponent {
  const data_defaultSettings = reactive<IAntDComponent>({
    visible: false,
    attrs: {},
  })
  const data_init = merge(data_defaultSettings, _data_initConfig)
  if (_data_initConfig?.visible !== undefined) {
    data_init.visible = _data_initConfig.visible
  }

  return data_init
}
</script>
<style scoped lang="css"></style>