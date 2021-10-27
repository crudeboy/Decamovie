import { current } from 'immer'
import react, { useEffect, useState } from 'react'
import API from '../API'
import { currentState } from '../helpers'

const initialState = {
  page: 0,
  results: [],
  total_Pages: 0,
  total_results: 0

}

export const useHomeFetchMovies = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchMovies = async (page, searchTerm = " ") => {
    try {
      setError(false)
      setLoading(true)
      const movies = await API.fetchMovies(searchTerm, page);

      setState(prev => ({
        ...movies,
        results:
          page > 1 ? [...prev.results, ...movies.results] : [...movies.results]

      }))
    } catch (error) {
      setError(false)
    }
    //to set loading to false after grabbing the movies
    setLoading(false)
  }

  useEffect(() => {

    if (!searchTerm){
      const sessionState = currentState('HomeState')
    if(sessionState){
        setState(sessionState)
        return;
      }
    }
    setState(initialState)
    fetchMovies(1, searchTerm)
  }, [searchTerm]) //initial dependency

  //loading more thumbnails
  useEffect(() => {
    if (!isLoadingMore) return
    fetchMovies(state.page + 1, searchTerm)
    setIsLoadingMore(false)
  }, [isLoadingMore, searchTerm, state.page])

  //write to localstorage 
useEffect(() => {
  if (!searchTerm) sessionStorage.setItem('homeState', JSON.stringify(state));
}, [searchTerm, state]);

  return { state, loading, Error, searchTerm, setSearchTerm, setIsLoadingMore }
}
