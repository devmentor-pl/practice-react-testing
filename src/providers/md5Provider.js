export function getMd5(string) {
  return fetch('https://api.hashify.net/hash/md5/hex', {
    method: 'POST',
    body: string,
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      }

      return Promise.reject(resp);
    })
    .then((data) => data.Digest);
}
