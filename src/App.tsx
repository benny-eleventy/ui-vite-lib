import { useState } from "react";
import {
	AnimatePresence,
	br_large,
	CenterAlignedColumnContainer,
	Text,
} from "@bennyui/core";
import { GlobalStyles } from "./styles/GlobalStyles";
import { BottomSheet } from "./draft-components";

function App() {
	const [showBottomSheet, setShowBottomSheet] = useState(true);
	return (
		<>
			<GlobalStyles />
			<CenterAlignedColumnContainer
				height="100vh"
				width="100vw"
				backgroundColor="lightgreen"
				borderRadius="0"
			>
				<Text color="white">This is the app</Text>
				<AnimatePresence>
					{showBottomSheet && (
						<BottomSheet
							bottomSheetContent={() => <BottomSheetContent />}
							onClose={() => setShowBottomSheet(false)}
						/>
					)}
				</AnimatePresence>
			</CenterAlignedColumnContainer>
		</>
	);
}

export default App;

const BottomSheetContent = () => {
	return (
		<CenterAlignedColumnContainer
			id="bottom-sheet-content"
			width="100%"
			height="50vh"
			backgroundColor="lightpink"
			borderTop="1px solid #e5e5e5"
			borderRadius={`${br_large} ${br_large} 0 0`}
		>
			<Text color="black">This is the bottom sheet</Text>
		</CenterAlignedColumnContainer>
	);
};
