import { createAuth } from "@Forma/auth";
import { createPrismaClient } from "@Forma/db";

import { ENV } from "./env.server";

export const db = createPrismaClient(ENV);
export const auth = createAuth(ENV, db);
