// ./contexts/BookContext.tsx

import React, { createContext, useReducer, useEffect, ReactNode, Dispatch } from "react";
import { bookReducer } from "../reducers/bookReducer";
import { Book, Action } from "../types";

type BookContextType = {
  books: Book[];
  dispatch: Dispatch<Action>;
};

const initialBooks: Book[] = [];

export const BookContext = createContext<BookContextType | undefined>(undefined);

const BookContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [books, dispatch] = useReducer(bookReducer, initialBooks, () => {
    const localData = localStorage.getItem("books");
    return localData ? JSON.parse(localData) : initialBooks;
  });

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  return <BookContext.Provider value={{ books, dispatch }}>{children}</BookContext.Provider>;
};

export default BookContextProvider;
