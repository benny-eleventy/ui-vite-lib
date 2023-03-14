import * as I from "./index";
import React, { MouseEventHandler } from "react";
import {
	A,
	AnimatedContainerProps,
	AnimatePresence,
	CoreProps,
} from "@bennyui/core";
import { Tooltip } from "@bennyui/components";
import styled from "styled-components";
import { getInlineStyles } from "../utils/getInlineStyles";
import { checkConditions } from "../utils/errorCheck";

export const Icon = (props: { children: any }) => {
	return <>{props.children}</>;
};

type ReactComponent = React.ReactElement<
	any,
	string | React.JSXElementConstructor<any>
>;

type TooltipType = {
	label: string;
	position?: string[];
	styles?: React.CSSProperties;
	disabledStyles?: React.CSSProperties;
	leftIcon?: ReactComponent;
	rightIcon?: ReactComponent;
};

type IndicatorType = {
	label?: string;
	tooltipLabel?: string;
	styles?: React.CSSProperties;
	leftIcon?: ReactComponent;
	rightIcon?: ReactComponent;
};

interface IconCoreProps extends AnimatedContainerProps {
	color: string;
	activeIndicator?: IndicatorType;
	clickAnimation?: any;
	disableHoverAnimation?: boolean;
	disableHoverAnimationWhenActive?: boolean;
	isActive?: boolean | undefined;
	isCursorPointer?: any;
	onClick?: MouseEventHandler<HTMLDivElement> | undefined;
	onMouseEnter?: MouseEventHandler<HTMLDivElement> | undefined;
	onMouseLeave?: MouseEventHandler<HTMLDivElement> | undefined;
	size?: "small" | "large" | "regular" | string;
	styles?: React.CSSProperties;
	tooltip?: TooltipType;
	animateOnHover?: boolean;
}

const defaultIconProps: IconCoreProps = {
	aspectRatio: "1",
	background: "transparent",
	boxShadow: "none",
	color: "white",
	hoverAnimation: {
		backgroundColor: "#2a2a2a",
		scale: 1.1,
	},
	size: "regular",
};

