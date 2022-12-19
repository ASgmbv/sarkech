import { ITemplate } from "types";

export const templates: ITemplate[] = [
	{
		name: "Hero 1",
		id: "Section-zVjam",
		components: {
			"Section-zVjam": {
				id: "Section-zVjam",
				type: "Section",
				parentId: "root",
				childrenIds: ["Box-55d26"],
				props: {
					className: "px-0 bg-gray-50 py-10 sm:py-12 md:py-14",
				},
			},
			"H1-iRGni": {
				id: "H1-iRGni",
				type: "H1",
				parentId: "Box-55d26",
				childrenIds: [],
				props: {
					className:
						"mt-0 text-center py-1 tracking-wide mb-4 text-2xl sm:text-3xl md:text-4xl max-w-xs sm:max-w-sm",
					children: "Talk to your customer, directly on your site",
				},
			},
			"Paragraph-FzEfg": {
				id: "Paragraph-FzEfg",
				type: "Paragraph",
				parentId: "Box-55d26",
				childrenIds: [],
				props: {
					children:
						"Engage visitors with instant live video calls. No meeting links or downloads required.",
					className:
						"text-center text-slate-500 mb-4 text-sm sm:text-base max-w-sm",
				},
			},
			"Button-mtOtL": {
				id: "Button-mtOtL",
				type: "Button",
				parentId: "Box-Ss_Ey",
				childrenIds: [],
				props: {
					children: "Book demo",
					className: "font-bold py-2 px-4 text-sm text-emerald-700",
				},
			},
			"Box-Ss_Ey": {
				id: "Box-Ss_Ey",
				type: "Box",
				parentId: "Box-55d26",
				childrenIds: ["Button--TV4Q", "Button-mtOtL"],
				props: {
					className: "p-2 mb-1",
				},
			},
			"Button--TV4Q": {
				id: "Button--TV4Q",
				type: "Button",
				parentId: "Box-Ss_Ey",
				childrenIds: [],
				props: {
					children: "Try here",
					className:
						"text-white py-2 px-4 rounded-sm bg-emerald-700 text-sm font-medium",
				},
			},
			"Box-55d26": {
				id: "Box-55d26",
				type: "Box",
				parentId: "Section-zVjam",
				childrenIds: ["H1-iRGni", "Paragraph-FzEfg", "Box-Ss_Ey"],
				props: {
					className: "flex flex-col items-center max-w-5xl mx-auto px-4",
				},
			},
		},
	},
];
