const url = process.env.REACT_APP_API_URL;

const client = {
    get: (query) => fetch(`${url}/${query}`),
};

export default client;
