import {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {IoMdMenu} from 'react-icons/io'
import {RxCross2} from 'react-icons/rx'
import {FaSearch} from 'react-icons/fa'
import './index.css'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const history = useHistory()

  const handleSearch = () => {
    if (searchText.trim() === '') {
      return
    }

    history.push(`/search?query=${encodeURIComponent(searchText.trim())}`)
  }

  return (
    <nav className="nav-container">
      <Link to="/" className="nav-title-link">
        <h1 className="nav-title">movieDB</h1>
      </Link>
      <div className="search-container">
        <input
          type="search"
          className="text-box"
          value={searchText}
          placeholder="Search Your Favorite Movies..."
          onChange={event => setSearchText(event.target.value)}
        />
        <button type="button" className="search-btn" onClick={handleSearch}>
          <FaSearch className="search-icon" />
        </button>
      </div>
      <div className={`links-container ${isMenuOpen ? 'menu-open' : ''}`}>
        <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
          Popular
        </Link>
        <Link
          to="/top-rated"
          className="nav-link"
          onClick={() => setIsMenuOpen(false)}
        >
          Top Rated
        </Link>
        <Link
          to="/upcoming"
          className="nav-link"
          onClick={() => setIsMenuOpen(false)}
        >
          Upcoming
        </Link>
      </div>
      <button
        type="button"
        className="hamburger-cross-btn"
        onClick={() => setIsMenuOpen(prevState => !prevState)}
      >
        {isMenuOpen ? (
          <RxCross2 className="hamburger-cross-icon" />
        ) : (
          <IoMdMenu className="hamburger-cross-icon" />
        )}
      </button>
    </nav>
  )
}

export default Navbar
