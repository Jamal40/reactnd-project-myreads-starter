import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Search from "./Search";
import BookShelves from "./BookShelves";
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {
  state = {
    books: [],
    searchResultBooks: [],
    filterResultBooks: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  updateCurrentShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf;
      this.setState(() => ({
        books: this.state.books
          .filter((singleBook) => singleBook.id !== book.id)
          .concat([book]),
      }));
    });
  };

  searchByQuery = (query, searchResultBooks) => {
    if (query !== "") {
      this.setState({ query: query });

      const books = this.state.books;

      BooksAPI.search(query, 100)
        .then((searchResultBooks) => {
          if (searchResultBooks.error) {
            this.setState({ searchResultBooks: [] });
          } else {
            searchResultBooks.map((filterResultBooks) => {
              let booksExistedInShelf = books.find(
                (singleBook) => singleBook.id === filterResultBooks.id
              );
              if (booksExistedInShelf) {
                filterResultBooks.shelf = booksExistedInShelf.shelf;
              } else {
                filterResultBooks.shelf = "none";
              }
            });
            this.setState({ searchResultBooks: searchResultBooks });
          }
        })
        .catch((e) => {
          this.setState({ searchResultBooks: [] });
        });
    }
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={({}) => (
            <BookShelves
              books={this.state.books}
              updateCurrentShelf={this.updateCurrentShelf}
            />
          )}
        />

        <Route
          exact
          path="/search"
          render={({}) => (
            <Search
              searchResultBooks={this.state.searchResultBooks}
              updateCurrentShelf={this.updateCurrentShelf}
              searchByQuery={this.searchByQuery}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
