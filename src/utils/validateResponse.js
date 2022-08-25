function validateResponse(response) {
  if (!response.ok)
    throw new Error(`${response.status} - ${response.statusText}`);
  return response.json();
}

export default validateResponse;
