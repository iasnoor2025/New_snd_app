export const Log = {
    info: (message: string, data?: any) => {
        
    },
    warn: (message: string, data?: any) => {
        console.warn(`[WARN] ${message}`, data || '');
    },
    error: (message: string, data?: any) => {
        console.error(`[ERROR] ${message}`, data || '');
    },
    debug: (message: string, data?: any) => {
        if (process.env.NODE_ENV === 'development') {
            console.debug(`[DEBUG] ${message}`, data || '');
        }
    }
};
