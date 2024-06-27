<script lang="ts" setup>
  const boardStore = useBoardStore()

  const newColumnName = ref("")

  const addColumn = (event) => {
    boardStore.addColumn(event.data)
    newColumnName.value = ""
  }
</script>

<template>
  <div class="board-wrapper">
    <main class="board">
      <BoardColumn
        v-for="(column, columnIdx) in boardStore.board.columns"
        :key="column.id"
        :column="column"
        :columnIdx="columnIdx"
        @deleteColumn="deleteColumn(columnIdx)"
        class="column"
      />
      <UContainer class="column">
        <UForm
          @submit="addColumn"
          :state="newColumnName"
        >
          <UInput
            type="text"
            placeholder="Create new column"
            icon="i-heroicons-plus"
            v-model="newColumnName"
          />
        </UForm>
      </UContainer>
    </main>
  </div>
</template>
