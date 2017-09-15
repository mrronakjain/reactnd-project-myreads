import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  moveBookToShelf = (shelf, book) => {
    BooksAPI.update(book, shelf).then((result) => {
      this.setState({
        books: this.state.books.map((b) => {
          if (b.id === book.id) {
            b.shelf = shelf
          }
          return b
        })
      })
    })
  }

  render() {
    const { books } = this.state;
    return (
      <div className='app'>
        <Route exact path='/' render={() => (
          <div className='list-books'>
            <div className='list-books-title'>
              <h1>MyReads</h1>
            </div>
            <div className='list-books-content'>
              <div>
                <div className='bookshelf'>
                  <h2 className='bookshelf-title'>Currently Reading</h2>
                  <div className='bookshelf-books'>
                    <ListBooks books={books} onMoveToShelf={this.moveBookToShelf} shelf='currentlyReading' />
                  </div>
                </div>
                <div className='bookshelf'>
                  <h2 className='bookshelf-title'>Want to Read</h2>
                  <div className='bookshelf-books'>
                    <ListBooks books={books} onMoveToShelf={this.moveBookToShelf} shelf='wantToRead' />
                  </div>
                </div>
                <div className='bookshelf'>
                  <h2 className='bookshelf-title'>Read</h2>
                  <div className='bookshelf-books'>
                    <ListBooks books={books} onMoveToShelf={this.moveBookToShelf} shelf='read' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
