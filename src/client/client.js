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
  delete: (query, id) =>
    fetch(`${url}/${query}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    }),
};

export default client;
