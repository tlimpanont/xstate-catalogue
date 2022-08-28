export const fetchService = (url: string) => {
  return new Promise((resolve, reject) => {
    function handleErrors(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }

    fetch(url)
      .then(handleErrors)
      .then(function (response) {
        resolve(response.json());
      })
      .catch(function (error) {
        reject(error);
      });
  });
};
