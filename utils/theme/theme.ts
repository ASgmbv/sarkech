import { extendTheme } from "@chakra-ui/react";
import { tabsTheme } from "./tabs";
import { tooltipTheme } from "./tooltip";

export const theme = extendTheme({
	components: {
		Tooltip: tooltipTheme,
		Tabs: tabsTheme,
	},
});
