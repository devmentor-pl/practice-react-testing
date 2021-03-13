

export function providerFetchResolvedOnce(mock, value) {
  mock.mockResolvedValueOnce({
    ok: true,
    json: async () => {
      return { Digest: value };
    },
  });
}
