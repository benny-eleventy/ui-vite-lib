import { CenterAlignedRowContainer, A, br_circle } from "@bennyui/core";
import React from "react";

const Loader = () => {
	return (
		<CenterAlignedRowContainer
			width="100%"
			height="100%"
			position="absolute"
			background="rgba(0,0,0,0.6)"
			borderRadius="0"
		>
			<A.CenterAlignedColumnContainer
				width="1rem"
				aspectRatio="1"
				background="white"
				borderRadius={br_circle}
				animationType="opacity"
				animationDuration={[0.5, 0.5]}
				animationConfig={[0, 1, 0]}
				animationEasing="easeInOut"
				animationDelay={0}
				animationRepeat={Infinity}
				animationRepeatType="mirror"
			/>
			<A.CenterAlignedColumnContainer
				width="1rem"
				aspectRatio="1"
				background="white"
				borderRadius={br_circle}
				animationType="scale"
				animationDuration={[0.4, 0.5]}
				animationConfig={[0, 1, 0]}
				animationEasing="easeInOut"
				animationDelay={0.2}
				animationRepeat={Infinity}
				animationRepeatType="mirror"
			/>
			<A.CenterAlignedColumnContainer
				width="1rem"
				aspectRatio="1"
				background="white"
				borderRadius={br_circle}
				animationType="opacity"
				animationDuration={[0.5, 0.5]}
				animationConfig={[0, 1, 0]}
				animationEasing="easeInOut"
				animationDelay={0.3}
				animationRepeat={Infinity}
				animationRepeatType="mirror"
			/>
		</CenterAlignedRowContainer>
	);
};

export default Loader;
