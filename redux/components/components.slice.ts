import { createSlice } from "@reduxjs/toolkit";
import { IComponent } from "types";

const initialState: {
	selectedId: string | null;
	components: {
		[id: string]: IComponent;
	};
} = {
	selectedId: null,
	components: {
		root: {
			id: "root",
			parentId: "root",
			childrenIds: [],
			type: "root",
		},
	},
};

export const componentsSlice = createSlice({
	name: "components",
	initialState,
	reducers: {},
});
