import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Screen } from "types";

type EditorInitialState = {
	isTemplatesModalOpen: boolean;
	editorSize: {
		width: number;
		height: number;
	};
	resizing: {
		side: "left" | "right";
		startX: number;
		startWidth: number;
	} | null;
	variant: string | null;
	screen: Screen;
};

const initialState: EditorInitialState = {
	isTemplatesModalOpen: false,
	editorSize: {
		width: 0,
		height: 0,
	},
	resizing: null,
	variant: null,
	screen: "base",
};

export const editorSlice = createSlice({
	name: "editor",
	initialState,
	reducers: {
		openTemplatesModal: (state) => {
			state.isTemplatesModalOpen = true;
		},
		closeTemplatesModal: (state) => {
			state.isTemplatesModalOpen = false;
		},
		setEditorResizing: (
			state,
			action: PayloadAction<{
				side: "left" | "right";
				startX: number;
				startWidth: number;
			} | null>
		) => {
			state.resizing = action.payload;
		},
		setEditorSize: (
			state,
			action: PayloadAction<{
				width?: number;
				height?: number;
			}>
		) => {
			const { height, width } = action.payload;

			if (height) state.editorSize.height = height;
			if (width) state.editorSize.width = width;
		},
		setVariant: (state, action: PayloadAction<string | null>) => {
			state.variant = action.payload;
		},
		changeScreen: (state, action: PayloadAction<Screen>) => {
			state.screen = action.payload;
		},
	},
});

export const editorSliceActions = editorSlice.actions;
