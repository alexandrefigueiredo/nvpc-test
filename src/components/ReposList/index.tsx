import { useEffect, useState, useMemo } from "react";
import { Repo } from "../../clients/Github/types";
import { RepoCard } from "../RepoCard";

import styles from "./styles.module.scss";

interface ReposListProps {
	repos: Repo[];
}

interface Filters {
	search: string;
	hasIssues: boolean;
	hasPages: boolean;
	isArchived: boolean;
}

type SortBy = "alphabetical" | "lastCommit";

export function ReposList({ repos }: ReposListProps) {
	const [reposList, setReposList] = useState<Repo[]>([]);
	const [sortBy, setSortBy] = useState<SortBy>("lastCommit");
	const [filters, setFilters] = useState<Filters>({
		search: "",
		hasIssues: true,
		hasPages: false,
		isArchived: false,
	});

	useEffect(() => {
		setReposList(repos);
	}, [repos]);

	useEffect(() => {
		filterReposList();
	}, [filters]);

	const sortedReposList = useMemo(() => {
		if (sortBy === "alphabetical") {
			const sortedRepos = reposList.sort(function (firstRepo, secondRepo) {
				const firstRepoName = firstRepo.name.toLowerCase(); // ignore upper and lowercase
				const secondRepoName = secondRepo.name.toLowerCase(); // ignore upper and lowercase
				if (firstRepoName < secondRepoName) {
					return -1;
				}
				if (firstRepoName > secondRepoName) {
					return 1;
				}

				return 0;
			});
		}

		if (sortBy === "lastCommit") {
			const sortedRepos = reposList.sort(function (firstRepo, secondRepo) {
				const firstRepoLastCommit = new Date(firstRepo.updated_at);
				const secondRepoLastCommit = new Date(secondRepo.updated_at);

				return secondRepoLastCommit.getTime() - firstRepoLastCommit.getTime();
			});
		}

		return reposList;
	}, [reposList, sortBy]);

	function sortReposList() {}

	const filterReposList = () => {
		const filteredReposList = repos.filter(
			(repo) =>
				repo.name.includes(filters.search) &&
				repo.has_issues === filters.hasIssues &&
				repo.has_pages === filters.hasPages &&
				repo.archived === filters.isArchived
		);

		setReposList(filteredReposList);
	};

	return (
		<div className={styles.reposContainer}>
			<div className={styles.reposFilters}>
				<input
					className={styles.searchBar}
					type="text"
					placeholder="Search for repositories..."
					onChange={(e) =>
						setFilters((filters) => {
							return { ...filters, search: e.target.value };
						})
					}
				/>
				<select
					className={styles.select}
					defaultValue="lastCommit"
					onChange={(e) => setSortBy(e.target.value as SortBy)}
				>
					<option value="alphabetical">Alphabetical Order</option>
					<option value="lastCommit">Last commit</option>
				</select>
				<div className={styles.reposFilterWrapper}>
					<label htmlFor="hasPages">Has Pages</label>
					<input
						defaultChecked={filters.hasPages}
						id="hasPages"
						type="checkbox"
						onChange={(e) =>
							setFilters((filters) => {
								return { ...filters, hasPages: e.target.checked };
							})
						}
					/>
				</div>
				<div className={styles.reposFilterWrapper}>
					<label htmlFor="hasIssues">Has Issues</label>
					<input
						defaultChecked={filters.hasIssues}
						id="hasIssues"
						type="checkbox"
						onChange={(e) =>
							setFilters((filters) => {
								return { ...filters, hasIssues: e.target.checked };
							})
						}
					/>
				</div>
				<div className={styles.reposFilterWrapper}>
					<label htmlFor="archived">Archived</label>
					<input
						defaultChecked={filters.isArchived}
						id="archived"
						type="checkbox"
						onChange={(e) =>
							setFilters((filters) => {
								return { ...filters, isArchived: e.target.checked };
							})
						}
					/>
				</div>
			</div>
			<div className={styles.reposContent}>
				{sortedReposList.map((repo) => {
					return <RepoCard repo={repo} key={repo.id} />;
				})}
			</div>
		</div>
	);
}
