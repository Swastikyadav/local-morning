const headers = {
  'Content-Type': 'application/json',
  'Authorization': localStorage.token || ''
}

export default {
  // Signup
  postSignup: (payload) => {
    return fetch("/api/v1/user/signup", {
      method: "POST",
      headers,
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
  }
}