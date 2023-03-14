import { Icon } from "@bennyui/icons";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
const CodeSnippet = () => {
	const code = `<Icon.ColorSplash\n  hoverAnimation={{backgroundColor: 'rgba(255,255,255,0.3)'}}\n  padding="0"\n  size="large"\n  tooltipText="Color Splash Button"\n/>`;

	return (
		<SyntaxHighlighter
			language="javascript"
			style={{
				...dracula,
			}}
			customStyle={{
				fontSize: "1.2rem",
				width: "800px",
				height: "auto",
				whiteSpace: "pre-wrap",
				borderRadius: "16px",
			}}
			showLineNumbers={true}
			wrapLines={true}
		>
			{code}
		</SyntaxHighlighter>
	);
};

export default CodeSnippet;
