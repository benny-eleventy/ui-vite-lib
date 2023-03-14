import {
	br_large,
	CenterAlignedColumnContainer,
	FlexStartRowContainer,
	s_xxsmall,
} from "@bennyui/core";
import { Icon } from "@bennyui/icons";
import React from "react";
import CodeSnippet from "./CodeSnippet";
import DraftButton from "./DraftButton";
import KeyboardButton from "./KeyboardButton";

const DraftComponent = () => {
	const [isSuccess, setIsSuccess] = React.useState(false);
	const [isError, setIsError] = React.useState(false);
	const [isActive, setIsActive] = React.useState(false);
	const [isDisabled, setIsDisabled] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);

	React.useEffect(() => {
		if (isError) {
			setTimeout(() => {
				setIsError(false);
			}, 2000);
		}
	}, [isError]);

	React.useEffect(() => {
		if (isSuccess) {
			setTimeout(() => {
				setIsSuccess(false);
			}, 2000);
		}
	}, [isSuccess]);

	return (
		<CenterAlignedColumnContainer width="100%" height="100vh" borderRadius="0">
			<FlexStartRowContainer gap="1rem">
				{/* <>
					<CodeSnippet />
				</> */}
				{/* <Icon.Author
					//@ts-ignore
					size="large"
					hoverAnimation={{
						backgroundColor: "rgba(255,255,255,0.3)",
					}}
					tooltipPosition={["left", "1rem"]}
					clickAnimation={{
						scale: 0.8,
						transition: {
							duration: 0.2,
						},
					}}
					padding="0"
					tooltipText="Author Button"
				/> */}
				{/* <Icon.ColorSplash
					hoverAnimation={{
						backgroundColor: "rgba(255,255,255,0.3)",
					}}
					padding="0"
					size="large"
					tooltipText="Color Splash Button"
				/> */}

				{/* <DraftButton
					label="Share Bookmark"
					leftIcon={<Icon.Share size="regular" color="lightblue" />}
					buttonStyles={{
						backgroundColor: "purple",
						border: "2px solid white",
					}}
					hoverAnimation={{
						backgroundColor: "rgba(255,255,255,0.3)",
						border: "2px solid lightblue",
					}}
					onClick={() => {
						console.log("clicked");
					}}
					isActive={isActive}
					activeIndicator={{
						styles: {
							backgroundColor: "lightgreen",
							border: "2px solid lightblue",
						},
					}}
					tooltip={{
						label: "Share",
						styles: {
							backgroundColor: "lightgreen",
							color: "black",
						},
						position: ["bottom", "1rem"],
						leftIcon: <KeyboardButton label="Command" width="36px" />,

						// rightComponent: <Icon.Tags color="inherit" size="2em" />,
					}}
				/> */}
				{/* <Icon.Copy
					styles={{
						color: "lightblue",
						padding: s_xxsmall,
					}}
					hoverAnimation={{
						color: "lightgreen",
					}}
					// animateOnHover={true}
					clickAnimation={{
						scale: 0.8,
					}}
					size="large"
					onClick={(e) => {
						console.log("clicked", e);
					}}
					color="white"
					isActive={true}
					activeIndicatorStyles={{
						padding: s_xxsmall,
						color: "white",
						background: "rgba(255,255,255,0.3)",
					}}
					tooltip={{
						label: "Copy",
						styles: {
							backgroundColor: "lightgreen",
							color: "black",
						},
						position: ["bottom", "1rem"],
						leftIcon: <KeyboardButton label="Command" width="36px" />,
						//@ts-ignore
						animation: {
							animationType: "scale",
							animationDuration: [1, 1, 1],
							animationConfig: [0, 1, 0],
						},
						// rightComponent: <Icon.Tags color="inherit" size="2em" />,
					}}
				/> */}
				{/* <Icon.Tags
					styles={{
						color: "lightblue",
						padding: s_xxsmall,
					}}
					hoverAnimation={{
						color: "lightgreen",
					}}
					// animateOnHover={true}
					clickAnimation={{
						scale: 0.8,
					}}
					size="large"
					onClick={() => {
						setIsActive(!isActive);
					}}
					color="white"
					isActive={isActive}
					activeIndicatorStyles={{
						padding: s_xxsmall,
						color: "white",
						background: "rgba(255,255,255,0.3)",
					}}
					tooltip={{
						label: "Copy",
						styles: {
							backgroundColor: "lightgreen",
							color: "black",
						},
						position: ["bottom", "1rem"],
						leftIcon: <KeyboardButton label="Command" width="36px" />,
						// rightComponent: <Icon.Tags color="inherit" size="2em" />,
					}}
				/> */}
				{/* <Icon.Checkbox
					styles={{
						color: "lightblue",
						padding: s_xxsmall,
					}}
					hoverAnimation={{
						color: "lightgreen",
					}}
					// animateOnHover={true}
					clickAnimation={{
						scale: 0.8,
					}}
					size="large"
					onClick={() => {
						setIsActive(!isActive);
					}}
					color="white"
					isActive={isActive}
					activeIndicatorStyles={{
						padding: s_xxsmall,
						color: "white",
						background: "rgba(255,255,255,0.3)",
					}}
					tooltip={{
						label: "Copy",
						styles: {
							backgroundColor: "lightgreen",
							color: "black",
						},
						position: ["bottom", "1rem"],
						leftIcon: <KeyboardButton label="Command" width="36px" />,
						// rightComponent: <Icon.Tags color="inherit" size="2em" />,
					}}
				/> */}
				{/* 
				<Button
					label="Add collection"
					onClick={() => {
						setIsLoading(true);
						setTimeout(() => {
							setIsLoading(false);
							setIsSuccess(true);
							// setIsError(true);
						}, 2000);
					}}
					border="3px solid white"
					backgroundColor="lightblue"
					hoverAnimation={{
						backgroundColor: "rgba(255,255,255,0.3)",
						color: "white",
						scale: 1.05,
						border: "3px solid purple",
					}}
					clickAnimation={{
						scale: 0.8,
					}}
					leftIcon={<Icon.Author color="white" size="2em" />}
					leftIconSuccess={<Icon.Search color="green" size="2em" />}
					tooltipText="Button"
					tooltipPosition={["bottom", "0.5rem"]}
					color="black"
					// paddingInline="2.5rem"
					// isActive={true}
					// activeIndicator={{
					// 	background: "lightpink",
					// 	color: "purple",
					// 	border: "none",
					// 	borderBottom: "6px solid purple",
					// }}
					tooltipStyle={{
						background: "seagreen",
						color: "lightpink",
					}}
					isLoading={isLoading}
					loadingText="Adding..."
					isSuccess={isSuccess}
					successText="Added..."
					successIndicator={{
						color: "green",
						border: "3px solid green",
						background: "lightgreen",
					}}
					isError={isError}
					errorText="Error..."
					errorIndicator={{
						color: "red",
						border: "3px solid red",
						background: "lightpink",
					}}
					loader={<Loader />}
				/> */}
				{/* <Button
					label="Add collection"
					onClick={() => {
						setIsLoading(true);
						setTimeout(() => {
							setIsLoading(false);
							setIsSuccess(true);
							// setIsError(true);
						}, 2000);
					}}
					border="3px solid white"
					backgroundColor="lightblue"
					hoverAnimation={{
						backgroundColor: "rgba(255,255,255,0.3)",
						color: "white",
						scale: 1.05,
						border: "3px solid purple",
					}}
					clickAnimation={{
						scale: 0.8,
					}}
					leftIcon={<Icon.Author color="white" size="2em" />}
					leftIconSuccess={<Icon.Search color="green" size="2em" />}
					tooltipText="Button"
					tooltipPosition={["bottom", "0.5rem"]}
					color="black"
					paddingInline="2.5rem"
					isActive={false}
					activeIndicator={{
						background: "lightpink",
						color: "purple",
						border: "none",
						borderBottom: "6px solid purple",
					}}
					isError={isError}
					errorIndicator1={{
						label: "Error",
						styles: {
							color: "red",
							border: "3px solid red",
							background: "lightpink",
						},
					}}
				/> */}
				<DraftButton
					label="Add collection"
					leftIcon={<Icon.Author color="white" size="2em" />}
					onClick={() => {
						setIsLoading(true);
						setTimeout(() => {
							setIsLoading(false);
							setIsSuccess(true);
							// setIsError(true);
						}, 2000);
					}}
					buttonStyles={{
						borderRadius: br_large,
						background: "seagreen",
					}}
					isActive={isActive}
					activeIndicatorStyles={{
						background: "lightpink",
						color: "purple",
					}}
					// isDisabled={true}
					// disabledIndicator={{
					// 	styles: {
					// 		opacity: 0.2,
					// 		border: "3px solid white",
					// 		cursor: "not-allowed",
					// 	},
					// 	label: "Select a parent collection to proceed",
					// }}
					isLoading={isLoading}
					isSuccess={isSuccess}
					isError={isError}
					// buttonStyles={{
					// 	border: "3px solid white",
					// 	background: "none",
					// 	color: "white",
					// }}
					//@ts-ignore
					hoverAnimation={{
						backgroundColor: "rgba(255,255,255,0.3)",
						color: "rgba(255,255,255,0.8)",
						scale: 1.05,
					}}
					tooltip={{
						label: "VEry very long tooltip text",
						styles: {
							background: "lightblue",
							color: "black",
						},
						disabledStyles: {
							background: "black",
							color: "purple",
							border: "3px solid purple",
						},
					}}
					loadingIndicator={{
						label: "Adding...",
						styles: {
							color: "black",
							borderRadius: br_large,
							background: "lightblue",
						},
						leftIcon: <Icon.Tags color="purple" size="2em" />,
					}}
					successIndicator={{
						label: "Added...",
						styles: {
							color: "green",
							borderRadius: br_large,
							background: "lightgreen",
						},
						leftIcon: <Icon.Checkbox color="green" size="2em" />,
					}}
					errorIndicator={{
						label: "Error...",
						styles: {
							color: "red",
							borderRadius: br_large,
							background: "lightpink",
						},
						leftIcon: <Icon.Menu color="red" size="2em" />,
					}}
				/>
				{/* <DraftButton
					// label="Copy Text"
					leftIcon={
						<Icon.Copy
							color="white"
							size="2em"
							styles={{
								background: "lightpink",
							}}
						/>
					}
					onClick={() => {
						setIsLoading(true);
						setTimeout(() => {
							setIsLoading(false);
							// setIsSuccess(true);
							setIsError(true);
						}, 2000);
					}}
					isActive={true}
					activeIndicatorStyles={{
						background: "yellow",
						color: "black",
						border: "3px solid none",
					}}
					// isDisabled={true}
					// disabledIndicator={{
					// 	styles: {
					// 		opacity: 0.2,
					// 		border: "3px solid white",
					// 		cursor: "not-allowed",
					// 	},
					// 	label: "Select a parent collection to proceed",
					// }}
					isLoading={isLoading}
					isSuccess={isSuccess}
					isError={isError}
					buttonStyles={{
						border: "3px solid white",
						background: "none",
						color: "white",
					}}
					//@ts-ignore
					hoverAnimation={{
						backgroundColor: "rgba(255,255,255,0.3)",
						color: "black",
						scale: 1.05,
						border: "3px solid purple",
					}}
					tooltip={{
						label: "View collection from the sidebar",
						styles: {
							background: "lightblue",
							color: "black",
						},
						disabledStyles: {
							background: "black",
							color: "purple",
							border: "3px solid purple",
						},
					}}
					loadingIndicator={{
						label: "Adding...",
						styles: {
							color: "black",
							border: "3px solid lightblue",
							background: "lightblue",
						},
						leftIcon: <Icon.Tags color="purple" size="2em" />,
					}}
					successIndicator={{
						label: "Added...",
						styles: {
							color: "green",
							border: "3px solid green",
							background: "lightgreen",
						},
						leftIcon: <Icon.Search color="green" size="2em" />,
					}}
					errorIndicator={{
						label: "Error...",
						styles: {
							color: "red",
							border: "3px solid red",
							background: "lightpink",
						},
						leftIcon: <Icon.Menu color="red" size="2em" />,
					}}
				/> */}
				{/* <KeyboardButton label="Command" width={48} />
				<KeyboardButton label="Shift" width={48} />
				<KeyboardButton label="Control" width={48} />
				<KeyboardButton label="Enter" width={48} />
				<KeyboardButton label="A" width={48} /> */}
			</FlexStartRowContainer>
		</CenterAlignedColumnContainer>
	);
};

export default DraftComponent;
