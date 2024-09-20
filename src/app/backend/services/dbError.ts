const caseError = (errorException:any) => {
   console.error('DB Error', errorException);
    throw new Error('DB Error');
}

export const tryCatchDbError = (fn:any) => {
    return async (...args: any) => {
        try {
            return await fn(...args);
        } catch (error) {
            caseError(error);
        }
    }
}
