export {
  ToDoItem,
  count
}

class ToDoItem {
  constructor(title, list, description, dueDate, priority, notes, id, daysUntil) {
      this.title = title,
          this.list = list
      this.description = description,
          this.dueDate = dueDate,
          this.priority = priority,
          this.notes = notes,
          this.id = id
     // this.counter = counter
      this.daysUntil = daysUntil
  }
  static counting() {
      let counter = 1
      return function() {
          return counter++
      }
  }
  getCounter() {
      return this.counter
  }
}
let count = ToDoItem.counting()