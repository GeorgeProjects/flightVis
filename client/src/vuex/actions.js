import types from './mutations'

export const switchMonth = (store, month) => {
  store.dispatch(types.SWITCH_MONTH, month)
}

export const daySta = (store, daysta) => {
  console.log('daysta')
  store.dispatch(types.DAY_STA, daysta)
}

export const minuteSta = (store, minutesta) => {
  console.log('minutesta')
  store.dispatch(types.MINUTE_STA, minutesta)
}

export const loading = (store, loading) => {
  store.dispatch(types.LOADING, loading)
}

export const airportSelected = (store, airportSelected) => {
  store.dispatch(types.AIRPORTSELECTED, airportSelected)
}

export const trajData = (store, trajData) => {
  store.dispatch(types.TRAJDATA, trajData)
}