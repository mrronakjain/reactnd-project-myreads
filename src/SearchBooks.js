import React from 'react'
import { Link } from 'react-router-dom'
import { Debounce } from 'react-throttle'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'

class SearchBooks extends React.Component {
	static propTypes = {
		shelfBooks: PropTypes.array.isRequired,
		updateShelf: PropTypes.func.isRequired
	}

	state = {
		searchedBooks: [],
		query: '',
		searchErr: false
	}

	searchBooks = (event) => {
		const query = event.target.value.trim()

		// if user input => run the search
		if (query) {
			BooksAPI.search(query, 20).then((books) => {
				books.length > 0 ? this.setState({ searchedBooks: books, query: query, searchErr: false }) : this.setState({ searchedBooks: [], query: query, searchErr: true })
			})
		}
		else {
			// if query is empty => reset state to default
			this.setState({ searchedBooks: [], searchErr: false })
		}
	}

	render() {
		const { updateShelf, shelfBooks } = this.props
		const { searchedBooks, query, searchErr } = this.state

		let showingBooks = searchedBooks
		if (!searchErr) {
			if (shelfBooks.length > 0) {
				showingBooks = showingBooks.map((showingBook) => {
					let currentShelf = 'none'
					// if book is in current list, set current shelf to book.shelf
					for (let book of shelfBooks) {
						if (book.id === showingBook.id) {
							currentShelf = book.shelf
							break
						}
					}
					// set searched book shelf to current shelf
					showingBook.shelf = currentShelf
					return showingBook
				})
			}
			showingBooks.sort(sortBy('title'))
		}

		return (
			<div className='search-books'>
				<div className='search-books-bar'>
					<Link className='close-search' to='/'>Close</Link>
					<div className='search-books-input-wrapper'>
						<Debounce time='700' handler='onChange'>
							<input
								type='text'
								placeholder='Search by title or author'
								onChange={(event) => this.searchBooks(event)}
							/>
						</Debounce>
					</div>
				</div>
				<div className='search-books-results'>
					{searchErr && (
						<span>Your search for <b><i>{query}</i></b> returned 0 books.</span>
					)}
					{showingBooks.length > 0 && (
						<span>Your search for <b><i>{query}</i></b> returned {showingBooks.length} books.</span>
					)}
					<ListBooks
						books={showingBooks}
						updateShelf={updateShelf}
					/>
				</div>
			</div>
		)
	}
}

export default SearchBooks