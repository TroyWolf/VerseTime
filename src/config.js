const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://api.versetime.net'
    : 'https://api.versetime.local'

const fetchCfg = () => ({
  method: 'get',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
  },
})

export { API_URL, fetchCfg }