export function md5FetchResolvedOnce(mock, mockedValue) {
    mock.mockResolvedValueOnce({
		ok: true,
		json: async () => {
			return {
				Digest: mockedValue,
			};
		},
	});
};