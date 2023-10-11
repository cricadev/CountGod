// vitest.config.ts
import { fileURLToPath } from "node:url";
import { defineVitestConfig } from "nuxt-vitest/config";

export default defineVitestConfig({
  test: {
    environment: "happy-dom",
  },
});
