import { PrismaClient } from '@prisma/client'


let prisma;

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient({
            log: [
                {
                    emit: 'event',
                    level: 'query',
                },
                {
                    emit: 'stdout',
                    level: 'info',
                },
                'warn',
                'error',
            ],
        });
    }
    prisma = global.prisma;
}
prisma.$on('query', e => {
   // console.log(e.query, e.params);
});

export default prisma;
