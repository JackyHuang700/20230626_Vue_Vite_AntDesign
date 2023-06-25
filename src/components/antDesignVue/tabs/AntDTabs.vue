<template>
  <a-tabs v-model:activeKey="modelValue" v-bind="{ ...$attrs, ...props }">
    <slot name="default" />
  </a-tabs>
</template>
<script setup lang="ts">
import { computed, reactive } from 'vue'
import type { TabsProps } from 'ant-design-vue'

interface IProps {
  activeKey: TValue
}

const props = defineProps<IProps & AntDTabs['attrs'] & AntDTabs['on']>()

type TEmit = {
  'update:activeKey': [value: TValue]
}

const emit = defineEmits<TEmit>()

const modelValue = computed({
  get() {
    return props.activeKey
  },
  set(value) {
    emit('update:activeKey', value)
  }
})
</script>

<script lang="ts">
export default {
  name: 'AntDTabs'
}
type TValue = TabsProps['activeKey']
import { merge } from 'lodash-es'

interface AntDTabs {
  activeKey: TValue
  attrs?: {
    class?: string
    size?: TabsProps['size']
    centered?: TabsProps['centered']
    type?: TabsProps['type']
  }
  on?: {
    change?: TabsProps['onChange']
    edit?: TabsProps['onEdit']
    nextClick?: TabsProps['onNextClick']
    prevClick?: TabsProps['onPrevClick']
    tabClick?: TabsProps['onTabClick']
  }
}

export function useAntDTabs(_data_initConfig?: AntDTabs): AntDTabs {
  const data_defaultSettings = reactive<AntDTabs>({
    activeKey: '',
    attrs: {}
  })
  const data_init = merge(data_defaultSettings, _data_initConfig)
  if (_data_initConfig?.activeKey !== undefined) {
    data_init.value = _data_initConfig.activeKey
  }

  return data_init
}
</script>
<style scoped lang="css"></style>
