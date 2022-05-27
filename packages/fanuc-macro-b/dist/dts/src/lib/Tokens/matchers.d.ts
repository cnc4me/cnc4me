interface RegExpExecArrayWithPayload extends RegExpExecArray {
    payload?: unknown;
}
export declare function matchProgramNumber(text: string, startOffset: number): RegExpExecArrayWithPayload | null;
export {};
