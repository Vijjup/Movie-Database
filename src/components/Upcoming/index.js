import {useHistory} from 'react-router-dom'
import {useState, useEffect} from 'react'
import './index.css'

const Upcoming = () => {
  const history = useHistory()
  const [upComingMovies, setUpComingMoviesMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const getUpComingMoviesMovies = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/movie/upcoming?api_key=89664d65868b8b05f249aed6bfc9c633&language=en-US&page=1',
        )

        if (!response.ok) {
          throw new Error('Failed to fetch Movies')
        }

        const data = await response.json()

        setUpComingMoviesMovies(data.results)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    getUpComingMoviesMovies()
  })

  if (isLoading) {
    return <p>Loading Movies..</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  if (upComingMovies.length === 0) {
    return <p>No Movies found...</p>
  }

  return (
    <div className="upcoming-container">
      {upComingMovies.map(eachItem => (
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
          <button
            type="button"
            onClick={() => {
              history.push(`/movie/${eachItem.id}`)
            }}
            className="view-btn"
          >
            View Details
          </button>
        </div>
      ))}
    </div>
  )
}

export default Upcoming
