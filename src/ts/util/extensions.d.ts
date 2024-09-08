interface Array {
    sample(): any;
}

interface Env {
    agents: KVNamespace,
    wengines: KVNamespace,
    bangboos: KVNamespace,
    helpers: KVNamespace,
}