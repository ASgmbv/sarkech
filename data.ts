import { ITemplate } from "types";

export const templates: ITemplate[] = [
	{
		name: "Hero 1",
		id: "Section-kuibg",
		components: {
			"Section-kuibg": {
				id: "Section-kuibg",
				type: "Section",
				parentId: "root",
				childrenIds: ["Box-b6uxK"],
				props: {
					className: "px-0 bg-gray-50 py-10 sm:py-12 md:py-14",
				},
			},
			"H1-Pe2SQ": {
				id: "H1-Pe2SQ",
				type: "H1",
				parentId: "Box-b6uxK",
				childrenIds: [],
				props: {
					className:
						"mt-0 text-center py-1 tracking-wide mb-4 sm:text-3xl max-w-xs sm:max-w-sm text-2xl",
					children: "Talk to your customer, directly on your site",
				},
			},
			"Paragraph-Ixp3t": {
				id: "Paragraph-Ixp3t",
				type: "Paragraph",
				parentId: "Box-b6uxK",
				childrenIds: [],
				props: {
					children:
						"Engage visitors with instant live video calls. No meeting links or downloads required.",
					className:
						"text-center text-slate-500 mb-4 max-w-sm text-sm sm:text-base sm:mb-6",
				},
			},
			"Box-b6uxK": {
				id: "Box-b6uxK",
				type: "Box",
				parentId: "Section-kuibg",
				childrenIds: [
					"H1-Pe2SQ",
					"Paragraph-Ixp3t",
					"Box-AR32b7B4SglSRtaTW_xQy",
				],
				props: {
					className: "flex flex-col items-center max-w-5xl mx-auto px-4",
				},
			},
			"Box-AR32b7B4SglSRtaTW_xQy": {
				id: "Box-AR32b7B4SglSRtaTW_xQy",
				type: "Box",
				parentId: "Box-b6uxK",
				childrenIds: [
					"Button-O-mO2vSjO64WC2m7BroLa",
					"Button-8e05UgAEbDjfcnwR1KXQc",
				],
				props: {
					className: "p-2 mb-1",
				},
			},
			"Button-O-mO2vSjO64WC2m7BroLa": {
				id: "Button-O-mO2vSjO64WC2m7BroLa",
				type: "Button",
				parentId: "Box-AR32b7B4SglSRtaTW_xQy",
				childrenIds: [],
				props: {
					children: "Try here",
					className:
						"text-white py-2 px-4 bg-emerald-700 font-medium text-sm sm:text-base",
				},
			},
			"Button-8e05UgAEbDjfcnwR1KXQc": {
				id: "Button-8e05UgAEbDjfcnwR1KXQc",
				type: "Button",
				parentId: "Box-AR32b7B4SglSRtaTW_xQy",
				childrenIds: [],
				props: {
					children: "Book demo",
					className:
						"font-bold py-2 px-4 text-emerald-700 text-sm sm:text-base",
				},
			},
		},
	},
];
