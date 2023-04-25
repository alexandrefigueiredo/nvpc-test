import { SignInButton } from "../SignInButton";

import styles from "./styles.module.scss";

export function Header() {
	return (
		<header className={styles.headerContainer}>
			<div className={styles.headerContent}>
				<h2 className={styles.headerTitle}>
					<img src="/images/logo-nvpc.png" alt="nvpc" /> - Challenge
				</h2>
				<SignInButton />
			</div>
		</header>
	);
}
