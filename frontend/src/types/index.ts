// ./types/index.ts

export interface Book {
  title: string;
  author: string;
  checkedOut: boolean;
  isbn: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  userId?: number;
}

export type Action =
  | { type: "ADD_BOOK"; book: { title: string; author: string } }
  | { type: "ISSUE_BOOK"; isbn: string }
  | { type: "RETURN_BOOK"; isbn: string }
  | { type: "REMOVE_BOOK"; isbn: string };

export interface User {
  id: number;
  username: string;
}

export interface UserListProps {
  users: User[];
  addUser: (user: { username: string; password: string }) => void;
  removeUser: (username: string) => void;
}
