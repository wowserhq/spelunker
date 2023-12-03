class UnauthorizedError extends Error {
  constructor(message, response) {
    super(message);
    this.response = response;
  }
}

class NotFoundError extends Error {
  constructor(message, response) {
    super(message);
    this.response = response;
  }
}

const validateResponse = (response) => {
  if (response.ok) {
    return;
  }

  if (response.status === 403) {
    throw new UnauthorizedError(`Failed request: ${response.url}`, response);
  }

  if (response.status === 404) {
    throw new NotFoundError(`Failed request: ${response.url}`, response);
  }
};

export { UnauthorizedError, NotFoundError, validateResponse };
