import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import './index.css'

const SingleMoviePage = () => {
  const {id} = useParams()

  const [movieDetails, setMovieDetails] = useState({})
  const [castDetails, setCastDetails] = useState([])

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setIsLoading(true)
    setError('')
    const getDetails = async () => {
      try {
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=89664d65868b8b05f249aed6bfc9c633&language=en-US`,
        )

        const castResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=89664d65868b8b05f249aed6bfc9c633&language=en-US`,
        )
        if (!movieResponse.ok || !castResponse.ok) {
          throw new Error('Failed to fetch Movie details')
        }

        const movieData = await movieResponse.json()
        const castData = await castResponse.json()

        setMovieDetails(movieData)
        setCastDetails(castData.cast)
        console.log(movieData)
        console.log(castData)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    getDetails()
  }, [id])

  if (isLoading) {
    return <p>Loading Movies...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="main-container">
      <div className="single-page-movie-container">
        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          alt={movieDetails.title}
          className="movie-img"
        />
        <div className="movie-details-container">
          <h1 className="movie-title">{movieDetails.title}</h1>
          <p className="movie-rating">
            <span className="label">Rating :</span>{' '}
            {movieDetails.vote_average.toFixed(2)}
          </p>
          <p className="movie-duration">
            {' '}
            <span className="label">Runtime : </span>
            {Math.floor(movieDetails.runtime / 60)}h {movieDetails.runtime % 60}
            m
          </p>
          <div className="genre-container">
            <span className="label">Genre : </span>
            {movieDetails.genres.map(eachItem => (
              <p className="movie-genre" key={eachItem.id}>
                {eachItem.name}{' '}
              </p>
            ))}
          </div>
          <p className="movie-release-date">
            <span className="label">Release Date : </span>
            {movieDetails.release_date}
          </p>
          <p className="movie-overview">
            <span className="label">OverView : </span>
            {movieDetails.overview}
          </p>
        </div>
      </div>
      <div className="cast-container">
        {castDetails.map(eachCast => (
          <div className="each-cast-item" key={eachCast.cast_id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${eachCast.profile_path}`}
              alt={eachCast.original_name}
              className="cast-img"
            />
            <p className="cast-name">
              <span className="label">Original Name : </span>
              {eachCast.original_name}
            </p>
            <p className="cast-character">
              <span className="label">Character : </span>
              {eachCast.character}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SingleMoviePage
