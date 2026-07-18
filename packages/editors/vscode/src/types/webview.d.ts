
/**
 * The options for a webview controller
 */
export type WebviewControllerOptions = {
	id: string;
	displayName: string;
	run(): Promise<string>;
};

export interface WebviewControllerInfo extends WebviewControllerOptions {
	id: string
	displayName: string
	dispose(): void
	run(): Promise<void>
}

