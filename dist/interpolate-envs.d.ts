import type { Environment } from './types.ts';
/**
 * interpolateEnvs Replaces {{var}} and {{var:-default}} in args and command with environment variables
 * if the environment variable doesn't exist, it leaves it as is unless a default value is provided.
*/
export declare function interpolateEnvs(str: string, envs: Environment): string;
