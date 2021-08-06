import {ToDoItem} from "./toDoItem.js"

class ListType extends ToDoItem {
  constructor(title, list, description, date, priority, notes, counter){
    super(title, list, description, date, priority, notes, counter)
  }
}

export{ListType}