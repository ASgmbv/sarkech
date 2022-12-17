import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
	newSectionPositions: string[];
};

const initialState: EditorInitialState = {
	isTemplatesModalOpen: false,
	editorSize: {
		width: 0,
		height: 0,
	},
	resizing: null,
	variant: null,
	newSectionPositions: [],
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
		addNewSectionPosition: (state, action: PayloadAction<string>) => {
			state.newSectionPositions.push(action.payload);
		},
		removeNewSectionPosition: (state, action: PayloadAction<string>) => {
			state.newSectionPositions = state.newSectionPositions.filter(
				(id) => id !== action.payload
			);
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
	},
});

export const editorSliceActions = editorSlice.actions;
