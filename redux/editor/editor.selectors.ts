import { RootState } from "redux/hooks";

export const selectTemplatesModal = (state: RootState) => {
	return state.editor.isTemplatesModalOpen;
};
