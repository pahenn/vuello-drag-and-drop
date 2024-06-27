import { defineStore } from "pinia"
import boardData from "~/data/board.json"
import uuid4 from "uuid4"


export const useBoardStore = defineStore("boardStore", () => {
  const board = ref(boardData)

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

  function addTask(columnName, taskName) {
    const column = board.value.columns.find((c) => c.name === columnName)
    column.tasks.push({
      id: uuid4(),
      name: taskName,
      description: "",
    })
  }



  return {
    board,
    addColumn,
    deleteColumn,
    addTask
  }
}, { persist: true })
