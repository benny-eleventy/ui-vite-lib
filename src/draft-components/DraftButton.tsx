import {
	A,
	AnimatedContainerProps,
	AnimatePresence,
	CenterAlignedColumnContainer,
	fs_regular,
	fw_regular,
	primaryFont,
	s,
	Text,
} from "@bennyui/core";
import * as React from "react";
import styled, { StyledComponent } from "styled-components";
import { Icon } from "@bennyui/icons";
import { TargetAndTransition, VariantLabels } from "framer-motion";

type IconType = React.ReactElement<
	any,
	string | React.JSXElementConstructor<any>
>;

type TooltipType = {
	label?: string;
	position?: string[];
	styles?: React.CSSProperties;
	disabledStyles?: React.CSSProperties;
	leftIcon?: IconType;
	rightIcon?: IconType;
};

interface ButtonProps extends AnimatedContainerProps {
	label?: string;
	onClick: () => void;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
	rightIcon?: IconType;
	leftIcon?: IconType;
	tooltip?: TooltipType;
	isLoading?: boolean;
	isError?: boolean;
	isSuccess?: boolean;
	isActive?: boolean;
	isDisabled?: boolean;
	disabledIndicator?: IndicatorType;
	loader?: IconType;
	activeIndicatorStyles?: React.CSSProperties;
	loadingIndicator?: IndicatorType;
	successIndicator?: IndicatorType;
	errorIndicator?: IndicatorType;
	buttonStyles?: React.CSSProperties;
}

type IndicatorType = {
	label?: string;
	styles?: React.CSSProperties;
	leftIcon?: IconType;
	rightIcon?: IconType;
};

function useMemoizedIcon(icon?: IconType) {
	return React.useMemo(() => {
		return icon;
	}, [icon]);
}

