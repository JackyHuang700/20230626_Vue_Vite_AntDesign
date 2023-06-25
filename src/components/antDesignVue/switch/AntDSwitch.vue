<template>
  <a-switch v-model:checked="modelValue" v-bind="{...$attrs, ...props}"/>
</template>
<script setup lang="ts">
import { computed, reactive } from 'vue'
import type { SwitchProps } from 'ant-design-vue'

interface IProps {
  checked: TValue
}

const props = defineProps<IProps & IAntDSwitch['attrs'] & IAntDSwitch['on']>()

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
  name: 'AntDSwitch',
}
type TValue = SwitchProps['checked']
import { merge } from 'lodash-es'

interface IAntDSwitch {
  checked: TValue
  attrs?: {
    class?: string
    size?: SwitchProps['size']
    loading?: SwitchProps['loading']
    disabled?: SwitchProps['disabled']
    autofocus?: SwitchProps['autofocus']
    checkedValue?: SwitchProps['checkedValue']
  }
  on?: {
    change?: SwitchProps['onChange']
    click?: SwitchProps['onClick']
    blue?: SwitchProps['onBlur']
  }
}

export function useAntDSwitch(_data_initConfig?: IAntDSwitch): IAntDSwitch {
  const data_defaultSettings = reactive<IAntDSwitch>({
    checked: false,
    attrs: {
      size: 'default'
    },
  })
  const data_init = merge(data_defaultSettings, _data_initConfig)
  if (_data_initConfig?.checked !== undefined) {
    data_init.value = _data_initConfig.checked
  }

  return data_init
}
</script>
<style scoped lang="css">
</style>