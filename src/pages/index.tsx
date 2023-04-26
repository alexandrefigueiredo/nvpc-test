import { ReposList } from "../components/ReposList";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { getRepos, getUser, getUsername } from "../clients/Github";
import { getUserId } from "../utils/getUserId";
import { Repo, User } from "../clients/Github/types";
import { Profile } from "../components/Profile";

import styles from "./home.module.scss";

interface HomeProps {
	user: User;
	repos: Repo[];
}

export default function Home({ user, repos }: HomeProps) {
	return (
		<main className={styles.contentContainer}>
			<Profile user={user} />
			<ReposList repos={repos} />
		</main>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	let username = "alexandrefigueiredo";

	const session = await getServerSession(req, res, authOptions);
	if (session) {
		const userId = getUserId(session.user.image);
		username = await getUsername(userId);
	}

	const user = await getUser(username);
	const repos = await getRepos(username);

	return {
		props: {
			user,
			repos,
		},
	};
};
