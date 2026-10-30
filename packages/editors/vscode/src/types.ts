import type * as vscode from 'vscode';

/** Based on https://github.com/microsoft/vscode/blob/47819e962a70c419248695fefbfcb31ad19b2c38/src/vs/workbench/services/themes/common/colorThemeSchema.ts#L14 */
export type TextMateScope =
	| 'comment'
	| 'comment.block'
	| 'comment.block.documentation'
	| 'comment.line'
	| 'constant'
	| 'constant.character'
	| 'constant.character.escape'
	| 'constant.numeric'
	| 'constant.numeric.integer'
	| 'constant.numeric.float'
	| 'constant.numeric.hex'
	| 'constant.numeric.octal'
	| 'constant.other'
	| 'constant.regexp'
	| 'constant.rgb-value'
	| 'emphasis'
	| 'entity'
	| 'entity.name'
	| 'entity.name.class'
	| 'entity.name.function'
	| 'entity.name.method'
	| 'entity.name.section'
	| 'entity.name.selector'
	| 'entity.name.tag'
	| 'entity.name.type'
	| 'entity.other'
	| 'entity.other.attribute-name'
	| 'entity.other.inherited-class'
	| 'invalid'
	| 'invalid.deprecated'
	| 'invalid.illegal'
	| 'keyword'
	| 'keyword.control'
	| 'keyword.operator'
	| 'keyword.operator.new'
	| 'keyword.operator.assignment'
	| 'keyword.operator.arithmetic'
	| 'keyword.operator.logical'
	| 'keyword.other'
	| 'markup'
	| 'markup.bold'
	| 'markup.changed'
	| 'markup.deleted'
	| 'markup.heading'
	| 'markup.inline.raw'
	| 'markup.inserted'
	| 'markup.italic'
	| 'markup.list'
	| 'markup.list.numbered'
	| 'markup.list.unnumbered'
	| 'markup.other'
	| 'markup.quote'
	| 'markup.raw'
	| 'markup.underline'
	| 'markup.underline.link'
	| 'meta'
	| 'meta.block'
	| 'meta.cast'
	| 'meta.class'
	| 'meta.function'
	| 'meta.function-call'
	| 'meta.preprocessor'
	| 'meta.return-type'
	| 'meta.selector'
	| 'meta.tag'
	| 'meta.type.annotation'
	| 'meta.type'
	| 'punctuation.definition.string.begin'
	| 'punctuation.definition.string.end'
	| 'punctuation.separator'
	| 'punctuation.separator.continuation'
	| 'punctuation.terminator'
	| 'storage'
	| 'storage.modifier'
	| 'storage.type'
	| 'string'
	| 'string.interpolated'
	| 'string.other'
	| 'string.quoted'
	| 'string.quoted.double'
	| 'string.quoted.other'
	| 'string.quoted.single'
	| 'string.quoted.triple'
	| 'string.regexp'
	| 'string.unquoted'
	| 'strong'
	| 'support'
	| 'support.class'
	| 'support.constant'
	| 'support.function'
	| 'support.other'
	| 'support.type'
	| 'support.type.property-name'
	| 'support.variable'
	| 'variable'
	| 'variable.language'
	| 'variable.name'
	| 'variable.other'
	| 'variable.other.readwrite'
	| 'variable.parameter'
	| (string & {});

export type FontStyle = 'bold' | 'italic' | 'underline' | 'strikethrough';

export interface Customizer {
	name: string;
	/**
	 * Applies this customizer to every theme by mutating `theme.content`. The `name` identifies
	 * this customizer in `theme.content`, as `customizer.<name>`.
	 */
	run(themes: ThemeData[], name: string): void;
}

/** Token rule in a VS Code color-theme JSON file. */
export interface TokenColorRule {
	name?: string;
	scope?: string | string[];
	settings: {
		fontStyle?: FontStyle;
		foreground?: string;
		background?: string;
		[key: string]: unknown;
	};
}

export interface ThemeDocument {
	tokenColors?: TokenColorRule[];
	[key: string]: unknown;
}

export interface ThemeData {
	content: ThemeDocument;
	uriPath: vscode.Uri;
}
