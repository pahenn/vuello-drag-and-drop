import { defineStore } from "pinia"
import boardData from "~/data/board.json"
import uuid4 from "uuid4"

export const useBoardStore = defineStore(
  "boardStore",
  () => {
    const board = ref(boardData)

    const getTask = computed(() => {
      return (taskId) => {
        for (const column of board.value.columns) {
          const task = column.tasks.find((task) => task.id === taskId)
          if (task) {
            return task
          }
        }
      }
    })
    function addTask({ columnIdx, taskName }) {
      board.value.columns[columnIdx].tasks.push({
        id: uuid4(),
        name: taskName,
        description: "",
      })
    }

    function deleteTask(taskId) {
      for (const column of board.value.columns) {
        const taskIdx = column.tasks.findIndex((task) => task.id === taskId)
        if (taskIdx !== -1) {
          column.tasks.splice(taskIdx, 1)
          return
        }
      }
    }

    function moveTask({
      fromTaskIndex,
      toTaskIndex,
      fromColumnIndex,
      toColumnIndex,
    }) {
      const task = board.value.columns[fromColumnIndex].tasks.splice(
        fromTaskIndex,
        1
      )[0]

      board.value.columns[toColumnIndex].tasks.splice(toTaskIndex, 0, task)
    }

    function addColumn(columnName) {
      board.value.columns.push({
        id: uuid4(),
        name: columnName,
        tasks: [],
      })
    }

    function deleteColumn(columnIdx) {
      board.value.columns.splice(columnIdx, 1)
    }

    function moveColumn({ fromColumnIndex, toColumnIndex }) {
      const column = board.value.columns.splice(fromColumnIndex, 1)[0]
      board.value.columns.splice(toColumnIndex, 0, column)
    }

    return {
      board,
      getTask,
      deleteTask,
      moveTask,
      addColumn,
      deleteColumn,
      moveColumn,
      addTask,
    }
  },
  { persist: true }
)
