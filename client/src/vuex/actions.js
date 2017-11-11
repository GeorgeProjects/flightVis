import types from './mutations'

export const switchMonth = (store, month) => {
  store.dispatch(types.SWITCH_MONTH, month)
}

export const setDaySta = (store, daysta) => {
  console.log('daysta')
  store.dispatch(types.DAY_STA, daysta)
}

export const setTrajData = (store, trajData) => {
  store.dispatch(types.TRAJDATA, trajData)
}

export const setMinuteSta = (store, minutesta) => {
  console.log('minutesta')
  store.dispatch(types.MINUTE_STA, minutesta)
}

export const setLoading = (store, loading) => {
  store.dispatch(types.LOADING, loading)
}

export const setAirportSelected = (store, airportSelected) => {
  store.dispatch(types.AIRPORTSELECTED, airportSelected)
}

export const setTimelineTopRange = (store, timelineTopRange) => {
  store.dispatch(types.TIMELINETOPRANGE, timelineTopRange)
}

export const setCurtime = (store, curtime) => {
  store.dispatch(types.CURTIME, curtime)
}

export const setSlidingwindowsize = (store, slidingwindowsize) => {
  store.dispatch(types.SLIDINGWINDOWSIZE, slidingwindowsize)
}

