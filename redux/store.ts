import { configureStore } from "@reduxjs/toolkit";
import { componentsSlice } from "./components/components.slice";
import undoable from "redux-undo";
import { editorSlice } from "./editor/editor.slice";

export const store = configureStore({
	reducer: {
		components: undoable(componentsSlice.reducer),
		editor: editorSlice.reducer,
	},
});
