export function md5ProviderFetchResolvedOnce(mock, md5Value) {
  mock.mockResolvedValueOnce({
    ok: true,
    json: async () => {
      return { Digest: md5Value };
    },
  });
}
