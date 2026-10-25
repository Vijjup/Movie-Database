import {Link, useLocation} from 'react-router-dom'
import {useState, useEffect} from 'react'
import './index.css'

const SearchedMovies = () => {
  const [searchedMovies, setSearchedMovies] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const searchText = queryParams.get('query') || ''

  useEffect(() => {
    const getSearchedMovies = async () => {
      setError('')

      if (searchText.trim() === '') {
        setSearchedMovies([])
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=89664d65868b8b05f249aed6bfc9c633&language=en-US&query=${encodeURIComponent(
            searchText,
          )}&page=1`,
        )

        if (!response.ok) {
          throw new Error('Failed to fetch Movies')
        }

        const data = await response.json()

        setSearchedMovies(data.results || [])
        console.log(data.results)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    getSearchedMovies()
  }, [searchText])

  if (isLoading) {
    return <p>Loading Movies...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  if (searchedMovies.length === 0) {
    return <p>No Movies Found...</p>
  }

  return (
    <div className="searched-container">
      {searchedMovies.map(eachItem => (
        <div className="movie-container" key={eachItem.id}>
          <img
            className="image"
            src={`https://image.tmdb.org/t/p/w500${eachItem.poster_path}`}
            alt={eachItem.title}
          />
          <h1 className="title"> {eachItem.title}</h1>
          <p className="rating">
            <span className="rating-text">Rating:</span>{' '}
            {eachItem.vote_average.toFixed(2)}
          </p>
          <Link to={`/movie/${eachItem.id}`} className="view-details-link">
            View Details
          </Link>
        </div>
      ))}
    </div>
  )
}
export default SearchedMovies
