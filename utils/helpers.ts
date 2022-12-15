/**
 * taken from tailwind codebase
 */

import { getClassGroupId } from "tailwind-merge";

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
/**
 * taken from tailwind codebase
 */

export function negateValue(value: string) {
	value = `${value}`;

	if (value === "0") {
		return "0";
	}

	// Flip sign of numbers
	if (/^[+-]?(\d+|\d*\.\d+)(e[+-]?\d+)?(%|\w+)?$/.test(value)) {
		return value.replace(/^[+-]?/, (sign) => (sign === "-" ? "" : "-"));
	}

	if (value.includes("var(") || value.includes("calc(")) {
		return `calc(${value} * -1)`;
	}
}

export function getClassValue({
	baseClassName,
	prefix,
}: {
	baseClassName: string;
	prefix?: string;
}) {
	if (prefix) {
		const isNegative = baseClassName.startsWith("-");

		let value: string | undefined = baseClassName.slice(
			prefix.length + (isNegative ? 2 : 1)
		);

		if (value.startsWith("[")) {
			value = value.substring(1, value.length - 1);
		}

		if (isNegative) {
			value = negateValue(value);
		}

		return value === "" ? "default" : value;
	}

	return baseClassName;
}

export function getResponsiveClassValue({
	className,
	classGroupId,
	prefix,
}: {
	classGroupId: string;
	className?: string;
	prefix?: string;
}) {
	let base: string | undefined;
	let sm: string | undefined;
	let md: string | undefined;
	let lg: string | undefined;

	className?.split(" ").forEach((c) => {
		const { baseClassName, modifiers } = splitModifiers(c);

		if (
			getClassGroupId(baseClassName) === classGroupId &&
			(modifiers.length === 0 ||
				(modifiers.length === 1 &&
					(modifiers[0] === "sm:" ||
						modifiers[0] === "md:" ||
						modifiers[0] === "lg:")))
		) {
			const classValue = getClassValue({
				baseClassName,
				prefix,
			});

			if (modifiers.length === 0) {
				base = classValue;
			} else if (modifiers[0] === "sm:") {
				sm = classValue;
			} else if (modifiers[0] === "md:") {
				md = classValue;
			} else if (modifiers[0] === "lg:") {
				lg = classValue;
			}
		}
	});

	return {
		base,
		sm,
		md,
		lg,
	};
}
