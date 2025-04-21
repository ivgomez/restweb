import { Request, Response } from "express";

const todos = [
  {
    id: 1,
    title: "Todo 1",
    completedAt: new Date(),
  },
  {
    id: 2,
    title: "Todo 2",
    completedAt: new Date(),
  },
];

export class TodosController {
  //* DI
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    res.json(todos);
    return;
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid id" });
      return;
    }
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) {
      res.status(404).json({ message: `Todo with id ${id} not found` });
      return;
    }
    res.json(todo);
    return;
  };

  public createTodo = (req: Request, res: Response) => {
    const { title } = req.body;
    if (!title) {
      res.status(400).json({ message: "Text is required" });
      return;
    }
    const newTodo = { id: todos.length + 1, title, completedAt: new Date() };
    todos.push(newTodo);
    res.status(201).json(newTodo);
    return;
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid id" });
      return;
    }
    const { title, completedAt } = req.body;
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) {
      res.status(404).json({ message: `Todo with id ${id} not found` });
      return;
    }
    if (title) {
      todo.title = title;
    }
    if (completedAt || completedAt === null) {
      todo.completedAt = completedAt;
    }
    res.json(todo);
    return;
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid id" });
      return;
    }
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      res.status(404).json({ message: `Todo with id ${id} not found` });
      return;
    }
    todos.splice(todoIndex, 1);
    res.status(200).json({ message: `Todo with id ${id} deleted` });
    return;
  };
}
