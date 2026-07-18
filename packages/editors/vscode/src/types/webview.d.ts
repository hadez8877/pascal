/**
 * The options for a webview controller
 */
export type WebviewControllerOptions = {
	id: string;
	displayName: string;
	run(): Promise<void | string>;
};
export interface WebviewControllerInfo extends WebviewControllerOptions {
	dispose(): void;
}
