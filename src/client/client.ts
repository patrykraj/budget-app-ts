const url = process.env.REACT_APP_API_URL;
import { IData } from "./types";

const client = {
  get: (query: string) => fetch(`${url}/${query}`),
  post: (query: string, data: IData) =>
    fetch(`${url}/${query}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),
  delete: (query: string) =>
    fetch(`${url}/${query}`, {
      method: "DELETE",
    }),
  patch: (query: string, data: IData) =>
    fetch(`${url}/${query}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),
};

export default client;
