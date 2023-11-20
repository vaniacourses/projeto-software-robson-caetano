import z from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.string().default("3000"),

  DATABASE_URL: z.string(),
});

function parseEnvironmentVariables(envVars: NodeJS.ProcessEnv) {
  try {
    const env = envSchema.parse(envVars);
    return env;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.issues
        .map((issue) => {
          switch (issue.code) {
            case "invalid_type":
              return `Expected ${issue.path[0]} to be of type ${issue.expected}, but received type ${issue.received}.`;
            case "invalid_union":
              return `Invalid value provided for ${issue.path[0]}.`;
            case "unrecognized_keys":
              return `${issue.path[0]} is not a recognized key.`;
            case "too_small":
              return `${issue.path[0]} must have length greater than or equal to ${issue.minimum}.`;
            default:
              return issue.message;
          }
        })
        .map((line) => `- ${line}`)
        .join("\n");

      throw new Error(
        `error parsing environment variables:\n${errorMessage}\n`,
      );
    }
    throw error;
  }
}

export const env = parseEnvironmentVariables(process.env);
