declare function log(...message: any[]): void;
declare function logErr(...message: any[]): void;

type Globals = {
    log: typeof log;
    logErr: typeof logErr;
}