export {
  ToDoList
}


class ToDoList {
  constructor() {
      this._toDoList = []
  }
  getToDoList() {
      return this._toDoList
  }
  placeToDoItemInMyArray(toDoItem) {
      this.getToDoList().push(toDoItem)
  }
  deleteToDo(dataNumOfCurrentToDo) {
      const newArrayOfToDoItems = this.getToDoList().filter(toDo => toDo.counter != dataNumOfCurrentToDo)
      this.setDoList(newArrayOfToDoItems)
  }
  setDoList(newToDoList) {
      this._toDoList = newToDoList
  }
}


