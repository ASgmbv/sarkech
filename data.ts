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
	{
		name: "Hero 2",
		id: "Section-tsEDu",
		components: {
			"Section-tsEDu": {
				id: "Section-tsEDu",
				type: "Section",
				parentId: "root",
				childrenIds: ["Box-UnFvl"],
				props: {
					className: "text-center py-14 bg-slate-700",
				},
			},
			"H2-QTMi-": {
				id: "H2-QTMi-",
				type: "H2",
				parentId: "Box-UnFvl",
				childrenIds: [],
				props: {
					className: "mt-0 font-bold mb-3 text-white text-2xl sm:text-4xl",
					children: "Ready to get started?",
				},
			},
			"Paragraph-fgqYE": {
				id: "Paragraph-fgqYE",
				type: "Paragraph",
				parentId: "Box-UnFvl",
				childrenIds: [],
				props: {
					children:
						"Get in touch with us and let our staff guide you on your journey today!",
					className: "mx-auto max-w-sm mb-6 text-white",
				},
			},
			"Button-xTVhb": {
				id: "Button-xTVhb",
				type: "Button",
				parentId: "Box-UnFvl",
				childrenIds: [],
				props: {
					children: "Schedule a demo",
					className:
						"text-white py-2 px-4 rounded bg-blue-400 font-medium",
				},
			},
			"Box-UnFvl": {
				id: "Box-UnFvl",
				type: "Box",
				parentId: "Section-tsEDu",
				childrenIds: ["H2-QTMi-", "Paragraph-fgqYE", "Button-xTVhb"],
				props: {
					className: "p-2 max-w-5xl px-4 mx-auto text-center",
				},
			},
		},
	},
];
