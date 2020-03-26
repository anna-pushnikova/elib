export default class Book {
  constructor(
    title,
    author,
    description,
    tags,
    completed,
    editing,
    id = null
  ) {
    this.title = title,
    this.author = author,
    this.description = description,
    this.tags = tags,
    this.completed = completed,
    this.editing = editing,
    this.id = id
  }
}

