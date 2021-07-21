import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import BookDivision from "./BookDivision";
import Button from "@material-ui/core/Button";

class BookShelves extends React.Component {
  render() {
    const books = this.props.books;
    const updateCurrentShelf = this.props.updateCurrentShelf;
    const shlefTypes = ["currentlyReading", "wantToRead", "read"];
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>Your Books</h1>
        </div>

        <div className="list-books-content">
          {shlefTypes.map((type) => (
            <div>
              <BookDivision
                updateCurrentShelf={updateCurrentShelf}
                books={books}
                shelfType={type}
              />
            </div>
          ))}
        </div>

        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default BookShelves;
