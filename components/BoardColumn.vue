<script lang="ts" setup>
  defineProps({
    column: Object,
    columnIdx: Number,
  })
  const boardStore = useBoardStore()
  const editNameState = ref(false)

  const newTaskName = ref("")

  // const addTask = (event) => {
  //   boardStore.addTask(event.data.column, event.data.task)
  //   addDataState.value.newTaskName = ""
  // }
  function deleteColumn(columnIdx) {
    boardStore.deleteColumn(columnIdx)
  }

  async function goToTask(taskId) {
    await navigateTo(`/tasks/${taskId}`)
  }
</script>

<template>
  <UContainer>
    <div class="column-header mb-4">
      <div>
        <UInput
          v-if="editNameState"
          type="text"
          v-model="column.name"
        />
        <h2 v-else>
          {{ column.name }}
        </h2>
      </div>
      <div class="space-x-2">
        <UButton
          icon="i-heroicons-pencil-square"
          @click="editNameState = !editNameState"
        />
        <UButton
          color="red"
          icon="i-heroicons-trash"
          @click="deleteColumn(columnIdx)"
        />
      </div>
    </div>
    <ul>
      <li
        v-for="task in column.tasks"
        :key="task.id"
      >
        <UCard
          class="mb-4 cursor-pointer"
          @click="goToTask(task.id)"
        >
          <strong>{{ task.name }}</strong>
          <p>{{ task.description }}</p>
        </UCard>
      </li>
      <!-- <li>
        <UCard>
          <UForm @submit="addTask">
            <UInput
              type="text"
              placeholder="Create new task"
              icon="i-heroicons-plus"
              v-model="addDataState.newTaskName"
            />
          </UForm>
        </UCard>
      </li> -->
    </ul>
  </UContainer>
</template>
