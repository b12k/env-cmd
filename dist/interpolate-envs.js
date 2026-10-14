/**
 * interpolateEnvs Replaces {{var}} and {{var:-default}} in args and command with environment variables
 * if the environment variable doesn't exist, it leaves it as is unless a default value is provided.
*/
export function interpolateEnvs(str, envs) {
    return str.replace(/(?<!\\){{([a-zA-Z0-9_]+)(?::-([^}]*))?}}/g, (varName, name, defaultValue) => {
        const varValue = envs[name];
        if (defaultValue === undefined) {
            return varValue ?? varName;
        }
        if (varValue !== undefined && varValue !== '') {
            return varValue;
        }
        return defaultValue;
    });
}