const DraftButton = (props: ButtonProps) => {
	const {
		label,
		onClick,
		rightIcon,
		leftIcon,
		isLoading,
		loadingIndicator,
		isSuccess,
		successIndicator,
		isError,
		errorIndicator,
		loader,
		isActive,
		activeIndicatorStyles,
		tooltip,
		buttonStyles,
		isDisabled,
		disabledIndicator,
		hoverAnimation,
		...rest
	} = props;

	if (!label && !leftIcon && !rightIcon) {
		throw new Error("Button must have a label, leftIcon, or rightIcon");
	}
	if (!onClick) {
		throw new Error("Button must have an onClick function");
	}
	if (isActive !== undefined && !activeIndicatorStyles) {
		throw new Error(
			"Button must have activeIndicatorStyles if isActive is used"
		);
	}
	if (isDisabled && disabledIndicator === undefined) {
		throw new Error("Button must have disabledIndicator if isDisabled is used");
	}

	const [isHovered, setIsHovered] = React.useState(false);

	const handleMouseEnter = React.useCallback(() => {
		setIsHovered(true);
	}, []);

	const handleMouseLeave = React.useCallback(() => {
		setIsHovered(false);
	}, []);

	const handleClick = React.useCallback(() => {
		if (isDisabled) {
			return;
		}
		props.onClick();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.onClick, isDisabled]);

	React.useEffect(() => {
		const handleMouseDown = () => {
			console.log("useEffect");
			setIsHovered(false);
		};
		window.addEventListener("mousedown", handleMouseDown);

		return () => {
			window.removeEventListener("mousedown", handleMouseDown);
		};
	}, []);

	const ParentWrapper = React.useMemo(() => {
		console.log("ParentWrapper");
		return getParentWrapper({
			isLoading,
			isError,
			isSuccess,
			isActive,
			isDisabled,
		});
	}, [isLoading, isError, isSuccess, isActive, isDisabled, isHovered]);

	const _loader = useMemoizedIcon(loader);

	const _leftIcon = useMemoizedIcon(leftIcon);
	const _rightIcon = useMemoizedIcon(rightIcon);

	const _loadingIndicatorLeftIcon = useMemoizedIcon(loadingIndicator?.leftIcon);
	const _loadingIndicatorRightIcon = useMemoizedIcon(
		loadingIndicator?.rightIcon
	);

	const _errorIndicatorLeftIcon = useMemoizedIcon(errorIndicator?.leftIcon);
	const _errorIndicatorRightIcon = useMemoizedIcon(errorIndicator?.rightIcon);

	const _successIndicatorLeftIcon = useMemoizedIcon(successIndicator?.leftIcon);
	const _successIndicatorRightIcon = useMemoizedIcon(
		successIndicator?.rightIcon
	);

	const _loadingIndicatorStyles = loadingIndicator?.styles;
	const _errorIndicatorStyles = errorIndicator?.styles;
	const _successIndicatorStyles = successIndicator?.styles;
	const _activeIndicatorStyles = activeIndicatorStyles;

	const _disabledIndicatorStyles = disabledIndicator?.styles;
	const _disabledTooltipLabel = disabledIndicator?.label || "Disabled";

	const _tooltipLabel = isDisabled
		? _disabledTooltipLabel
		: tooltip?.label ?? "Add a tooltip";
	const _tooltipStyles = isDisabled ? tooltip?.disabledStyles : tooltip?.styles;
	const _tooltipPosition = tooltip?.position ?? ["left", "1rem"];

	const leftIconComponent = React.useMemo(() => {
		console.log("leftIconComponent");
		return getLeftIcon({
			isLoading,
			isError,
			isSuccess,
			leftIcon: _leftIcon,
			loadingIndicatorLeftIcon: _loadingIndicatorLeftIcon,
			errorIndicatorLeftIcon: _errorIndicatorLeftIcon,
			successIndicatorLeftIcon: _successIndicatorLeftIcon,
		});
	}, [
		isLoading,
		isError,
		isSuccess,
		_leftIcon,
		_loadingIndicatorLeftIcon,
		_errorIndicatorLeftIcon,
		_successIndicatorLeftIcon,
	]);

	const rightIconComponent = React.useMemo(() => {
		return getRightIcon({
			isLoading,
			isError,
			isSuccess,
			rightIcon: _rightIcon,
			loadingIndicatorRightIcon: _loadingIndicatorRightIcon,
			errorIndicatorRightIcon: _errorIndicatorRightIcon,
			successIndicatorRightIcon: _successIndicatorRightIcon,
		});
	}, [
		isLoading,
		isError,
		isSuccess,
		_rightIcon,
		_loadingIndicatorRightIcon,
		_errorIndicatorRightIcon,
		_successIndicatorRightIcon,
	]);

	const inLineStyles = React.useMemo(() => {
		return getInlineStyles({
			isLoading,
			isError,
			isSuccess,
			isActive,
			isDisabled,
			_loadingIndicatorStyles,
			_errorIndicatorStyles,
			_successIndicatorStyles,
			_activeIndicatorStyles,
			_disabledIndicatorStyles,
			buttonStyles,
		});
	}, [
		isLoading,
		isError,
		isSuccess,
		isActive,
		isDisabled,
		_loadingIndicatorStyles,
		_errorIndicatorStyles,
		_successIndicatorStyles,
		_activeIndicatorStyles,
		_disabledIndicatorStyles,
		buttonStyles,
	]);

	return (
		<CenterAlignedColumnContainer
			width="auto"
			height="auto"
			position="relative"
		>
			<ParentWrapper
				{...props}
				hoverAnimation={hoverAnimation}
				onClick={handleClick}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				style={inLineStyles}
			>
				{leftIcon &&
					React.cloneElement(leftIconComponent ?? <></>, {
						padding: "0",
						disableHoverAnimation: true,
						maxWidth: "3em",
						color: "inherit",
					})}
				{label && (
					<LabelText
						label={label}
						isLoading={isLoading}
						isSuccess={isSuccess}
						isError={isError}
						loadingText={loadingIndicator?.label}
						errorText={errorIndicator?.label}
						successText={successIndicator?.label}
					/>
				)}
				{rightIcon &&
					React.cloneElement(rightIconComponent ?? <></>, {
						padding: "0",
						disableHoverAnimation: true,
						maxWidth: "3em",
						color: "inherit",
					})}
			</ParentWrapper>
			<>
				{isLoading &&
					_loader &&
					React.cloneElement(_loader, {
						maxWidth: "100%",
					})}
			</>
			<AnimatePresence>
				{isHovered && !isLoading && !isSuccess && !isError && (
					<ToolTip
						label={_tooltipLabel}
						position={_tooltipPosition}
						styles={_tooltipStyles}
					/>
				)}
			</AnimatePresence>
		</CenterAlignedColumnContainer>
	);
};

export default DraftButton;

function StatusMessage({
	isVisible,
	text,
}: {
	isVisible?: boolean;
	text?: string;
}) {
	return (
		<Text
			color="inherit"
			style={{
				opacity: isVisible ? 1 : 0,
				position: "absolute",
			}}
		>
			{text}
		</Text>
	);
}

interface LabelText {
	label: string;
	isLoading?: boolean;
	isSuccess?: boolean;
	isError?: boolean;
	loadingText?: string;
	errorText?: string;
	successText?: string;
}

const LabelText = ({
	label,
	isLoading,
	isSuccess,
	isError,
	loadingText,
	errorText,
	successText,
}: LabelText) => {
	return (
		<CenterAlignedColumnContainer
			width="auto"
			height="auto"
			position="relative"
		>
			<Text
				color="inherit"
				style={{
					opacity: isLoading || isError || isSuccess ? 0 : 1,
				}}
			>
				{label.length > 20 ? label.slice(0, 20) + "..." : label}
			</Text>
			<StatusMessage isVisible={isLoading} text={loadingText || "Loading..."} />
			<StatusMessage isVisible={isError} text={errorText || "Error!"} />
			<StatusMessage isVisible={isSuccess} text={successText || "Done"} />
		</CenterAlignedColumnContainer>
	);
};

interface ToolTipProps {
	label: string;
	position: string[];
	styles?: React.CSSProperties;
}

