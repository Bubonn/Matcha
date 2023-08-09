import React, { useEffect, useState } from 'react';
import { InterestListProfile } from '../InterestProfileList/InterestProfileList';
import { BackApi } from '../../api/back';
import { getToken } from '../../utils/auth';

interface InterestProfileProps {
	user: any;
	activeUser: any;
}

export function InterestProfile({ user, activeUser }: InterestProfileProps) {
	const [tags, setTags] = useState<any>(null);

	async function getTagsName() {
		const token = getToken();
		if (token) {
			const tags = await BackApi.getTags(token);
			if (tags.status === 200) {
				setTags(tags.data);
			}
		}
	}

	useEffect(() => {
		getTagsName();
	}, [])

	if (!tags) {
		return (<></>);
	}

	return (
		<>
			{user.interests.map((interest: number, index: number) => {
				const foundTag = tags.find((obj: any) => obj.tag_id === interest);
				return (
					<React.Fragment key={index}>
						<InterestListProfile
							name={foundTag.tag_name}
							common={activeUser.interests.includes(interest)}
						/>
					</React.Fragment>
				);
			})}
		</>
	)
}