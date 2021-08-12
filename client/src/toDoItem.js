export {
  ToDoItem,
  count
}

class ToDoItem {
  constructor(title, list, description, date, priority, notes, id, daysuntil) {
      this.title = title,
          this.list = list
      this.description = description,
          this.date = date,
          this.priority = priority,
          this.notes = notes,
          this.id = id
     // this.counter = counter
      this.daysuntil = daysuntil
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