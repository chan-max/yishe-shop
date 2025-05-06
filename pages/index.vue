<script lang="ts" setup>
const { awesome } = useAppConfig()
definePageMeta({ layout: 'page' })
useHead({ titleTemplate: '', title: awesome?.name || '衣设服装设计' })

</script>

<template>
  <AwesomeWelcome :with-alert="true" />
</template>
