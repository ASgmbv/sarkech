import { configureStore } from "@reduxjs/toolkit";
import { componentsSlice } from "./components/components.slice";
import undoable, { includeAction } from "redux-undo";
import { editorSlice } from "./editor/editor.slice";

export const store = configureStore({
	reducer: {
		components: undoable(componentsSlice.reducer, {
			limit: 10,
			filter: includeAction([
				"components/addComponent",
				"components/removeComponent",
				"components/moveComponent",
				"components/addTemplate",
				"components/duplicateComponent",
				"components/addClasses",
				"components/keepCurrentClassName",
			]),
		}),
		editor: editorSlice.reducer,
	},
});
