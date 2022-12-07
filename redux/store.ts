import { configureStore } from "@reduxjs/toolkit";
import { componentsSlice } from "./components/components.slice";
import undoable from "redux-undo";

export const store = configureStore({
	reducer: {
		components: undoable(componentsSlice.reducer),
	},
});
