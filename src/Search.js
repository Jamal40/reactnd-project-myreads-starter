import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import Book from "./Book";
import { DebounceInput } from "react-debounce-input";

class Search extends React.Component {
  state = {
    query: "",
  };

  updateQuery = (query) => {
    this.setState({ query: query.trim() });
  };

  render() {
    const { searchResultBooks, searchByQuery, updateCurrentShelf } = this.props;
    const { query } = this.state;

    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/" className="close-search">
              Close
            </Link>

            <form
              className="search-books-input-wrapper"
              onChange={(event) => searchByQuery(event.target.value)}
            >
              <DebounceInput
                debounceTimeout={100}
                type="text"
                placeholder="Search by title or author"
                value={query}
                onChange={(event) => this.updateQuery(event.target.value)}
              />
            </form>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>

        <div className="bookshelf">
          <div className="bookshelf-books">
            <ol className="books-grid">
              {searchResultBooks.map((book) => (
                <Book
                  key={book.id}
                  book={book}
                  updateCurrentShelf={updateCurrentShelf}
                />
              ))}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
