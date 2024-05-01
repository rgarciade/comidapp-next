import prisma from '/prisma/index.js'

export async function getAllCategory() {
    try {
        const categories = await prisma.category.findMany()

        if (!categories) {
            return { error: 'categories not found' }
        }

        return categories
    } catch (error) {
        return { error: 'Something went wrong' }
    }
}
