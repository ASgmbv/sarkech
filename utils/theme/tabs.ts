import { tabsAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
	createMultiStyleConfigHelpers(tabsAnatomy.keys);

const sidebar = definePartsStyle((props) => {
	return {
		tab: {
			fontSize: "13px",
			fontWeight: "semibold",
			color: "gray.500",
			py: 4,
			px: 0,
			mr: 4,
			_selected: {
				color: "black",
			},
		},
		tablist: {
			borderBottom: "1px solid",
			borderColor: "gray.200",
		},
		tabpanel: {
			p: 0,
		},
	};
});

const variants = {
	sidebar,
};

export const tabsTheme = defineMultiStyleConfig({ variants });