const ToolTip = React.memo((props: ToolTipProps) => {
	const { label, position, styles } = props;
	console.log("ToolTip", props.position);

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

	return (
		<>
			<A.CenterAlignedColumnContainer
				width="auto"
				height="auto"
				position="absolute"
				style={{
					...getTooltipPositionStyles(position),
					...styles,
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
				{props.label}
			</A.CenterAlignedColumnContainer>
		</>
	);
});

const getParentWrapper = ({
	isLoading,
	isError,
	isSuccess,
	isActive,
	isDisabled,
}: {
	isLoading: boolean | undefined;
	isError: boolean | undefined;
	isSuccess: boolean | undefined;
	isActive: boolean | undefined;
	isDisabled: boolean | undefined;
}) => {
	console.log("getParentWrapper", isActive);
	if (isLoading) {
		return StyledButtonContainer;
	} else if (isError) {
		return StyledButtonContainer;
	} else if (isSuccess) {
		return StyledButtonContainer;
	} else if (isDisabled) {
		return StyledButtonContainer;
	} else {
		return ButtonContainer;
	}
};

const getInlineStyles = ({
	isLoading,
	isError,
	isSuccess,
	isActive,
	isDisabled,
	_loadingIndicatorStyles,
	_errorIndicatorStyles,
	_successIndicatorStyles,
	_activeIndicatorStyles,
	_disabledIndicatorStyles,
	buttonStyles,
}: {
	isLoading: boolean | undefined;
	isError: boolean | undefined;
	isSuccess: boolean | undefined;
	isActive: boolean | undefined;
	isDisabled: boolean | undefined;
	_loadingIndicatorStyles: React.CSSProperties | undefined;
	_errorIndicatorStyles: React.CSSProperties | undefined;
	_successIndicatorStyles: React.CSSProperties | undefined;
	_activeIndicatorStyles: React.CSSProperties | undefined;
	_disabledIndicatorStyles: React.CSSProperties | undefined;
	buttonStyles: React.CSSProperties | undefined;
}) => {
	if (isLoading) {
		return _loadingIndicatorStyles;
	}
	if (isError) {
		return _errorIndicatorStyles;
	}
	if (isSuccess) {
		return _successIndicatorStyles;
	}
	if (isActive) {
		return _activeIndicatorStyles;
	}
	if (isDisabled) {
		return _disabledIndicatorStyles;
	} else {
		return buttonStyles;
	}
};

const ButtonContainer = styled(A.Button)<ButtonProps>`
	position: relative;
	// background-color: ${({ backgroundColor }) => backgroundColor || "none"};
`;

const ActiveButtonContainer = styled(A.Button)<ButtonProps>`
	position: relative;
	// background-color: ${({ backgroundColor }) => backgroundColor || "none"};
`;

const StyledButtonContainer: StyledComponent<
	typeof s.Button,
	any,
	ButtonProps
> = styled(s.Button)<ButtonProps>`
	position: relative;
	// background-color: ${({ backgroundColor }) => backgroundColor || "none"};
`;

const getFallBackIcon = ({
	status,
}: {
	status: "loading" | "error" | "success";
}) => {
	console.log("getFallBackIcon fn");
	switch (status) {
		case "loading":
			return <Icon.Search color="inherit" />;
		case "error":
			return <Icon.Author color="inherit" />;
		case "success":
			return <Icon.Checkbox color="inherit" />;
	}
};

const getLeftIcon = ({
	isLoading,
	isError,
	isSuccess,
	leftIcon,
	loadingIndicatorLeftIcon,
	errorIndicatorLeftIcon,
	successIndicatorLeftIcon,
}: {
	isLoading: boolean | undefined;
	isError: boolean | undefined;
	isSuccess: boolean | undefined;
	leftIcon: IconType | undefined;
	loadingIndicatorLeftIcon: IconType | undefined;
	errorIndicatorLeftIcon: IconType | undefined;
	successIndicatorLeftIcon: IconType | undefined;
}) => {
	if (!isLoading && !isError && !isSuccess) {
		return leftIcon;
	}

	if (isLoading) {
		return loadingIndicatorLeftIcon || getFallBackIcon({ status: "loading" });
	}

	if (isError) {
		return errorIndicatorLeftIcon || getFallBackIcon({ status: "error" });
	}

	if (isSuccess) {
		return successIndicatorLeftIcon || getFallBackIcon({ status: "success" });
	}
};

const getRightIcon = ({
	isLoading,
	isError,
	isSuccess,
	rightIcon,
	loadingIndicatorRightIcon,
	errorIndicatorRightIcon,
	successIndicatorRightIcon,
}: {
	isLoading: boolean | undefined;
	isError: boolean | undefined;
	isSuccess: boolean | undefined;
	rightIcon: IconType | undefined;
	loadingIndicatorRightIcon: IconType | undefined;
	errorIndicatorRightIcon: IconType | undefined;
	successIndicatorRightIcon: IconType | undefined;
}) => {
	if (!isLoading && !isError && !isSuccess) {
		return rightIcon;
	}

	if (isLoading) {
		return loadingIndicatorRightIcon || getFallBackIcon({ status: "loading" });
	}

	if (isError) {
		return errorIndicatorRightIcon || getFallBackIcon({ status: "error" });
	}

	if (isSuccess) {
		return successIndicatorRightIcon || getFallBackIcon({ status: "success" });
	}
};
