import { workspace } from "vscode";

export default class ConfigurationHelper {

    constructor() {
    }

    loadType(): string {
        const configuration = workspace.getConfiguration("wordcounter");
        return configuration.get("type") as string;
    }

};
