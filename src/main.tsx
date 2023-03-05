import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DraftComponent from "./draft-components/DraftComponent";
import { GlobalStyles } from "./styles/GlobalStyles";
import Index from "./routes";
import Components from "./routes/Components/Components";

const BrowserRouter = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				index: true,
				element: <Index />,
			},
			{
				path: "/draft-components",
				element: <DraftComponent />,
			},
			{
				path: "/components",
				element: <Components />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<GlobalStyles />
		<RouterProvider router={BrowserRouter} />
	</React.StrictMode>
);
