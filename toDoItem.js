export{ToDoItem, count}

class ToDoItem {
  constructor(title, list, description, dueDate, priority, notes, counter){
    this.title = title,
    this.list = list
    this.description = description,
    this.dueDate = dueDate,
    this.priority = priority,
    this.notes = notes
    this.counter = counter
  }
  static counting (){
    let counter = 0
    return function (){
      return counter++
    }
  }
  getCounter(){
    return this.counter
  }
}
let count =  ToDoItem.counting()

