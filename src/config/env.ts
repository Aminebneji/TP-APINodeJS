import { EnvConfig } from "../types/env";

const env: EnvConfig = {
    PORT: parseInt(process.env.PORT || "8080"),
    NODE_ENV: process.env.NODE_ENV as 'development' | 'production' | 'test' || 'development',
    REFRESH_SECRET: process.env.REFRESH_SECRET || "53cR3T§:!",
    JWT_SECRET: process.env.JWT_SECRET || "53cR3T!$:",
};

export default env;