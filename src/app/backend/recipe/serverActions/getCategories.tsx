'use server'
//@ts-ignore
import prisma from '/prisma/index.js'

export async function getCategories(){
    return await prisma.category.findMany()
}
