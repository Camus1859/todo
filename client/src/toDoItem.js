export { ToDoItem };

class ToDoItem {
  constructor(title, list, description, date, priority, notes, id, daysuntil) {
    (this.title = title), (this.list = list);
    (this.description = description), (this.date = date), (this.priority = priority), (this.notes = notes), (this.id = id);
    this.daysuntil = daysuntil;
  }
}
