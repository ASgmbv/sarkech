import { ITemplate } from "types";

export const templates: ITemplate[] = [
	{
		name: "Hero 1",
		id: "Section-UdyQp",
		components: {
			"Section-UdyQp": {
				id: "Section-UdyQp",
				type: "Section",
				parentId: "root",
				childrenIds: ["H1-wBF9Y", "Paragraph-v86Rm", "Box-OSD7Z"],
				props: {
					className: "py-10 px-0 bg-gray-50 flex flex-col items-center",
				},
			},
			"H1-wBF9Y": {
				id: "H1-wBF9Y",
				type: "H1",
				parentId: "Section-UdyQp",
				childrenIds: [],
				props: {
					className:
						"mt-0 text-center py-1 tracking-wide mb-4 text-2xl sm:text-3xl md:text-4xl max-w-xs sm:max-w-sm",
					children: "Talk to your customer, directly on your site",
				},
			},
			"Paragraph-v86Rm": {
				id: "Paragraph-v86Rm",
				type: "Paragraph",
				parentId: "Section-UdyQp",
				childrenIds: [],
				props: {
					children:
						"Engage visitors with instant live video calls. No meeting links or downloads required.",
					className:
						"text-center max-w-xs text-slate-500 mb-4 text-sm sm:text-base",
				},
			},
			"Button-0uPmu": {
				id: "Button-0uPmu",
				type: "Button",
				parentId: "Box-OSD7Z",
				childrenIds: [],
				props: {
					children: "Book demo",
					className: "font-bold py-2 px-4 text-sm text-emerald-700",
				},
			},
			"Box-OSD7Z": {
				id: "Box-OSD7Z",
				type: "Box",
				parentId: "Section-UdyQp",
				childrenIds: ["Button-KKC7P", "Button-0uPmu"],
				props: {
					className: "p-2",
				},
			},
			"Button-KKC7P": {
				id: "Button-KKC7P",
				type: "Button",
				parentId: "Box-OSD7Z",
				childrenIds: [],
				props: {
					children: "Try here",
					className:
						"text-white py-2 px-4 rounded-sm bg-emerald-700 text-sm font-medium",
				},
			},
		},
	},
];
