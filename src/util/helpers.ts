/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
export function isNullOrEmpty(value: string | null | undefined): boolean {
    return !value || value.trim().length === 0;
}
const sleep = (ms:number) => new Promise (r => setTimeout(r, ms));

export function errorhelper(error: any) {
    const errorlist: { key: string; message: string }[] = [];

    console.log(error, "error");

    let errorObject;

    // Verifica si error es una cadena JSON antes de hacer JSON.parse
    if (typeof error === "string") {
        try {
            errorObject = JSON.parse(error);
        } catch (e) {
            console.error("Error al parsear JSON:", e);
            return [{ key: "ex", message: "Error desconocido" }];
        }
    } else if (typeof error === "object" && error !== null) {
        errorObject = error;
    } else {
        return [{ key: "ex", message: "Error desconocido" }];
    }

    if (errorObject.data?.Message) {
        errorlist.push({ key: "ex", message: errorObject.data.Message });
    }

    if (errorObject.data?.message) {
        errorlist.push({ key: "ex", message: errorObject.data.message });
    }

    if (errorObject.Message) {
        errorlist.push({ key: "ex", message: errorObject.Message });
    }

    if (errorObject.message) {
        errorlist.push({ key: "ex", message: errorObject.message });
    }

    if (errorObject.data) {
        if(typeof errorObject.data === "string"){
        errorlist.push({ key: "ex", message:errorObject.data });}

        for (const errorKey in errorObject.data?.errors) {
            for (const message of errorObject.data?.errors[errorKey]) {
                const exists = errorlist.some(item => item.key === errorKey);
                if (!exists) {
                    errorlist.push({ key: errorKey, message: message });
                }
            }
        }
    }

    return errorlist;
}

