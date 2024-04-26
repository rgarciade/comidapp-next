// @ts-ignore
import prisma from '/prisma/index.js'
import {ForkityKeys} from "@prisma/client";

export async function getAllKeysFromWords(phrase:string) {
    try {

        const words = phrase.split(' ').filter(word => word.length > 2);
        // @ts-ignore
        const wordsQueries = words.map(word => ({
            spanish_word: {
                contains: word,
                mode: 'insensitive'
            }
        }));
        const wordsQueriess = words.map(word => ({
            english_word: {
                contains: word,
                mode: 'insensitive'
            }
        }));

        const foundWords = await prisma.forkityKeys.findMany({
            where: {
                OR: [...wordsQueries,...wordsQueriess],
            },
        });

        return foundWords.reduce((acc:string[], item:ForkityKeys) => {
            if(!acc.includes(item.english_word)){
                acc.push(item.english_word)
            }
            return acc
        }, [] as string[])
    } catch (error) {
        return { error: 'Something went wrong' }
    }
}
