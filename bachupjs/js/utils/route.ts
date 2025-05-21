import { route as ziggyRoute } from 'ziggy-js';

/**
 * Type-safe wrapper around Ziggy's route function
 * @param name The route name
 * @param params The route parameters
 * @returns The generated URL
 */
export function route(name: string, params?: Record<string, any>): string {
    return ziggyRoute(name, params);
}



