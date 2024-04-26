// @ts-ignore
import translatte from "translatte";

interface TranslateOptions { text: string, from?: string, to?: string }

export async function translate({text, from = 'en', to = 'es'}:TranslateOptions ) : Promise<string | any>{
    try {
        const translation = await translatte(text, {
            from,
            to,
        }).catch((err: any) => {
            console.error(err);
            throw new Error(err)
        });
        return translation.text?? text ;
    }catch (error) {
        throw error
    }
}



