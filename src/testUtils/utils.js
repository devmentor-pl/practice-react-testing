export const md5Value = "098f6bcd4621d373cade4e832627b4f6";

export function md5ProviderFetchResolvedOnce(mock) {
  mock.mockResolvedValueOnce({
    ok: true,
    json: async () => {
      return { Digest: md5Value };
    },
  });
}
