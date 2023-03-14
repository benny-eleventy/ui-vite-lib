import Button from "./Button";
import { CoreProps, s } from "@bennyui/core";

import type {
	MotionProps,
	Variants,
	Variant,
	EasingDefinition,
} from "framer-motion";
import type { ComponentType, ReactNode } from "react";
import * as React from "react";
import { motion } from "framer-motion";
import { useMemo } from "react";

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
	disableHoverAnimation?: boolean;
}

type unionProps = CoreProps & MotionProps & AcustomInterface;

interface GcustomInterface {
	animationConfig: number[];
	animationDelay: number;
	animationDuration: number[];
	animationEasing: EasingDefinition;
	animationRepeat: number;
	animationRepeatType: "loop" | "reverse" | "none" | "mirror";
	animationType: "opacity" | "scale" | "rotate" | "x" | "y" | "none";
	clickAnimation: Variant;
	hoverAnimation: Variant;
	disableHoverAnimation: boolean;
}

const generateAnimationTypeVariants = ({
	animationConfig,
	animationDelay,
	animationDuration,
	animationEasing,
	animationRepeat,
	animationRepeatType,
	animationType,
	clickAnimation,
	hoverAnimation,
	disableHoverAnimation,
}: GcustomInterface): Variants => {
	const initialvalue = animationConfig[0];
	const animatevalue = animationConfig[1];
	const exitvalue = animationConfig[2];
	return {
		initial: {
			[animationType]: initialvalue,
		},
		animate: {
			[animationType]: animatevalue,
			transition: {
				//@ts-ignore
				duration: animationDuration[0],
				//@ts-ignore
				ease: animationEasing,
				delay: animationDelay,
				repeat: animationRepeat,
				//@ts-ignore
				repeatType: animationRepeatType,
			},
		},
		exit: {
			[animationType]: exitvalue,
			transition: {
				duration: animationDuration[1],
			},
		},
		hover: !disableHoverAnimation ? { ...hoverAnimation } : {},
		clicked: { ...clickAnimation },
	};
};

export const A = ({ children }: unionProps) => {
	return <>{children}</>;
};

function createAnimatedComponent(componentName: string) {
	return function AnimatedComponent({ children, ...rest }: unionProps) {
		const StyledComponent = (
			Component: string | ComponentType<{ children?: ReactNode }>
		) => {
			return motion(Component);
		};

		console.log("rest props", rest);

		const Component = useMemo(() => StyledComponent(componentName), []);

		const memoziedGenerateAnimationTypeVariants = useMemo(
			() =>
				generateAnimationTypeVariants({
					animationType: rest.animationType ? rest.animationType : "none",
					animationDuration: rest.animationDuration
						? rest.animationDuration
						: [0.5, 0.5],
					animationConfig: rest.animationConfig
						? rest.animationConfig
						: [1, 1, 1],
					animationEasing: rest.animationEasing
						? rest.animationEasing
						: "easeInOut",
					hoverAnimation: rest.hoverAnimation
						? rest.hoverAnimation
						: { scale: 1 },
					disableHoverAnimation: rest.disableHoverAnimation
						? rest.disableHoverAnimation
						: false,
					clickAnimation: rest.clickAnimation
						? rest.clickAnimation
						: { scale: 1 },
					animationDelay: rest.animationDelay ? rest.animationDelay : 0,
					animationRepeat: rest.animationRepeat ? rest.animationRepeat : 0,
					animationRepeatType: rest.animationRepeatType
						? rest.animationRepeatType
						: "none",
				}),
			// eslint-disable-next-line react-hooks/exhaustive-deps
			[
				rest.animationConfig,
				rest.animationDelay,
				rest.animationDuration,
				rest.animationEasing,
				rest.animationRepeat,
				rest.animationRepeatType,
				rest.animationType,
				rest.clickAnimation,
				rest.hoverAnimation,
				rest.disableHoverAnimation,
			]
		);

		const getAnimationVariants = () => {
			if (rest.animationType || rest.clickAnimation || rest.hoverAnimation) {
				return memoziedGenerateAnimationTypeVariants;
			} else {
				return rest.variants;
			}
		};

		//memoize the getAnimationVariants function

		const memoizedGetAnimationVariants = useMemo(
			() => getAnimationVariants(),
			// eslint-disable-next-line react-hooks/exhaustive-deps
			[
				rest.animationConfig,
				rest.animationDelay,
				rest.animationDuration,
				rest.animationEasing,
				rest.animationRepeat,
				rest.animationRepeatType,
				rest.animationType,
				rest.clickAnimation,
				rest.hoverAnimation,
				rest.variants,
			]
		);

		console.log("New styles", rest.style);

		return (
			<Component
				initial="initial"
				animate="animate"
				exit="exit"
				whileHover="hover"
				whileTap="clicked"
				variants={memoizedGetAnimationVariants}
				{...rest}
				style={rest.style}
			>
				{children}
			</Component>
		);
	};
}

A.Button = createAnimatedComponent(s.Button);
