import React, { useContext, useState } from "react";
import UserDashboard from "../components/UserDashboard";
import { BookContext } from "../contexts/BookContext";
import withErrorBoundary from "../hoc/withErrorBoundary";
import { logout } from "../auth";
import { useToast } from "../contexts/ToastContext";

const UserDashboardContainer: React.FC = () => {
  const { books, dispatch } = useContext(BookContext)!; // Type assertion
  const { showToast } = useToast();

  const handleIssueBook = (isbn: string) => {
    dispatch({ type: "ISSUE_BOOK", isbn });
    showToast("Book Issued Successfully!");
  };

  const handleReturnBook = (isbn: string) => {
    dispatch({ type: "RETURN_BOOK", isbn });
    showToast("Book Returned Successfully!");
  };

  const [showIssuedOnly, setShowIssuedOnly] = useState(false);

  const toggleShowIssuedOnly = () => {
    setShowIssuedOnly(!showIssuedOnly);
  };

  const filteredBooks = showIssuedOnly ? books.filter((book) => book.checkedOut) : books;

  return (
    <div>
      <UserDashboard
        books={filteredBooks}
        handleIssueBook={handleIssueBook}
        handleReturnBook={handleReturnBook}
      />
      <button
        className='dispatch-button'
        onClick={toggleShowIssuedOnly}
      >
        {showIssuedOnly ? "Show All Books" : "Show Issued Books Only"}
      </button>
      <button
        className='logout-button'
        onClick={logout}
      >
        Logout
      </button>
      <br />
    </div>
  );
};

export default withErrorBoundary(UserDashboardContainer);
