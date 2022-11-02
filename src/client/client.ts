const url = process.env.REACT_APP_API_URL;

const client = {
  get: (query) => fetch(`${url}/${query}`),
  post: (query, data) =>
    fetch(`${url}/${query}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),
  delete: (query) =>
    fetch(`${url}/${query}`, {
      method: "DELETE",
    }),
  patch: (query, data) =>
    fetch(`${url}/${query}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),
};

export default client;
