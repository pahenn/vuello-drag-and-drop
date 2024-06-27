<script lang="ts" setup>
  import z from "zod"

  const props = defineProps({
    column: Object,
    columnIdx: Number,
  })
  const boardStore = useBoardStore()
  const editNameState = ref(false)

  const newTaskName = ref("")

  const newTaskState = reactive({
    newTaskName: undefined,
  })

  const addTask = () => {
    boardStore.addTask({
      columnIdx: props.columnIdx,
      taskName: newTaskName.value,
    })
    newTaskName.value = ""
  }
  function deleteColumn(columnIdx: Number) {
    boardStore.deleteColumn(columnIdx)
  }

  async function goToTask(taskId: string) {
    await navigateTo(`/tasks/${taskId}`)
  }

  function pickupTask(event, { fromTaskIndex, fromColumnIndex }) {
    event.dataTransfer.effectAllowed = "move"
    event.dataTransfer.dropEffect = "move"
    event.dataTransfer.setData("type", "task")
    event.dataTransfer.setData("from-column-index", fromColumnIndex)
    event.dataTransfer.setData("from-task-index", fromTaskIndex)
  }
  function dropItem(event, { toColumnIndex, toTaskIndex }) {
    const type = event.dataTransfer.getData("type")
    const fromColumnIndex = event.dataTransfer.getData("from-column-index")

    if (type === "task") {
      const fromTaskIndex = event.dataTransfer.getData("from-task-index")

      boardStore.moveTask({
        fromTaskIndex,
        toTaskIndex,
        fromColumnIndex,
        toColumnIndex,
      })
    } else if (type === "column") {
      const fromColumnIndex = event.dataTransfer.getData("from-column-index")
      boardStore.moveColumn({ fromColumnIndex, toColumnIndex })
    }
  }

  function pickupColumn(event, fromColumnIndex) {
    event.dataTransfer.effectAllowed = "move"
    event.dataTransfer.dropEffect = "move"
    event.dataTransfer.setData("type", "column")
    event.dataTransfer.setData("from-column-index", fromColumnIndex)
  }
</script>

<template>
  <UContainer
    class="column"
    draggable="true"
    @dragstart.self="pickupColumn($event, columnIdx)"
    @dragenter.prevent
    @dragover.prevent
    @drop.stop="dropItem($event, { toColumnIndex: columnIdx })"
  >
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
        v-for="(task, taskIdx) in column.tasks"
        :key="task.id"
      >
        <UCard
          class="mb-4 cursor-pointer"
          @click="goToTask(task.id)"
          draggable="true"
          @dragstart="
            pickupTask($event, {
              fromTaskIndex: taskIdx,
              fromColumnIndex: columnIdx,
            })
          "
          @drop.stop="
            dropItem($event, { toColumnIndex: columnIdx, toTaskIndex: taskIdx })
          "
        >
          <strong>{{ task.name }}</strong>
          <p>{{ task.description }}</p>
        </UCard>
      </li>
      <li>
        <UCard>
          <UForm
            :state="newTaskState"
            @submit="addTask"
          >
            <UInput
              type="text"
              placeholder="Create new task"
              icon="i-heroicons-plus"
              v-model="newTaskName"
            />
          </UForm>
        </UCard>
      </li>
    </ul>
  </UContainer>
</template>
