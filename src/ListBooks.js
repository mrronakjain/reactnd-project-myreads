import React from 'react'
import PropTypes from 'prop-types';
import sortBy from 'sort-by';

class ListBooks extends React.Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onMoveToShelf: PropTypes.func.isRequired,
        shelf: PropTypes.string
    }

    render() {
        const { books, onMoveToShelf, shelf } = this.props;

        let showingBooks = books;
        if (shelf) {
            showingBooks = showingBooks.filter((b) => b.shelf === shelf)
        }
        showingBooks.sort(sortBy('title'));

        return (
            <ol className='books-grid'>
                {showingBooks.map((book) => (
                    <li key={book.id}>
                        <div className='book'>
                            <div className='book-top'>
                                <div className='book-cover' style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                <div className='book-shelf-changer'>
                                    <select onChange={(event) => onMoveToShelf(event.target.value, book)} defaultValue={book.shelf}>
                                        <option value='none' disabled>Move to...</option>
                                        <option value='currentlyReading' disabled={book.shelf === 'currentlyReading'}>Currently Reading</option>
                                        <option value='wantToRead' disabled={book.shelf === 'wantToRead'}>Want to Read</option>
                                        <option value='read' disabled={book.shelf === 'read'}>Read</option>
                                        <option value='none'>None</option>
                                    </select>
                                </div>
                            </div>
                            <div className='book-title'>{book.title}</div>
                            <div className='book-authors'>{book.author}</div>
                        </div>
                    </li>
                ))}
            </ol>
        )
    }
}

export default ListBooks