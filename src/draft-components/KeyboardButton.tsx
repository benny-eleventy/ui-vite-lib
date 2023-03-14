import { CenterAlignedColumnContainer } from "@bennyui/core";
import React from "react";
import styled from "styled-components";

type KeyboardButtonProps = {
	label: string;
	width: string;
};

const KeyboardButton = ({ label, width }: KeyboardButtonProps) => {
	const getSymbol = () => {
		const letterRegex = /^[A-Z]$/; // Matches a single uppercase letter
		if (letterRegex.test(label)) {
			return label;
		}
		switch (label) {
			case "Shift":
				return String.fromCharCode(0x21e7); // Upward white arrow
			case "Command":
				return String.fromCharCode(0x2318); // Place of interest sign
			case "Option":
				return String.fromCharCode(0x2325); // Option key symbol
			case "Control":
				return "Ctrl";
			case "Enter":
				return String.fromCharCode(0x23ce); // Return symbol
			case "+":
				return "+";
			case "-":
				return "-";
			case "[":
				return "[";
			case "]":
				return "]";
			case "/":
				return "/";
			default:
				return label;
		}
	};

	return (
		<KeyboardButtonContainer width={width}>
			{getSymbol()}
		</KeyboardButtonContainer>
	);
};

export default KeyboardButton;

const KeyboardButtonContainer = styled(CenterAlignedColumnContainer)`
	width: ${(props) => props.width};
	height: ${(props) => props.width};
	background-color: #1e1e1e;
	color: white;
	font-size: 16px;
	border: 1px solid #777;
	border-radius: 4px;
`;
