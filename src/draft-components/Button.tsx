import * as React from "react";
import {
	AnimatePresence,
	CenterAlignedColumnContainer,
	fs_regular,
	fs_small,
	fw_regular,
	primaryFont,
	styled,
	s_xxsmall,
	Text,
	s,
	A,
} from "@bennyui/core";
import { CoreProps } from "@bennyui/core";
import { useCallback, useEffect, useMemo } from "react";

interface ButtonProps extends CoreProps {
	[x: string]: any;
	// Add props here
	isLoading?: boolean;
	label?: string;
	leftIcon?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
	leftIconSuccess?: React.ReactElement<
		any,
		string | React.JSXElementConstructor<any>
	>;
	onClick: () => void;
	rightIcon?: React.ReactElement<
		any,
		string | React.JSXElementConstructor<any>
	>;
	tooltipPosition?: string[];
	tooltipText?: string;
	tooltipStyle?: any;
	isActive?: boolean;
	activeIndicator?: ActiveIndicatorType;
	loader?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
	loadingText?: string;
	isSuccess?: boolean;
	successText?: string;
	isError?: boolean;
	errorText?: string;
	errorIndicator?: ActiveIndicatorType;
	errorIndicator1?: ErrorIndicatorType;
}

type ErrorIndicatorType = {
	label?: string;
	styles?: React.CSSProperties;
	leftIcon?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
	rightIcon?: React.ReactElement<
		any,
		string | React.JSXElementConstructor<any>
	>;
};

type ActiveIndicatorType = {
	background?: string;
	borderBottom?: string;
	border?: string;
	color: string;
	opacity?: string | number;
	scale?: string | number;
};

const Button = React.memo((props: ButtonProps) => {
	const {
		label,
		onClick,
		rightIcon,
		leftIcon,
		tooltipText,
		tooltipPosition,
		isLoading,
		tooltipStyle,
		isActive,
		activeIndicator,
		loader,
		loadingText,
		isSuccess,
		successText,
		successIndicator,
		isError,
		errorText,
		errorIndicator,
		...rest
	} = props;

	return <ButtonComponent {...props}></ButtonComponent>;
});
export { Button };
export type { ButtonProps };
export default Button;

interface ToolTipProps {
	tooltipText: string;
	position: string[];
	tooltipStyle?: { [key: string]: string };
}

const ToolTip = React.memo((props: ToolTipProps) => {
	const { tooltipText, position, tooltipStyle } = props;
	console.log("ToolTip", props.position);
	return (
		<>
			<A.CenterAlignedColumnContainer
				width="auto"
				height="auto"
				position="absolute"
				// style={{
				// 	[position[0]]: `calc( -${
				// 		position[0] == "top" || position[0] == "bottom"
				// 			? "100%"
				// 			: `${11 * tooltipText.length}px`
				// 	}
				//     - ${
				// 								position[0] == "left" || position[0] == "right"
				// 									? "1.8rem"
				// 									: "0"
				// 							}
				//     - ${position[1]})`,
				// 	...tooltipStyle,
				// }}
				style={{
					[position[0]]: `calc( -${
						position[0] == "top" || position[0] == "bottom"
							? "50%"
							: `${11 * tooltipText.length}px`
					}					
                        - ${position[1]})`,
					...tooltipStyle,
				}}
				padding="0.25rem 0.4rem"
				backgroundColor="rgba(255,255,255,0.3)"
				animationType="opacity"
				animationConfig={[0, 1, 0]}
				animationDuration={[0.4, 0.2]}
				fontFamily={primaryFont}
				fontSize={fs_regular}
				color="rgba(255,255,255,0.8)"
				textAlign="center"
				fontWeight={fw_regular}
				whiteSpace="nowrap"
			>
				{props.tooltipText}
			</A.CenterAlignedColumnContainer>
		</>
	);
});

const ButtonContainer = styled(A.Button)<ButtonProps>`
	position: relative;
	background-color: ${({ backgroundColor }) => backgroundColor || "none"};
`;

const StyledButtonContainer = styled(s.Button)<ButtonProps>`
	position: relative;
	background-color: ${({ backgroundColor }) => backgroundColor || "none"};
`;

const getParent = (props: ButtonProps) => {
	console.log("getParent called");
	if (
		!props.isLoading &&
		!props.isError &&
		!props.isSuccess &&
		!props.isActive
	) {
		return ButtonContainer;
	} else {
		return StyledButtonContainer;
	}
};

