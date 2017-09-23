import React from 'react'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import noCover from './icons/no-cover-image.png'

class ListBooks extends React.Component {
	static propTypes = {
		books: PropTypes.array.isRequired,
		updateShelf: PropTypes.func.isRequired,
	}

	render() {
		const { books, updateShelf } = this.props

		let showingBooks = books
		showingBooks.sort(sortBy('title'))

		return (
			<ol className='books-grid'>
				{showingBooks.map((book) => (
					<li key={book.id}>
						<div className='book'>
							<div className='book-top'>
								<div className='book-cover' style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : noCover})` }}></div>
								<div className='book-shelf-changer'>
									<select onChange={(event) => updateShelf(event.target.value, book)} defaultValue={book.shelf}>
										<option value='none' disabled>{'Move to...'}</option>
										<option value='currentlyReading'>Currently Reading</option>
										<option value='wantToRead'>Want to Read</option>
										<option value='read'>Read</option>
										<option value='none'>None</option>
									</select>
								</div>
							</div>
							<div className='book-title'>{book.title ? book.title : 'No title available'}</div>
							{
								/* Check for authors and render each on separate line if exist*/
								book.authors && book.authors.map((author, index) => (
									<div className="book-authors" key={index}>{author}</div>
								))
							}
						</div>
					</li>
				))}
			</ol>
		)
	}
}

export default ListBooks