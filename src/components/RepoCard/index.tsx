import { Repo } from "../../clients/Github/types";

import styles from "./styles.module.scss";

interface RepoCardProps {
	repo: Repo;
}

export function RepoCard({ repo }: RepoCardProps) {
	return (
		<div className={styles.repoCard}>
			<h3>{repo.name}</h3>
			{!!repo.description && <p>{repo.description}</p>}
			<p>{repo.language}</p>
			<span>
				Last commit:{" "}
				{new Intl.DateTimeFormat("pt-br").format(new Date(repo.updated_at))}
			</span>
		</div>
	);
}
