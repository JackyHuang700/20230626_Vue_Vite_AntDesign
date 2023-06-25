<template>
  <template v-if="$props.type === ''">
    <a-skeleton v-bind="{ ..._attrs }" />
  </template>
  <template v-else-if="props.type === 'button'">
    <a-skeleton-button v-bind="{ ..._attrs, }" />
  </template>
  <template v-else-if="props.type === 'avatar'">
    <a-skeleton-avatar v-bind="{ ..._attrs, }" />
  </template>
  <template v-else-if="props.type === 'input'">
    <a-skeleton-input v-bind="{ ..._attrs, }" />
  </template>
</template>
<script setup lang="ts">
import { computed, reactive, useAttrs } from 'vue'
import type { SkeletonProps } from 'ant-design-vue'

interface IProps {
  // value: TValue
  // type?: IAntDSkeleton['type']
}

const props = defineProps<IProps & IAntDSkeleton['attrs']>()
const attrs = useAttrs()
const _attrs = computed(() => {
  return {
    ...attrs,
    class: props.class,
    active: props.active,
    loading: props.loading,
    title: props.title,
    avatar: props.avatar,
    paragraph: props.paragraph,
  }
})

</script>

<script lang="ts">
export default {
  name: 'AntDSkeleton'
}

export type TType = '' | 'button' | 'avatar' | 'input'


// type TValue = string
import { merge } from 'lodash-es'

interface IAntDSkeleton {
  // value: TValue
  attrs?: {
    type?: TType
    class?: string
    active?: SkeletonProps['active']
    loading?: SkeletonProps['loading']
    title?: SkeletonProps['title']
    avatar?: SkeletonProps['avatar']
    paragraph?: SkeletonProps['paragraph']
  }
}

export function useAntDSkeleton(_data_initConfig?: IAntDSkeleton): IAntDSkeleton {
  const data_defaultSettings = reactive<IAntDSkeleton>({
    // value: false,
    attrs: {
      type: '',
      active: true,
      loading: true
    }
  })
  const data_init = merge(data_defaultSettings, _data_initConfig)

  return data_init
}
</script>
<style scoped lang="css"></style>
