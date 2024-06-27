<script lang="ts" setup>
  const route = useRoute()
  const router = useRouter()
  const boardStore = useBoardStore()

  const newColumnState = reactive({
    newColumnName: undefined,
  })

  const addColumn = (event) => {
    boardStore.addColumn(event.data.newColumnName)
    newColumnState.newColumnName = undefined
  }

  const isModalOpen = computed(() => {
    return route.name === "index-tasks-id"
  })

  const closeModal = () => {
    router.push({ name: "index" })
  }
</script>

<template>
  <div class="bg-emerald-500 board-wrapper">
    <main class="board">
      <BoardColumn
        v-for="(column, columnIdx) in boardStore.board.columns"
        :key="column.id"
        :column="column"
        :columnIdx="columnIdx"
      />
      <UContainer class="column">
        <UForm
          @submit="addColumn"
          :state="newColumnState"
        >
          <UInput
            type="text"
            placeholder="Create new column"
            icon="i-heroicons-plus"
            v-model="newColumnState.newColumnName"
          />
        </UForm>
      </UContainer>
    </main>
    <div
      v-show="isModalOpen"
      class="task-bg"
      @click.self="closeModal"
    >
      <NuxtPage :key="route.fullPath" />
    </div>
  </div>
</template>
