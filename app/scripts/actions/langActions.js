import dispatcher from '~/scripts/dispatcher'

export function setLang (locale) {
  dispatcher.dispatch({
    type: 'SET_LANG',
    locale
  })
}
