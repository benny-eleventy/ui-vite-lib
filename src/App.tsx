import { useState } from "react";
import {
	AnimatePresence,
	br_large,
	CenterAlignedColumnContainer,
	GridContainer,
	Text,
} from "@bennyui/core";
import { GlobalStyles } from "./styles/GlobalStyles";
import { BottomSheet } from "./draft-components";
import { Outlet } from "react-router-dom";
import SideBar from "./components/Sidebar/SideBar";

function App() {
	const [showBottomSheet, setShowBottomSheet] = useState(true);
	return (
		<GridContainer
			width="100vw"
			height="100vh"
			backgroundColor="black"
			borderRadius="0"
			gridTemplateColumns="8vw 1fr"
		>
			<SideBar />
			<Outlet />
		</GridContainer>
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
