import { exit } from "process";

export abstract class ErrorHelper {
    public static handleException(error: unknown, stopProcess: boolean = true) {
        console.error((error as Error).message);
        if (stopProcess) {
            exit();
        }
    }
}