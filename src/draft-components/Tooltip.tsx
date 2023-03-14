import {
	A,
	primaryFont,
	fs_xsmall,
	s_xsmall,
	br_small,
	fs_regular,
	s_xxsmall,
} from "@bennyui/core";
import { EasingDefinition, Variant } from "framer-motion";
import React from "react";

type ReactComponent = React.ReactElement<
	any,
	string | React.JSXElementConstructor<any>
>;

interface AcustomInterface {
	animationType?: "opacity" | "scale" | "rotate" | "x" | "y";
	animationDuration?: number[];
	animationConfig?: number[];
	animationEasing?: EasingDefinition;
	hoverAnimation?: Variant;
	clickAnimation?: Variant;
	animationDelay?: number;
	animationRepeat?: number;
	animationRepeatType?: "loop" | "reverse" | "none" | "mirror";
}

interface ToolTipProps {
	id: string;
	label: string;
	position: string[];
	styles?: React.CSSProperties;
	leftIcon?: ReactComponent;
	rightIcon?: ReactComponent;
	animation?: AcustomInterface;
}

const ToolTip = React.memo((props: ToolTipProps) => {
	const { label, position, styles, leftIcon, rightIcon, animation } = props;

	const getTooltipPositionStyles = (position: string[]) => {
		switch (position[0]) {
			case "top":
				return {
					bottom: `calc(100% + ${position[1]})`,
				};
			case "bottom":
				return {
					top: `calc(100% + ${position[1]})`,
				};
			case "left":
				return {
					right: `calc(100% + ${position[1]})`,
				};
			case "right":
				return {
					left: `calc(100% + ${position[1]})`,
				};
		}
	};

	const _animationType = animation?.animationType ?? "opacity";
	const _animationDuration = animation?.animationDuration ?? [0.4, 0.2];
	const _animationConfig = animation?.animationConfig ?? [0, 1, 0];

	return (
		<>
			<A.FlexStartRowContainer
				width="auto"
				height="auto"
				position="absolute"
				gap="0.4rem"
				style={{
					borderRadius: br_small,
					fontSize: fs_regular,
					paddingBlock: s_xxsmall,
					paddingInline: s_xsmall,
					gap: s_xsmall,
					...getTooltipPositionStyles(position),
					...styles,
				}}
				backgroundColor="rgba(255,255,255,0.3)"
				{...animation}
				animationType={_animationType}
				animationConfig={_animationConfig}
				animationDuration={_animationDuration}
				fontFamily={primaryFont}
				fontSize={fs_xsmall}
				color="rgba(255,255,255,0.8)"
				textAlign="center"
				whiteSpace="nowrap"
			>
				{leftIcon &&
					React.cloneElement(leftIcon ?? <></>, {
						disableHoverAnimation: true,
						color: "inherit",
					})}
				{props.label}
				{rightIcon &&
					React.cloneElement(rightIcon ?? <></>, {
						disableHoverAnimation: true,
						color: "inherit",
					})}
			</A.FlexStartRowContainer>
		</>
	);
});

export default ToolTip;
