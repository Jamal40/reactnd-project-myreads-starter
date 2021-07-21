import React, { Component } from "react";
import "./App.css";
import Book from "./Book";

class BookDivision extends Component {
  huminizeTheSentence(word) {
    //capitalize the first letter
    word = word[0].toUpperCase() + word.substr(1, word.length);
    //Adding spaces at capital letters
    for (let i = 0; i < word.length; i++) {
      if (word[i] == word[i].toUpperCase()) {
        word = word.substr(0, i) + " " + word.substr(i, word.length);
        i++;
      }
    }
    return word;
  }
  render() {
    const { books, updateCurrentShelf, shelfType } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">
          {this.huminizeTheSentence(shelfType)}
        </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books
              .filter((book) => book.shelf === shelfType)
              .map((book) => (
                <Book
                  key={book.id}
                  book={book}
                  updateCurrentShelf={updateCurrentShelf}
                />
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookDivision;
