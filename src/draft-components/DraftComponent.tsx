import {
	CenterAlignedColumnContainer,
	fs_regular,
	fw_regular,
	Text,
} from "@bennyui/core";
import React from "react";

const DraftComponent = () => {
	return (
		<CenterAlignedColumnContainer width="100%" height="100vh" borderRadius="0">
			<Text color="white" fontSize={fs_regular} fontWeight={fw_regular}>
				DraftComponent
			</Text>
		</CenterAlignedColumnContainer>
	);
};

export default DraftComponent;
