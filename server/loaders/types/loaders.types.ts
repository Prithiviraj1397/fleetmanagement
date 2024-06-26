const TYPES_LOADERS = {
    LOADERS         : Symbol.for("loadAllConnection"),
    SERVER_CONNECT  : Symbol.for("ServerConnection"),
    DATABASE_CONNECT: Symbol.for("databaseConnection")
};

export { TYPES_LOADERS };
