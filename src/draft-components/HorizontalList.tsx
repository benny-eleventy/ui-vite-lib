import {
	CenterAlignedColumnContainer,
	OverflowRowContainer,
} from "@bennyui/core";
import React from "react";

const HorizontalList = () => {
	return (
		<CenterAlignedColumnContainer
			width="90%"
			height="auto"
			border="1px solid white"
			position="relative"
		>
			<OverflowRowContainer width="100%">
				{Array.from({ length: 10 }).map((_, index) => (
					<div
						key={index}
						style={{
							width: "18vw",
							aspectRatio: "1",
							backgroundColor: "lightpink",
						}}
					/>
				))}
			</OverflowRowContainer>
			<CenterAlignedColumnContainer
				width="40px"
				height="40px"
				border="1px solid white"
				background="lightblue"
				position="absolute"
				left="0"
			/>
			<CenterAlignedColumnContainer
				width="40px"
				height="40px"
				border="1px solid white"
				background="lightblue"
				position="absolute"
				right="0"
			/>
		</CenterAlignedColumnContainer>
	);
};

export default HorizontalList;
