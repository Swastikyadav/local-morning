const API = {
  // Signup
  postSignup: (payload) => {
    return fetch("/api/v1/user/signup", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.token ? `Bearer ${localStorage.token}` : ''
      },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
  },

  // Login
  postLogin: (payload) => {
    return fetch("/api/v1/user/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.token ? `Bearer ${localStorage.token}` : ''
      },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
  },

  // Current User
  getCurrentUser: () => {
    return fetch("/api/v1/user/profile", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.token ? `Bearer ${localStorage.token}` : ''
      }
    })
      .then(res => res.json())
  },

  // Get News by query
  getNews: (query) => {
    return fetch(`/api/v1/news?q=${query}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.token ? `Bearer ${localStorage.token}` : ''
      }
    })
      .then(res => res.json())
  },

  // Get Top Headlines
  getTopHeadlines: () => {
    return fetch("/api/v1/news/topheadlines", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.token ? `Bearer ${localStorage.token}` : ''
      }
    })
      .then(res => res.json())
  },

  // Update current user profile
  patchUserProfile: (userId, payload) => {
    return fetch(`/api/v1/user/update/${userId}`, {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${localStorage.token}`
      },
      body: payload
    })
      .then(res => res.json())
  },

  // Update Password
  patchUpdatePassword: (payload) => {
    return fetch("/api/v1/user/update/password", {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.token ? `Bearer ${localStorage.token}` : ''
      },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
  },

  // Create new post
  postCreatePost: (payload) => {
    return fetch(`/api/v1/post/create`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${localStorage.token}`
      },
      body: payload
    })
      .then(res => res.json())
  },

  // Get all posts
  getPosts: () => {
    return fetch("/api/v1/post/all", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.token ? `Bearer ${localStorage.token}` : ''
      }
    })
      .then(res => res.json())
  },

  // Delete Post
  deletePost: (postId) => {
    return fetch(`/api/v1/post/delete/${postId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.token ? `Bearer ${localStorage.token}` : ''
      }
    })
      .then(res => res.json())
  },

  // Like post
  patchLikePost: (postId) => {
    return fetch(`/api/v1/post/like/${postId}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.token ? `Bearer ${localStorage.token}` : ''
      }
    })
      .then(res => res.json())
  }
}

export default API;