import {
	br_large,
	CenterAlignedColumnContainer,
	A,
	br_circle,
} from "@bennyui/core";
import * as React from "react";

interface BottomSheetProps {
	bottomSheetContent: () => JSX.Element;
	onClose: () => void;
	overlayColor?: string;
}

const BottomSheet = ({
	bottomSheetContent,
	onClose,
	overlayColor,
}: BottomSheetProps) => {
	React.useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "unset";
		};
	}, []);

	return (
		<CenterAlignedColumnContainer
			id="bottom-sheet-overlay-container"
			position="fixed"
			bottom="0"
			width="100vw"
			height="100vh"
			backgroundColor={overlayColor ? overlayColor : "rgba(0,0,0,0.5)"}
			backdropFilter="blur(10px)"
			borderRadius="0"
			onClick={() => onClose()}
		>
			<A.CenterAlignedColumnContainer
				//@ts-ignore
				id="bottom-sheet-wrapper-container"
				width="100%"
				height="auto"
				position="absolute"
				bottom="0"
				initial={{ y: "100%" }}
				animate={{ y: "0%" }}
				exit={{
					y: "100%",
					transition: { duration: 0.4, ease: [0.6, -0.05, 0.01, 0.99] },
				}}
				transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
				drag="y"
				dragConstraints={{ top: 0, bottom: 0 }}
				dragElastic={0.1}
				onDragEnd={(e, info) => {
					if (info.offset.y > 200) {
						onClose();
					}
				}}
			>
				<CenterAlignedColumnContainer
					id="bottom-sheet-drag-handle"
					width="20%"
					height="0.8vh"
					backgroundColor="black"
					position="absolute"
					top="0.4vh"
					borderRadius={br_large}
				/>
				<CenterAlignedColumnContainer
					id="bottom-sheet-close-button"
					width="32px"
					height="32px"
					position="absolute"
					top="1vh"
					right="1vh"
					backgroundColor="lightgreen"
					borderRadius={br_circle}
					onClick={() => onClose()}
				/>
				{bottomSheetContent()}
			</A.CenterAlignedColumnContainer>
		</CenterAlignedColumnContainer>
	);
};

export default BottomSheet;
