import { IComponent } from "types";
import { mapComponentToHTMLElement } from "~components/interfaces/studio/editor/components/component";
import {} from "prettier/";

export const formatCode = async (code: string) => {
	let formattedCode = `// invalid code`;

	const prettier = await import("prettier/standalone");
	const parser = await import("prettier/parser-html");

	try {
		formattedCode = prettier.format(code, {
			parser: "html",
			plugins: [parser],
		});
	} catch (e) {
		//
	}

	return formattedCode;
};

export const generateCode = async (components: {
	[key: string]: IComponent;
}) => {
	const buildElement = (component: IComponent) => {
		let code = "";
		let childrenCode = "";

		component.childrenIds.forEach((childId) => {
			const child = components[childId];

			if (child.type !== "AddComponent") {
				childrenCode += buildElement(child);
			}
		});

		/**
		 * children: text for text elements
		 */

		const tag = mapComponentToHTMLElement[component.type];
		const { className, children } = component.props;

		code += `<${tag}${className ? ' class="' + className + '"' : ""}>
      ${childrenCode}${children || ""}
    </${tag}>`;

		return code;
	};

	const code = buildElement(components["root"]);

	return await formatCode(code);
};
