import { PrismaClient } from '@prisma/client';
// @ts-ignore
import prisma from '/prisma/index.js'

interface WhereClause {
    [key: string]: any;
}

interface IncludeClause {
    [key: string]: boolean | object;
}

interface GetAllConfig {
    table: keyof PrismaClient;
    where: WhereClause;
    includes: IncludeClause;
    pageSize: number;
    page: number;
}

class DbUseService {
    private dbService: PrismaClient;

    constructor(dbService: PrismaClient) {
        this.dbService = dbService;
    }

    async getAll(config: GetAllConfig) {
        const { table, where, includes, pageSize, page } = config;
        const skip = (page - 1) * pageSize;
        // @ts-ignore
        return await this.dbService[table].findMany({
            where,
            include: includes,
            skip: skip,
            take: pageSize,
        });
    }
}

export default new DbUseService(prisma);
