const API_URL = '/api'

const fetchCfg = (): RequestInit => ({
  method: 'get',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
  },
})

export { API_URL, fetchCfg }
