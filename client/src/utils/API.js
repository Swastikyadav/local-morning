const headers = {
  'Content-Type': 'application/json',
  'Authorization': localStorage.token || ''
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
  }
}

export default API;