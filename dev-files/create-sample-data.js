const fs = require('fs-promise')
const mkdirp = require('mkdirp-promise')
const fetch = require('node-fetch')
const { times, flatten } = require('lodash')
const sanitize = require('sanitize-filename')
const { resolve } = require('path')
require('dotenv').config()

const api_key = process.env.API_KEY

const directories = [
  'movies',
  'tvshows'
]

const getMoviePage = page => fetch(`http://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=es-ES&page=${page}`)
const getTVShowPage = page => fetch(`http://api.themoviedb.org/3/tv/popular?api_key=${api_key}&language=es-ES&page=${page}`)


const getMovies = pages =>
  Promise.all(
    times(pages)
    .map(i => i + 1)
    .map(page =>
      getMoviePage(page)
      .then(res => res.json())
      .then(data => data.results)
      .then(results =>
        results
        .map(movie => `${movie.title} (${movie.release_date.match(/(\d+?)-/)[1]}).mkv`)
        .map(title => sanitize(title))
      ))
    )
    .then(data => flatten(data))

const getTVShows = pages =>
  Promise.all(
      times(pages)
    .map(i => i + 1)
    .map(page =>
      getTVShowPage(page)
      .then(res => res.json())
      .then(data => data.results)
      .then(results =>
        results
        .map(tvshow => Object.assign({}, tvshow, {name: sanitize(tvshow.name)}))
      ))
    )
    .then(data => flatten(data))

async function main () {
  await Promise.all(directories.map(dir => mkdirp(resolve(__dirname, dir))))
  const movies = await getMovies(10)
  await Promise.all(movies.map(movie => fs.writeFile(resolve(__dirname, 'movies', movie), '')))
  // const tvshows = await getTVShows(2)
  // await Promise.all(tvshows.map(tvshow =>mkdirp(resolve(__dirname, 'tvshows', tvshow.name))))
}

main()
  .then(() => console.log('Done!'))
  .catch(err => console.error(err))
