<script setup lang="ts">
import { reactive } from 'vue'

import TheWelcome from '../components/TheWelcome.vue'

import AntDSwitch, { useAntDSwitch } from '@/components/antDesignVue/switch/AntDSwitch.vue'
import AntDTabs, { useAntDTabs } from '@/components/antDesignVue/tabs/AntDTabs.vue'
import AntDSkeleton, { useAntDSkeleton } from '@/components/antDesignVue/skeleton/AntDSkeleton.vue'

import EnsureDeleteDialog from '@/components/global/ensureDeleteDialog/Index.vue'

const switch_tem = useAntDSwitch({
  checked: false,
  attrs: {
    class: '',
    loading: false,
    disabled: false
  },
  on: {
    change(checked, e) {}
  }
})

const tabs_tem = useAntDTabs({
  activeKey: '',
  attrs: {
    class: ''
  },
  on: {}
})

const skeleton_tem = useAntDSkeleton({
  attrs: {
    class: '',
    paragraph: {
      rows: 10
    }
  }
})

const ensureDeleteDialog = reactive({
  modal_visible: false,
  chk_checked: false,
  on: {
    ensureDeleteEvent: () => {
    },
    afterEnsureDeleteEvent: () => {
    }
  }
})
ensureDeleteDialog.modal_visible = true
</script>

<template>
  <main>
    <template v-if="false">
      <TheWelcome />
    </template>
  </main>
  <section class="switch">
    <AntDSwitch
      v-model:checked="switch_tem.checked"
      v-bind="{ ...switch_tem.attrs }"
      v-on="{ ...switch_tem.on }"
    />
  </section>
  <section class="tabs">
    <AntDTabs
      v-model:activeKey="tabs_tem.activeKey"
      v-bind="{ ...tabs_tem.attrs }"
      v-on="{ ...tabs_tem.on }"
    >
      <a-tab-pane key="" tab="Tab 1">Content of Tab Pane 1</a-tab-pane>
      <a-tab-pane key="2" tab="Tab 2" force-render>Content of Tab Pane 2</a-tab-pane>
    </AntDTabs>
  </section>
  <section class="skeleton">
    <!-- <a-skeleton avatar :paragraph="{ rows: 4 }" active/> -->

    <AntDSkeleton v-bind="{ ...skeleton_tem.attrs }" />
  </section>
  <section class="ensureDeleteDialog">
    <EnsureDeleteDialog
      v-model:modal_visible="ensureDeleteDialog.modal_visible"
      v-model:chk_checked="ensureDeleteDialog.chk_checked"
      v-on="{ ...ensureDeleteDialog.on }"
    >
      <!-- FIXME: -->
      <!-- <template #modelEnsureTitle>
      <span class="text-red-500">刪除此項目？</span>
    </template> -->
      <!-- <template #describeText>{{ 'ookk' }}</template> -->
      <!-- <template #chkEnsureText>{{ 'ookk' }}</template> -->
      <!-- FIXME: -->
    </EnsureDeleteDialog>
  </section>
</template>
