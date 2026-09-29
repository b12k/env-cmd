import type { Environment } from './types.ts'

/**
 * interpolateEnvs Replaces {{var}} in args and command with environment variables
 * if the environment variable doesn't exist, it leaves it as is.
*/
export function interpolateEnvs (str: string, envs: Environment): string {
  return str.replace(/(?<!\\){{[a-zA-Z0-9_]+}}/g, (varName) => {
    const varValue = envs[varName.replace(/{|}/g, '')]
    return varValue ?? varName
  })
}