const ButtonComponent = (props: ButtonProps) => {
	const {
		label,
		onClick,
		rightIcon,
		leftIcon,
		tooltipText,
		tooltipPosition,
		isLoading,
		tooltipStyle,
		isActive,
		activeIndicator,
		loader,
		loadingText,
		isSuccess,
		successText,
		successIndicator,
		isError,
		errorText,
		errorIndicator,
		hoverAnimation,
		...rest
	} = props;

	const [isHovered, setIsHovered] = React.useState(false);

	const handleMouseEnter = useCallback(() => {
		setIsHovered(true);
	}, []);

	const handleMouseLeave = useCallback(() => {
		setIsHovered(false);
	}, []);

	const handleClick = useCallback(() => {
		props.onClick();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.onClick]);

	useEffect(() => {
		const handleMouseDown = () => {
			setIsHovered(false);
		};

		window.addEventListener("mousedown", handleMouseDown);

		return () => {
			window.removeEventListener("mousedown", handleMouseDown);
		};
	}, []);

	if (
		(label == undefined || label == "") &&
		leftIcon == undefined &&
		rightIcon == undefined
	) {
		throw new Error("Label, leftIcon or rightIcon one of them is mandatory");
	}

	const ParentWrapper = useMemo(() => getParent(props), [props]);

	const getInlineStyles = (props: ButtonProps) => {
		console.log("getInlineStyles called");
		if (
			!props.isLoading &&
			!props.isError &&
			!props.isSuccess &&
			!props.isActive
		) {
			return {};
		} else if (props.isError) {
			return props.errorIndicator;
		} else if (props.isSuccess) {
			return props.successIndicator;
		} else if (props.isActive) {
			return props.activeIndicator;
		}
	};

	const getLeftIcon = (props: ButtonProps) => {
		console.log("getLeftIcon called");
		if (props.isSuccess) {
			return props.leftIconSuccess;
		} else {
			return props.leftIcon;
		}
	};

	const leftIconComponent = useMemo(
		() => getLeftIcon(props),
		[props.isSuccess, props.leftIcon, props.leftIconSuccess]
	);

	const inlineStyles = useMemo(
		() => getInlineStyles(props),
		[
			props.isError,
			props.isSuccess,
			props.isActive,
			props.errorIndicator,
			props.successIndicator,
			props.activeIndicator,
		]
	);

	return (
		<CenterAlignedColumnContainer
			width="auto"
			height="auto"
			position="relative"
		>
			<ParentWrapper
				{...rest}
				key="BUtton-BUtton"
				isHovered={isHovered}
				hoverAnimation={hoverAnimation}
				disableHoverAnimation={isError}
				onHoverStart={handleMouseEnter}
				onHoverEnd={handleMouseLeave}
				isError={isError}
				errorIndicator={errorIndicator}
				isActive={isActive}
				activeIndicator={activeIndicator}
				isSuccess={isSuccess}
				successIndicator={successIndicator}
				onClick={handleClick}
				textTransform="uppercase"
				style={inlineStyles}
			>
				{leftIcon &&
					React.cloneElement(leftIconComponent ?? <></>, {
						padding: "0",
						disableHoverAnimation: true,
						maxWidth: "3em",
						color: "inherit",
					})}
				<CenterAlignedColumnContainer
					width="auto"
					height="auto"
					position="relative"
				>
					<Text
						color="inherit"
						style={{
							opacity: isLoading || isSuccess || isError ? 0 : 1,
						}}
					>
						{label}
					</Text>
					<Text
						color="inherit"
						style={{
							opacity: isLoading ? 1 : 0,
							position: "absolute",
							// left: "0",
						}}
					>
						{isLoading && loadingText ? loadingText : "Loading..."}
					</Text>
					<Text
						color="inherit"
						style={{
							opacity: isError ? 1 : 0,
							position: "absolute",
							// left: "0",
						}}
					>
						{isError && errorText ? errorText : "Errror"}
					</Text>
					<Text
						color="inherit"
						style={{
							opacity: isSuccess ? 1 : 0,
							position: "absolute",
							// left: "0",
						}}
					>
						{isSuccess && successText ? successText : "Errror"}
					</Text>
				</CenterAlignedColumnContainer>
				{rightIcon &&
					React.cloneElement(rightIcon, {
						padding: "0",
						disableHoverAnimation: true,
						maxWidth: "3em",
						color: "inherit",
					})}
			</ParentWrapper>
			<AnimatePresence>
				{tooltipText && isHovered && (
					<ToolTip
						// displayTooltip={isHovered}
						tooltipText={tooltipText}
						position={tooltipPosition ?? ["bottom", "0.5rem"]}
						tooltipStyle={tooltipStyle}
					/>
				)}
			</AnimatePresence>
			<>
				{isLoading && loader
					? React.cloneElement(loader, {
							maxWidth: "100%",
					  })
					: null}
			</>
		</CenterAlignedColumnContainer>
	);
};
