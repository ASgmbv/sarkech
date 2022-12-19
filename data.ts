import { ITemplate } from "types";

export const templates: ITemplate[] = [
	{
		name: "Hero 1",
		id: "Section-Yox9y",
		components: {
			"Section-Yox9y": {
				id: "Section-Yox9y",
				type: "Section",
				parentId: "root",
				childrenIds: ["Box-AbwGD"],
				props: {
					className: "py-10 px-0 bg-gray-50",
				},
			},
			"H1-l2q36": {
				id: "H1-l2q36",
				type: "H1",
				parentId: "Box-AbwGD",
				childrenIds: [],
				props: {
					className:
						"mt-0 text-center py-1 tracking-wide mb-4 text-2xl sm:text-3xl md:text-4xl max-w-xs sm:max-w-sm",
					children: "Talk to your customer, directly on your site",
				},
			},
			"Paragraph-DaARK": {
				id: "Paragraph-DaARK",
				type: "Paragraph",
				parentId: "Box-AbwGD",
				childrenIds: [],
				props: {
					children:
						"Engage visitors with instant live video calls. No meeting links or downloads required.",
					className:
						"text-center max-w-xs text-slate-500 mb-4 text-sm sm:text-base",
				},
			},
			"Button-oWBqk": {
				id: "Button-oWBqk",
				type: "Button",
				parentId: "Box-ZuVLn",
				childrenIds: [],
				props: {
					children: "Book demo",
					className: "font-bold py-2 px-4 text-sm text-emerald-700",
				},
			},
			"Box-ZuVLn": {
				id: "Box-ZuVLn",
				type: "Box",
				parentId: "Box-AbwGD",
				childrenIds: ["Button-BBnuX", "Button-oWBqk"],
				props: {
					className: "p-2 mb-1",
				},
			},
			"Button-BBnuX": {
				id: "Button-BBnuX",
				type: "Button",
				parentId: "Box-ZuVLn",
				childrenIds: [],
				props: {
					children: "Try here",
					className:
						"text-white py-2 px-4 rounded-sm bg-emerald-700 text-sm font-medium",
				},
			},
			"Paragraph-IYBj1": {
				id: "Paragraph-IYBj1",
				type: "Paragraph",
				parentId: "Box-AbwGD",
				childrenIds: [],
				props: {
					children: "Cancel any time within first week",
					className: "text-xs text-slate-400",
				},
			},
			"Box-AbwGD": {
				id: "Box-AbwGD",
				type: "Box",
				parentId: "Section-Yox9y",
				childrenIds: [
					"H1-l2q36",
					"Paragraph-DaARK",
					"Box-ZuVLn",
					"Paragraph-IYBj1",
				],
				props: {
					className: "flex flex-col items-center max-w-5xl mx-auto px-4",
				},
			},
		},
	},
];
