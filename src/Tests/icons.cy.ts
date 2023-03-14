import { IconTestConfig } from "./IconConfig";
import { mount } from "cypress/react18";
import React from "react";

describe("Icons", () => {
	IconTestConfig.forEach((iconTestConfig) => {
		it(iconTestConfig.variantName, () => {
			mount(
				React.createElement(iconTestConfig.Icon, {
					color: iconTestConfig.iconsProps.color || "white",
					...iconTestConfig.iconsProps,
				})
			);

			if (iconTestConfig?.test) {
				iconTestConfig?.test();
			}
		});
	});
});

export {};
