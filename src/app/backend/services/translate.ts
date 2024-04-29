// @ts-ignore
import translatte from "translatte";
// @ts-ignore
import he from 'he';

const fixText = (text: string) => {
    return he.decode(text.replace(/<[^>]*>?/gm, ''));
}

interface TranslateOptions { text: string, from?: string, to?: string }

export async function translate({text, from = 'en', to = 'es'}:TranslateOptions ) : Promise<string | any>{
    try {
        const translation = await translatte(fixText(text), {
            from,
            to,
        }).catch((err: any) => {
            console.error(err);
        });
        return translation.text?? text ;
    }catch (error) {
        throw error
    }
}



