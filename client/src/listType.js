import {ToDoItem} from "./toDoItem.js"

class ListType extends ToDoItem {
  constructor(title, list, description, date, priority, notes, id){
    super(title, list, description, date, priority, notes, id)
  }
}

export{ListType}