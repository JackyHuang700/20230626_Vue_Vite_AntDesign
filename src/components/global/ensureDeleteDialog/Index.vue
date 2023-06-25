<template>
  <!-- v-model:visible="modal_ensure.visible" -->
  <AntDModal
    v-model:visible="modelValue_modal_ensure"
    v-bind="{ ...modal_ensure.attrs }"
    v-on="{ ...modal_ensure.on }"
  >
    <template #title>
      <template v-if="slot_model_ensureTitle">
        <slot name="modelEnsureTitle" />
      </template>
      <template v-else> 刪除此項目？ </template>
    </template>

    <template #default>
      <p class="mb-3 text-[15px] text-zinc-500">
        <template v-if="slot_describeText">
          <slot name="describeText"></slot>
        </template>
        <template v-else> 確定刪除？一旦刪除將無法復原！ </template>
      </p>
      <AntDCheckbox
        v-model:checked="modelValue_chk_ensure"
        v-bind="{ ...chk_ensure.attrs }"
        v-on="{ ...chk_ensure.on }"
      />
    </template>
  </AntDModal>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

import AntDModal, { useAntDModal } from '@/components/antDesignVue/modal/AntDModal.vue'
import AntDCheckbox, { useAntDCheckbox } from '@/components/antDesignVue/checkbox/AntDCheckbox.vue'

interface IProps {
  modal_visible: boolean
  chk_checked: boolean
}
const props = defineProps<IProps>()

type TEmit = {
  'update:modal_visible': [value: boolean]
  'update:chk_checked': [value: boolean]
  ensureDeleteEvent: []
  afterEnsureDeleteEvent: []
}

const emit = defineEmits<TEmit>()

const slots = useSlots()

const slot_describeText = computed(() => (slots.describeText ? slots.describeText() : undefined))
const slot_model_ensureTitle = computed(() =>
  slots.modelEnsureTitle ? slots.modelEnsureTitle() : undefined
)

const modelValue_modal_ensure = computed({
  get() {
    return props.modal_visible
  },
  set(value) {
    emit('update:modal_visible', value)
  }
})
const modelValue_chk_ensure = computed({
  get() {
    return props.chk_checked
  },
  set(value) {
    emit('update:chk_checked', value)
  }
})

const modal_ensure = useAntDModal({
  visible: false,
  attrs: {
    class: '',
    okText: '確認',
    cancelText: '取消',
    okButtonProps: {
      danger: true,
      disabled: true
    },
    cancelButtonProps: {}
  },
  on: {
    async ok(_) {
      modal_ensure.attrs.okButtonProps.loading = true

      emit('ensureDeleteEvent')

      // modelValue_modal_ensure.visible = false
      emit('update:modal_visible', false)
      emit('update:chk_checked', false)
      modal_ensure.attrs.okButtonProps.loading = false
    },
    cancel(_) {
      function_closeDialogDelete()
    }
  }
})

const slot_chk_ensureText = computed(() =>
  slots.chkEnsureText ? slots.chkEnsureText() : undefined
)

const chk_ensure = useAntDCheckbox({
  checked: false,
  attrs: {
    // text: '我理解刪除後將無法復原，我仍要刪除！',
    text: computed(() =>
      slot_chk_ensureText.value
        ? slots.chkEnsureText()[0].children
        : '我理解刪除後將無法復原，我仍要刪除！'
    ),
    class: 'ensure'
  },
  on: {
    change(e) {
      const _checked = e.target.checked
      if (_checked) {
        modal_ensure.attrs.okButtonProps.disabled = false
      } else {
        modal_ensure.attrs.okButtonProps.disabled = true
      }
    }
  }
})

const function_closeDialogDelete = async () => {
  modal_ensure.visible = false
  chk_ensure.checked = false
  modal_ensure.attrs.okButtonProps.disabled = true
}

defineExpose({
  function_closeDialogDelete
})
</script>
<script lang="ts">
export default {
  name: 'EnsureDeleteDialog'
}
</script>
<style scoped>
.ant-checkbox-wrapper.ensure {
  @apply text-zinc-500;
}
</style>
