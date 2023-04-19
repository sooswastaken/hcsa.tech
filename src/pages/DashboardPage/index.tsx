import './assets/DashboardPage.scss';

import LogoutIcon from './assets/logout.svg';
import ResetIcon from './assets/reset.svg';
import LockIcon from './assets/lock.svg';
import LinkIcon from './assets/link.png';
import CopyIcon from './assets/copy.svg';

import PrivateIcon from './assets/private.svg';
import PublicIcon from './assets/public.svg';
import InvisibleIcon from './assets/invisible.svg';

import DiscordIcon from './assets/discord.png';
import GithubIcon from './assets/github.png';
import FigmaIcon from './assets/figma.png';
import GmailIcon from './assets/gmail.png';

// TEMP PROFILE PICTURE ICON
import TempProfilePicture from './assets/temp.png';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const DashboardPage = () => {
	const [selected, setSelected] = useState('public') as [
		string,
		React.Dispatch<React.SetStateAction<string>>
	];
	const publicButton = useRef<HTMLDivElement>(null),
		privateButton = useRef<HTMLDivElement>(null),
		invisibleButton = useRef<HTMLDivElement>(null);

	// also factor in margins, padding, etc.
	const margins = {
		public: '8.65em',
		private: `29.3em`,
		invisible: `49.95em`,
	} as {
		[key: string]: string;
	};

	console.log(margins[selected]);

	return (
		<>
			<div className="navbar">
				<h1>DASHBOARD</h1>
				<button>
					<img src={LogoutIcon} alt="Logout" />
					Logout
				</button>
			</div>
			<div className="content">
				<div className="profile-editor">
					<div className="profile-picture-container">
						<p>Sudarshan Lamichhane</p>
						<img src={TempProfilePicture} alt="Profile" />
						<button>
							<img src={ResetIcon} alt="Reset" />
							Reset Profile Picture
						</button>
					</div>
					<div className="profile-settings">
						<p className="header">Profile Visibility</p>
						<div className="profile-visibility">
							<div className="options">
								<div
									ref={publicButton}
									className={
										selected === 'public'
											? 'public selected'
											: 'public'
									}
									onClick={() => setSelected('public')}
								>
									<img src={PublicIcon} alt="?" />
									<p>Public</p>
								</div>
								<div
									ref={privateButton}
									className={
										selected === 'private'
											? 'private selected'
											: 'private'
									}
									onClick={() => setSelected('private')}
								>
									<img src={PrivateIcon} alt="?" />
									<p>Private</p>
								</div>
								<div
									ref={invisibleButton}
									className={
										selected === 'invisible'
											? 'invisible selected'
											: 'invisible'
									}
									onClick={() => setSelected('invisible')}
								>
									<img src={InvisibleIcon} alt="?" />
									<p>Invisible</p>
								</div>
							</div>
							<motion.div
								key="soosbotProfileSelector"
								className="selector"
								animate={{
									marginLeft: margins[selected],
									transition: {
										type: 'spring',
										duration: 0.5,
									},
								}}
							/>
						</div>
						<p className="header">Profile Link</p>
						<div className="profile-link">
							<p>hcsa.tech/members/</p>
							<input type="text" />
							<button className="copy">
								<img src={CopyIcon} alt="Copy" />
							</button>
						</div>
						<p className="header">About</p>
						<div className="about">
							<textarea
								name="about"
								id="about"
								cols={30}
								rows={10}
								placeholder="Tell us about yourself"
							></textarea>
						</div>
					</div>
				</div>
				<div className="external-accounts">
					<div className="header">
						<h1>External Accounts</h1>
						<hr />
						<p>
							Please use a unified email for all of the following.
							It will be shared with us as you login.
						</p>
						<p>Do not use your school email for anything.</p>
					</div>
					<div className="accounts">
						<div className="discord">
							<img src={DiscordIcon} alt="Discord" />
							<div>
								<h2>Discord</h2>
								<button>Connect</button>
							</div>
						</div>
						<div className="github">
							<img src={GithubIcon} alt="Github" />
							<div>
								<h2>Github</h2>
								<button>Connect</button>
							</div>
						</div>
						<div className="other">
							<div className="figma">
								<img src={FigmaIcon} alt="Figma" />
								<p>
									<img src={LockIcon} alt="Lock" />
									Connect an account to provide
								</p>
							</div>
							<div className="email">
								<img src={GmailIcon} alt="Gmail" />
								<div className="emails">
									<div>
										<p>Personal Email</p>
										<p>
											<img src={LockIcon} alt="Lock" />
											Connect an account to provide
										</p>
									</div>
									<div>
										<p>Club Email</p>
										<p>
											<img src={LockIcon} alt="Lock" />
											Apply for a email{' '}
											<a
												href="https://google.com"
												target="_blank"
											>
												here{' '}
												<img
													src={LinkIcon}
													alt="Link"
												/>
											</a>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default DashboardPage;
