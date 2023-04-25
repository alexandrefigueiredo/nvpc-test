import { api } from "../../services/axios";
import { Repo, User, ReposResponse, UserResponse } from "./types";

export const getUsername = async (userId: string): Promise<string> => {
	const usernameResponse = await api.get<UserResponse>(`user/${userId}`);

	return usernameResponse.data.login;
};

export const getUser = async (username: string): Promise<User> => {
	const userResponse = await api.get(`users/${username}`);

	return userResponse.data;
};

export const getRepos = async (username: string): Promise<Repo[]> => {
	const reposResponse = await api.get<ReposResponse>(`users/${username}/repos`);

	return reposResponse.data;
};
