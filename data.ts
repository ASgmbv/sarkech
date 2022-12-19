import { ITemplate } from "types";

export const templates: ITemplate[] = [
	{
		name: "Hero 1",
		id: "Section-lQIz4B7iGygwsm5gqZKeB",
		components: {
			"Section-lQIz4B7iGygwsm5gqZKeB": {
				id: "Section-lQIz4B7iGygwsm5gqZKeB",
				type: "Section",
				parentId: "root",
				childrenIds: [
					"H1-d2lQZf9McOlaVGd7nBdG_",
					"Paragraph-tEYkG9dfRFr5yk1fAZMZv",
					"Box-HZ07e",
				],
				props: {
					className: "py-10 px-0 bg-gray-50 flex flex-col items-center",
				},
			},
			"H1-d2lQZf9McOlaVGd7nBdG_": {
				id: "H1-d2lQZf9McOlaVGd7nBdG_",
				type: "H1",
				parentId: "Section-lQIz4B7iGygwsm5gqZKeB",
				childrenIds: [],
				props: {
					className:
						"mt-0 text-center max-w-sm text-4xl py-1 tracking-wide mb-4 leading-snug",
					children: "Talk to your customer, directly on your site",
				},
			},
			"Paragraph-tEYkG9dfRFr5yk1fAZMZv": {
				id: "Paragraph-tEYkG9dfRFr5yk1fAZMZv",
				type: "Paragraph",
				parentId: "Section-lQIz4B7iGygwsm5gqZKeB",
				childrenIds: [],
				props: {
					children:
						"Engage visitors with instant live video calls. No meeting links or downloads required.",
					className:
						"text-center max-w-xs text-slate-500 leading-relaxed mb-4",
				},
			},
			"Button-HDmp-": {
				id: "Button-HDmp-",
				type: "Button",
				parentId: "Box-HZ07e",
				childrenIds: [],
				props: {
					children: "Book demo",
					className: "font-bold py-2 px-4 text-sm text-emerald-700",
				},
			},
			"Box-HZ07e": {
				id: "Box-HZ07e",
				type: "Box",
				parentId: "Section-lQIz4B7iGygwsm5gqZKeB",
				childrenIds: ["Button-TEPK2uxOGq2QGAE0Mh068", "Button-HDmp-"],
				props: {
					className: "p-2",
				},
			},
			"Button-TEPK2uxOGq2QGAE0Mh068": {
				id: "Button-TEPK2uxOGq2QGAE0Mh068",
				type: "Button",
				parentId: "Box-HZ07e",
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
