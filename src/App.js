import React from 'react'
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
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

	updateShelf = (shelf, book) => {
		BooksAPI.update(book, shelf).then(response => {

			// set shelf for new or updated book
			book.shelf = shelf

			// get list of books without updated or new book
			var updatedBooks = this.state.books.filter(b => b.id !== book.id)

			// add book to array and set new state
			updatedBooks.push(book);
			this.setState({ books: updatedBooks })
		})
	}

	render() {
		const { books } = this.state
		const shelfTypes = [{ type: 'currentlyReading', title: 'Currently Reading' },
		{ type: 'wantToRead', title: 'Want to Read' },
		{ type: 'read', title: 'Read' }]
		return (
			<div className='app'>
				<Route path='/search' render={() => (
					<SearchBooks shelfBooks={books} updateShelf={this.updateShelf} />
				)} />
				<Route exact path='/' render={() => (
					<div className='list-books'>
						<div className='list-books-title'>
							<h1>MyReads</h1>
						</div>
						<div className='list-books-content'>
							{shelfTypes.map((shelf, index) => {
								const shelfBooks = books.filter(book => book.shelf === shelf.type)
								return (
									<div className="bookshelf" key={index}>
										<h2 className="bookshelf-title">{shelf.title}</h2>
										<div className="bookshelf-books">
											<ListBooks
												books={shelfBooks}
												updateShelf={this.updateShelf}
											/>
										</div>
									</div>
								)
							})}
						</div>
						<div className='open-search'>
							<Link to='/search'>Add a book</Link>
						</div>
					</div>
				)} />
			</div>
		)
	}
}

export default BooksApp
