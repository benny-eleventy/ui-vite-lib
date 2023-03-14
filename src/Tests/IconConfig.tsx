import {
	A,
	AnimatedContainerProps,
	CenterAlignedColumnContainer,
	fs_small,
	GridContainer,
	OverflowColumnContainer,
	s_small,
	Text,
	WrappedFlexStartRowContainer,
} from "@bennyui/core";
import React, { MouseEventHandler } from "react";
import { Icon } from "@bennyui/icons";

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

interface IconProps extends AnimatedContainerProps {
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

const IconHOC = ({
	Icon,
	iconsProps,
	variantName,
}: {
	Icon: React.ComponentType<IconProps>; // Ensure Icon is a valid React component
	iconsProps: IconProps;
	variantName?: string;
}) => {
	if (!Icon) {
		return null; // Return null if Icon is not valid
	}
	const TestIcon = Icon;
	return (
		<GridContainer
			width="12vw"
			height="auto"
			gridTemplateRows="96px 60px"
			alignItems="center"
			justifyContent="center"
			border="1px solid rgba(255,255,255,0.3)"
		>
			<CenterAlignedColumnContainer width="100%" height="100%">
				<TestIcon
					{...iconsProps}
					color={iconsProps.color ? iconsProps.color : "rgba(255,255,255,0.87)"}
				/>
			</CenterAlignedColumnContainer>
			<Text
				color="rgba(255,255,255,0.5)"
				fontSize={fs_small}
				textAlign="center"
			>
				{variantName || "Default"}
			</Text>
		</GridContainer>
	);
};
const IconConfig = () => {
	return (
		<OverflowColumnContainer paddingTop="10rem" width="100%">
			<WrappedFlexStartRowContainer width="90%" height="auto" padding={s_small}>
				{IconTestConfig.map((icon, index) => (
					<IconHOC
						key={index}
						Icon={icon.Icon}
						// @ts-ignore
						iconsProps={icon.iconsProps}
						variantName={icon.variantName}
					/>
				))}
			</WrappedFlexStartRowContainer>
		</OverflowColumnContainer>
	);
};

export default IconConfig;

const IconParentContainerTestId = (iconName: string) =>
	`div[data-testid=icon-parent-container-${iconName}]`;
const IconContainerTestId = (iconName: string) =>
	`div[data-testid=icon-container-${iconName}]`;
const tooltipTestId = (iconName?: string) => `div[id=icon-tooltip-${iconName}]`;

export const IconTestConfig = [
	{
		Icon: Icon.Author,
		iconsProps: {
			size: "small",
			tooltip: {
				label: "Tags tooltip at bottom",
				position: ["bottom", "1rem"],
				styles: {
					backgroundColor: "#b558ad",
					color: "white",
				},
			},
		},
		variantName: "Small size",
		test: () => {
			// test code
			cy.get(IconContainerTestId("AuthorsIcon")).should(
				"have.css",
				"width",
				"32px"
			);

			cy.get(IconContainerTestId("AuthorsIcon")).trigger("mouseover");
			cy.get(tooltipTestId("AuthorsIcon"))
				.should("be.visible")
				.and("have.css", "background-color", "rgb(181, 88, 173)")
				.and("have.css", "color", "rgb(255, 255, 255)");
		},
	},
	{
		Icon: Icon.Author,
		iconsProps: {
			size: "regular",
			color: "#21a7d3",
			tooltip: {
				label: "Tags tooltip at left",
				position: ["left", "1rem"],
				styles: {
					backgroundColor: "#b558ad",
					color: "white",
				},
			},
		},
		variantName: "Regular size",
		test: () => {
			// test code
			cy.get(IconContainerTestId("AuthorsIcon")).should(
				"have.css",
				"width",
				"48px"
			);
		},
	},
	{
		Icon: Icon.Author,
		iconsProps: {
			size: "large",
			color: "#31baa3",
			tooltip: {
				label: "Tags tooltip at right",
				position: ["right", "1rem"],
				styles: {
					backgroundColor: "#b558ad",
					color: "white",
				},
			},
		},
		variantName: "Large size",
		test: () => {
			// test code
			cy.get(IconContainerTestId("AuthorsIcon")).should(
				"have.css",
				"width",
				"64px"
			);
		},
	},
	{
		Icon: Icon.Author,
		iconsProps: {
			color: "#31baa3",
			hoverAnimation: {
				scale: 1.2,
				color: "red",
			},
		},
		variantName: "Hover Animation",
		test: () => {
			// test code
			cy.get(IconParentContainerTestId("AuthorsIcon")).trigger("mouseover");
		},
	},
	{
		Icon: Icon.Search,
		iconsProps: {
			isActive: true,
			activeIndicator: {
				styles: {
					backgroundColor: "rgb(211, 211, 211)",
					color: "rgb(0, 128, 0)",
				},
			},
		},
		variantName: "Active Indicator",
		test: () => {
			cy.get(IconParentContainerTestId("SearchIcon"))
				.should("have.css", "background-color", "rgb(211, 211, 211)")
				.and("have.css", "color", "rgb(0, 128, 0)");
		},
	},
	{
		variantName: "Tooltip",
		Icon: Icon.Tags,
		iconsProps: {
			tooltip: {
				label: "Tags tooltip on top",
				position: ["top", "1rem"],
				styles: {
					backgroundColor: "#b558ad",
					color: "white",
				},
			},
		},
		test: () => {
			cy.get(IconParentContainerTestId("TagsIcon")).trigger("mouseover");
			cy.get(tooltipTestId("TagsIcon"))
				.should("be.visible")
				.and("have.css", "background-color", "rgb(181, 88, 173)")
				.and("have.css", "color", "rgb(255, 255, 255)")
				.and("have.css", "top", "-55.4px");
		},
	},
	{
		variantName: "Hover disabled",
		Icon: Icon.ColorSplash,
		iconsProps: {
			disableHoverAnimation: true,
			hoverAnimation: {
				scale: 1.2,
			},
			tooltip: {
				label: "Hover Animation disabled",
				position: ["top", "1rem"],
				styles: {
					backgroundColor: "#b558ad",
					color: "white",
				},
			},
		},
	},
	{
		variantName: "Hover disabled when active",
		Icon: Icon.Home,
		iconsProps: {
			disableHoverAnimationWhenActive: true,
			hoverAnimation: {
				scale: 1.2,
			},
			isActive: true,
			activeIndicator: {
				styles: {
					backgroundColor: "#744570",
				},
				tooltipLabel: "Hover Animation disabled when active",
			},
			tooltip: {
				label: "Hover Animation disabled when active",
				position: ["top", "1rem"],
				styles: {
					backgroundColor: "#b558ad",
					color: "white",
				},
			},
		},
	},
];
