/**
 * taken from tailwind codebase
 */

export function splitModifiers(className: string) {
	const modifiers = [];

	let bracketDepth = 0;
	let modifierStart = 0;

	for (const match of className.matchAll(/[:[\]]/g)) {
		if (match[0] === ":") {
			if (bracketDepth === 0) {
				const nextModifierStart = match.index! + 1;
				modifiers.push(
					className.substring(modifierStart, nextModifierStart)
				);
				modifierStart = nextModifierStart;
			}
		} else if (match[0] === "[") {
			bracketDepth++;
		} else if (match[0] === "]") {
			bracketDepth--;
		}
	}

	const baseClassNameWithImportantModifier =
		modifiers.length === 0 ? className : className.substring(modifierStart);
	const hasImportantModifier =
		baseClassNameWithImportantModifier.startsWith("!");
	const baseClassName = hasImportantModifier
		? baseClassNameWithImportantModifier.substring(1)
		: baseClassNameWithImportantModifier;

	return {
		modifiers,
		hasImportantModifier,
		baseClassName,
	};
}
