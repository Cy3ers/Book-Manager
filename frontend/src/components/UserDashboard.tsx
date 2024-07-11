import React from "react";
import { Book } from "../types";

interface UserDashboardProps {
  books: Book[];
  handleIssueBook: (isbn: string) => void;
  handleReturnBook: (isbn: string) => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ books, handleIssueBook, handleReturnBook }) => {
  if (books.length === 0) {
    return <h2 className='navbar'>No Books</h2>;
  }
  return (
    <div>
      <h1 className='navbar'>User Dashboard</h1>
      <div className='book-list'>
        <ul>
          {books.map((book: Book) => (
            <li key={book.isbn}>
              <div className='title'>{book.title}</div>
              <div className='author'>{book.author}</div>
              <div className='isbn'>{book.isbn}</div>
              <div className='issued'>{book.checkedOut ? "Checked Out" : "Available"}</div>
              <div>
                {book.checkedOut ? (
                  <button
                    className='dispatch-button'
                    onClick={() => handleReturnBook(book.isbn)}
                  >
                    Return Book
                  </button>
                ) : (
                  <button
                    className='dispatch-button'
                    onClick={() => handleIssueBook(book.isbn)}
                  >
                    Check Out
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <br />
    </div>
  );
};

export default UserDashboard;
