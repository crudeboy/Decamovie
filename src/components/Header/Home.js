import React from 'react'
import API from '../../API'
//config settings
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../../config'
//Image fall back to images incase there are no images on the database
import NoImage from '../../images/no_image.jpg'

import { useHomeFetchMovies } from '../../hooks/useHomeFetchMovies'
import HeroImage from '../HeroImage'
import Grid from '../Grid'
import Thumb from '../Thumb'
import Spinner from '../Spinner'
import SearchBar from '../SearchBar'
import Button from '../Button'

const Home = () => {
  const { state, loading, Error, searchTerm, setSearchTerm, setIsLoadingMore } = useHomeFetchMovies()
  console.log(state)
  if (Error) return <div> Something went Wrong</div>;
  return (
    <div>
      {state.results[0] ? (
        <HeroImage
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
          title={state.results[0].original_title}
          text={state.results[0].overview}
        />
      ) : null}
      <SearchBar setSearchTerm={setSearchTerm} />
      <Grid header={searchTerm ? 'Search results' : 'Popular movies'}>
        {state.results.map(movie => (
          <Thumb
            key={movie.id}
            clickable //always default to true
            image={
              movie.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path : NoImage
            }
            movieId={movie.id}
          />
        ))}
      </Grid>
      {loading && <Spinner />}
      {state.page < state.total_pages && !loading && (
        <Button text='Show More' callback={() => setIsLoadingMore(true)} />
      )}
    </div>
  );
};

export default Home


