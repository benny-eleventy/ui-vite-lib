import {
	CenterAlignedColumnContainer,
	fs_small,
	fw_regular,
	Text,
} from "@bennyui/core";
import { Link } from "react-router-dom";

const SideBar = () => {
	return (
		<CenterAlignedColumnContainer
			width="100%"
			height="100vh"
			backgroundColor="#242424"
			borderRadius="0"
			paddingInline="0.5rem"
		>
			<SideBarCard
				text="DC"
				link="draft-components"
				backgroundColor="lightgreen"
			/>
			<SideBarCard text="C" link="components" backgroundColor="lightpink" />
		</CenterAlignedColumnContainer>
	);
};

export default SideBar;

interface SideBarCardProps {
	text: string;
	link: string;
	backgroundColor?: string;
}

const SideBarCard = ({ text, link, backgroundColor }: SideBarCardProps) => {
	return (
		<CenterAlignedColumnContainer
			width="100%"
			height="10vh"
			backgroundColor={backgroundColor ? backgroundColor : "transparent"}
			borderRadius="0"
		>
			<Link to={`/${link}`}>
				<Text color="black" fontSize={fs_small} fontWeight={fw_regular}>
					{text}
				</Text>
			</Link>
		</CenterAlignedColumnContainer>
	);
};
