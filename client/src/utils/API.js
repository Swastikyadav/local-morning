const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.token}` || ''
}

const API = {
  // Signup
  postSignup: (payload) => {
    return fetch("/api/v1/user/signup", {
      method: "POST",
      headers,
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
  },

  // Login
  postLogin: (payload) => {
    return fetch("/api/v1/user/login", {
      method: "POST",
      headers,
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
  },

  // Current User
  getCurrentUser: (token) => {
    return fetch("/api/v1/user/profile", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
  },

  // Get News by query
  getNews: (query) => {
    return fetch(`/api/v1/news?q=${query}`, {
      method: "GET",
      headers
    })
      .then(res => res.json())
  },

  // Get Top Headlines
  getTopHeadlines: () => {
    return fetch("/api/v1/news/topheadlines", {
      method: "GET",
      headers
    })
      .then(res => res.json())
  }
}

export default API;