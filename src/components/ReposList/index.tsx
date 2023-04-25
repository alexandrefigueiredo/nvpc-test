import { useEffect, useState } from "react";
import { Repo } from "../../clients/Github/types";
import { RepoCard } from "../RepoCard";

import styles from "./styles.module.scss";

interface ReposListProps {
	repos: Repo[];
}

export function ReposList({ repos }: ReposListProps) {
	const [reposList, setReposList] = useState<Repo[]>([]);

	useEffect(() => {
		setReposList(repos);
	}, [repos]);

	const handleSearchByName = (query: string) => {
		if (query.length <= 0) {
			return setReposList(repos);
		}
		const reposFiltered = repos.filter((repo) =>
			repo.name.toUpperCase().includes(query.toUpperCase())
		);
		setReposList(reposFiltered);
	};

	const handleFilterByHasPages = (hasPages: boolean) => {
		const reposFiltered = repos.filter((repo) =>
			hasPages ? repo.has_pages : !repo.has_pages
		);
		setReposList(reposFiltered);
	};

	const handleFilterByHasIssues = (hasIssues: boolean) => {
		const reposFiltered = repos.filter((repo) =>
			hasIssues ? repo.has_issues : !repo.has_issues
		);
		setReposList(reposFiltered);
	};

	const handleFilterByArchived = (archived: boolean) => {
		const reposFiltered = repos.filter((repo) =>
			archived ? repo.archived : !repo.archived
		);
		setReposList(reposFiltered);
	};

	return (
		<div className={styles.reposContainer}>
			<div className={styles.reposFilters}>
				<input
					className={styles.searchBar}
					type="text"
					placeholder="Search for repositories..."
					onChange={(e) => handleSearchByName(e.target.value)}
				/>
				<select className={styles.select}>
					<option value="">Sort by</option>
					<option value="alphabetical">Alphabetical Order</option>
					<option value="lastCommit">Last commit</option>
				</select>
				<div className={styles.reposFilterWrapper}>
					<label htmlFor="hasPages">Has Pages</label>
					<input
						id="hasPages"
						type="checkbox"
						onChange={(e) => handleFilterByHasPages(e.target.checked)}
					/>
				</div>
				<div className={styles.reposFilterWrapper}>
					<label htmlFor="hasIssues">Has Issues</label>
					<input
						id="hasIssues"
						type="checkbox"
						onChange={(e) => handleFilterByHasIssues(e.target.checked)}
					/>
				</div>
				<div className={styles.reposFilterWrapper}>
					<label htmlFor="archived">Archived</label>
					<input
						id="archived"
						type="checkbox"
						onChange={(e) => handleFilterByArchived(e.target.checked)}
					/>
				</div>
			</div>
			<div className={styles.reposContent}>
				{reposList.map((repo) => {
					return <RepoCard repo={repo} key={repo.id} />;
				})}
			</div>
		</div>
	);
}
