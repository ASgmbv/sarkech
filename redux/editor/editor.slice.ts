import { createSlice } from "@reduxjs/toolkit";

export const editorSlice = createSlice({
	name: "editor",
	initialState: {
		isTemplatesModalOpen: false,
	},
	reducers: {
		openTemplatesModal: (state) => {
			state.isTemplatesModalOpen = true;
		},
		closeTemplatesModal: (state) => {
			state.isTemplatesModalOpen = false;
		},
	},
});

export const editorSliceActions = editorSlice.actions;
