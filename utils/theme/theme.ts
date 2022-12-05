import { extendTheme } from "@chakra-ui/react";
import { tooltipTheme } from "./tooltip";

export const theme = extendTheme({
	components: {
		Tooltip: tooltipTheme,
	},
});
