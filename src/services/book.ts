import makeRequest from './makeRequest';

const prefix = 'book';

function fetchBooks() {
  return makeRequest(prefix, {
    method: 'GET',
  });
}

export const bookAPI = {
  fetchBooks,
};
