// ./reducers/bookReducer.ts

import { v4 as uuid } from 'uuid';
import { Book, Action } from '../types';

export const bookReducer = (state: Book[], action: Action): Book[] => {
  switch (action.type) {
    case 'ADD_BOOK':
      return [
        ...state,
        {
          title: action.book.title,
          author: action.book.author,
          checkedOut: false,
          isbn: uuid(),
        },
      ];
    case 'ISSUE_BOOK':
      return state.map((book) =>
        book.isbn === action.isbn ? { ...book, checkedOut: true } : book
      );
    case 'RETURN_BOOK':
      return state.map((book) =>
        book.isbn === action.isbn ? { ...book, checkedOut: false } : book
      );
    case 'REMOVE_BOOK':
      return state.filter((book) => book.isbn !== action.isbn);
    default:
      return state;
  }
};
