export const getUserId = (query: string): string => {
	const userId = query.split("u/")[1].slice(0, -4);

	return userId;
};
