import { ArrowSquareOut, Buildings, GithubLogo, Users } from "phosphor-react";
import styles from "./styles.module.scss";
import { User } from "../../clients/Github/types";

interface ProfileProps {
	user: User;
}

export function Profile({ user }: ProfileProps) {
	return (
		<div className={styles.profileContainer}>
			<div className={styles.profileContent}>
				<img src={user.avatar_url} alt="Profile picture" />
				<div className={styles.profileInformation}>
					<strong>
						{user.name}
						<a href={user.html_url} target="_blank" rel="noreferrer">
							GITHUB <ArrowSquareOut size={16} />
						</a>
					</strong>
					<p>{user.bio}</p>
					<div className={styles.profileSocialMedias}>
						<span>
							<GithubLogo weight="fill" /> {user.login}
						</span>
						{!!user.company && (
							<span>
								<Buildings weight="fill" /> {user.company}
							</span>
						)}
						{user.followers > 0 && (
							<span>
								<Users weight="fill" /> {user.followers}{" "}
								{user.followers === 1 ? "Seguidor" : "Seguidores"}
							</span>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
