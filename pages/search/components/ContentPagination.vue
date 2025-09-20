<template>
  <div v-if="total > 0" class="pagination-container">
    <v-pagination
      v-model="currentPage"
      :length="Math.ceil(total / pageSize)"
      :total-visible="7"
      rounded="circle"
      color="primary"
      @update:model-value="onPageChange"
    />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  total: number
  pageSize: number
  modelValue: number
}

interface Emits {
  (e: 'update:modelValue', value: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const currentPage = computed({
  get: () => props.modelValue,
  set: (value: number) => emit('update:modelValue', value)
})

const onPageChange = (page: number) => {
  emit('update:modelValue', page)
}
</script>

<style lang="scss" scoped>
.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}
</style>
