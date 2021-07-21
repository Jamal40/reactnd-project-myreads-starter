import React, { Component } from "react";
import "./App.css";

class Book extends Component {
  render() {
    const book = this.props.book;
    const updateCurrentShelf = this.props.updateCurrentShelf;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${
                  book.imageLinks ? book.imageLinks.thumbnail : ""
                })`,
              }}
            ></div>
            <div className="book-shelf-changer">
              <select
                onChange={(event) =>
                  updateCurrentShelf(book, event.target.value)
                }
                defaultValue={book.shelf}
              >
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title ? book.title : ""}</div>
          <div className="book-authors">
            {book.authors ? book.authors.join(", ") : ""}
          </div>
        </div>
      </li>
    );
  }
}

export default Book;