function createIconComponent(iconName: string) {
	const Icon = React.memo((props: IconCoreProps) => {
		const {
			activeIndicator,
			animateOnHover,
			clickAnimation,
			color,
			disableHoverAnimation,
			disableHoverAnimationWhenActive,
			hoverAnimation,
			isActive,
			isCursorPointer,
			onClick,
			onMouseEnter,
			onMouseLeave,
			size,
			styles,
			tooltip,
			...rest
		} = props;

		checkConditions([
			{
				condition: isActive == undefined && activeIndicator,
				message: `Icon ${iconName} is missing the isActive prop. If you are not using the activeIndicator prop, please remove it.`,
			},
			{
				condition: animateOnHover == false && hoverAnimation,
				message: `Icon ${iconName} has animateHover as false, please remove the hoverAnimation prop.`,
			},
			{
				condition: (isActive == true || isActive == false) && !activeIndicator,
				message: `Icon ${iconName} has isActive as ${isActive}, please add the activeIndicator prop.`,
			},
			{
				condition: tooltip && !tooltip.label,
				message: `Icon ${iconName} has a tooltip prop, but is missing the label prop.`,
			},
		]);

		const [isHovered, setIsHovered] = React.useState(false);
		const [isClicked, setIsClicked] = React.useState(false);

		const handleClick = React.useCallback(
			(e: any) => {
				if (onClick) {
					setIsHovered(false);
					setIsClicked(true);
					onClick(e);
				}
			},
			[onClick]
		);
		const handleMouseEnter = React.useCallback(
			(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
				setIsHovered(true);
				if (onMouseEnter) {
					onMouseEnter(e);
				}
			},
			[]
		);

		const handleMouseLeave = React.useCallback(
			(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
				setIsHovered(false);
				setIsClicked(false);
				if (onMouseLeave) {
					onMouseLeave(e);
				}
			},
			[]
		);

		const getIconSize = React.useMemo(() => {
			return (size: string | undefined) => {
				switch (size) {
					case "small":
						return "32px";
					case "medium":
						return "48px";
					case "large":
						return "64px";
					default:
						return size;
				}
			};
		}, [props.size]);

		// @ts-ignore
		const IconCmpnt = I[iconName];

		const _color = color || defaultIconProps.color;

		const getHoverAnimation = ({
			hoverAnimation,
			isActive,
			disableHoverAnimation,
			disableHoverAnimationWhenActive,
			isClicked,
		}: any) => {
			if (disableHoverAnimation) {
				return {};
			}
			if (disableHoverAnimationWhenActive && isActive) {
				return {};
			}
			if (isClicked) {
				return {};
			}
			return hoverAnimation;
		};

		const getTooltipLabel = ({
			tooltipLabel,
			activeIndicator,
			isActive,
		}: any) => {
			if (activeIndicator && isActive) {
				return activeIndicator.tooltipLabel;
			}
			if (tooltipLabel) {
				return tooltip?.label;
			}
			return "";
		};

		const _tooltipLabel = React.useMemo(() => {
			return getTooltipLabel({
				tooltipLabel: tooltip?.label,
				activeIndicator,
				isActive,
			});
		}, [tooltip?.label, activeIndicator, isActive]);

		const _hoverAnimation = React.useMemo(() => {
			return getHoverAnimation({
				hoverAnimation,
				isActive,
				disableHoverAnimation,
				disableHoverAnimationWhenActive,
				isClicked,
			});
		}, [
			hoverAnimation,
			isActive,
			disableHoverAnimation,
			disableHoverAnimationWhenActive,
			isClicked,
		]);

		const _activeIndicatorStyles = activeIndicator?.styles || {};

		const inLineStyles = React.useMemo(() => {
			return getInlineStyles({
				isActive,
				_activeIndicatorStyles,
				styles,
			});
		}, [isActive, _activeIndicatorStyles, styles]);

		return (
			<IconParentContainer
				{...rest}
				// @ts-ignore
				id={`icon-parent-container-${iconName}`}
				color={_color}
				isActive={isActive}
				onClick={handleClick}
				whileHover={_hoverAnimation}
				whileTap={clickAnimation}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				cursor={onClick || isCursorPointer ? "pointer" : "default"}
				style={inLineStyles}
			>
				<A.CenterAlignedColumnContainer
					// @ts-ignore
					id={`icon-container-${iconName}`}
					width={getIconSize(size) || defaultIconProps.size}
				>
					<IconCmpnt />
				</A.CenterAlignedColumnContainer>
				<AnimatePresence>
					{isHovered && tooltip?.label && (
						<Tooltip
							id={`icon-tooltip-${iconName}`}
							position={
								tooltip?.position ? tooltip.position : ["bottom", "1rem"]
							}
							{...tooltip}
							label={_tooltipLabel}
						/>
					)}
				</AnimatePresence>
			</IconParentContainer>
		);
	});
	return Icon;
}

Icon.Author = React.memo(createIconComponent("AuthorsIcon"));
Icon.Cancel = React.memo(createIconComponent("CancelIcon"));
Icon.Checkbox = React.memo(createIconComponent("CheckboxIcon"));
Icon.Chevron = React.memo(createIconComponent("ChevronIcon"));
Icon.Close = React.memo(createIconComponent("CloseIcon"));
Icon.Hey = React.memo(createIconComponent("HeyIcon"));
Icon.Home = React.memo(createIconComponent("HomeIcon"));
Icon.Logo = React.memo(createIconComponent("LogoIcon"));
Icon.Menu = React.memo(createIconComponent("MenuIcon"));
Icon.Quotes = React.memo(createIconComponent("QuotesIcon"));
Icon.Search = React.memo(createIconComponent("SearchIcon"));
Icon.Tags = React.memo(createIconComponent("TagsIcon"));
Icon.Theme = React.memo(createIconComponent("ThemeIcon"));
Icon.ColorSplash = React.memo(createIconComponent("ColorSplashIcon"));
Icon.Share = React.memo(createIconComponent("ShareIcon"));
Icon.Copy = React.memo(createIconComponent("CopyIcon"));

const IconParentContainer = styled(
	A.CenterAlignedColumnContainer
)<IconCoreProps>`
	padding: ${({ padding }) => padding};
	aspect-ratio: 1;
	position: relative;
	max-width: 128px;
	box-shadow: ${({ boxShadow }) => boxShadow || defaultIconProps.boxShadow};
	background-color: ${({ backgroundColor }) =>
		backgroundColor || defaultIconProps.backgroundColor};
	background: ${({ background }) => background || defaultIconProps.background};
	}
`;
