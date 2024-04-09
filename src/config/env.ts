import { EnvConfig } from "../types/env";

const env: EnvConfig = {
    PORT: parseInt(process.env.PORT || "8080"),
    NODE_ENV: process.env.NODE_ENV as 'development' | 'production'
};

export default env;