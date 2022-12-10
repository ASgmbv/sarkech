import { RootState } from "redux/hooks";

export const selectTemplatesModal = (state: RootState) => {
	return state.editor.isTemplatesModalOpen;
};

export const selectEditorSize = (state: RootState) => {
	return state.editor.editorSize;
};

export const selectEditorResizing = (state: RootState) => {
	return state.editor.resizing;
};

export const selectVariant = (state: RootState) => {
	return state.editor.variant;
};

export const selectScreen = (state: RootState) => {
	return state.editor.screen;
};
