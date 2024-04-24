const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const words = [
        { english_word: "carrot", spanish_word: "zanahoria" },
        { english_word: "broccoli", spanish_word: "brócoli" },
        { english_word: "asparagus", spanish_word: "espárrago" },
        { english_word: "cauliflower", spanish_word: "coliflor" },
        { english_word: "corn", spanish_word: "maíz" },
        { english_word: "cucumber", spanish_word: "pepino" },
        { english_word: "green pepper", spanish_word: "pimiento verde" },
        { english_word: "lettuce", spanish_word: "lechuga" },
        { english_word: "mushrooms", spanish_word: "setas/hongos/champiñones" },
        { english_word: "onion", spanish_word: "cebolla" },
        { english_word: "potato", spanish_word: "patata/papa" },
        { english_word: "pumpkin", spanish_word: "calabaza" },
        { english_word: "red pepper", spanish_word: "pimiento rojo" },
        { english_word: "tomato", spanish_word: "tomate" },
        { english_word: "beetroot", spanish_word: "remolacha" },
        { english_word: "brussel sprouts", spanish_word: "coles de Bruselas" },
        { english_word: "peas", spanish_word: "guisantes" },
        { english_word: "zucchini", spanish_word: "calabacín" },
        { english_word: "radish", spanish_word: "rábano" },
        { english_word: "sweet potato", spanish_word: "batata/boniato" },
        { english_word: "artichoke", spanish_word: "alcachofa" },
        { english_word: "leek", spanish_word: "puerro" },
        { english_word: "cabbage", spanish_word: "repollo" },
        { english_word: "celery", spanish_word: "apio" },
        { english_word: "chili", spanish_word: "chile" },
        { english_word: "garlic", spanish_word: "ajo" },
        { english_word: "basil", spanish_word: "albahaca" },
        { english_word: "coriander", spanish_word: "cilantro" },
        { english_word: "parsley", spanish_word: "perejil" },
        { english_word: "dill", spanish_word: "eneldo" },
        { english_word: "rosemary", spanish_word: "romero" },
        { english_word: "oregano", spanish_word: "orégano" },
        { english_word: "cinnamon", spanish_word: "canela" },
        { english_word: "saffron", spanish_word: "azafrán" },
        { english_word: "green bean", spanish_word: "judía verde" },
        { english_word: "bean", spanish_word: "judía/habichuela/frijol" },
        { english_word: "chickpea", spanish_word: "garbanzo" },
        { english_word: "lentil", spanish_word: "lenteja" },
        { english_word: "apple", spanish_word: "manzana" },
        { english_word: "apricot", spanish_word: "albaricoque" },
        { english_word: "avocado", spanish_word: "aguacate" },
        { english_word: "banana", spanish_word: "plátano" },
        { english_word: "blackberry", spanish_word: "zarzamora" },
        { english_word: "blackcurrant", spanish_word: "grosella negra" },
        { english_word: "blueberry", spanish_word: "arándano azul" },
        { english_word: "boysenberry", spanish_word: "bayas de boysen" },
        { english_word: "cherry", spanish_word: "cereza" },
        { english_word: "coconut", spanish_word: "coco" },
        { english_word: "fig", spanish_word: "higo" },
        { english_word: "grape", spanish_word: "uva" },
        { english_word: "grapefruit", spanish_word: "pomelo" },
        { english_word: "kiwifruit", spanish_word: "kiwi" },
        { english_word: "lemon", spanish_word: "limón" },
        { english_word: "lime", spanish_word: "lima" },
        { english_word: "lychee", spanish_word: "lichi" },
        { english_word: "mandarin", spanish_word: "mandarina" },
        { english_word: "mango", spanish_word: "mango" },
        { english_word: "melon", spanish_word: "melón" },
        { english_word: "nectarine", spanish_word: "nectarina" },
        { english_word: "orange", spanish_word: "naranja" },
        { english_word: "papaya", spanish_word: "papaya" },
        { english_word: "passion fruit", spanish_word: "fruta de la pasión" },
        { english_word: "peach", spanish_word: "melocotón/durazno" },
        { english_word: "pear", spanish_word: "pera" },
        { english_word: "pineapple", spanish_word: "piña" },
        { english_word: "plum", spanish_word: "ciruela" },
        { english_word: "pomegranate", spanish_word: "granada" },
        { english_word: "quince", spanish_word: "membrillo" },
        { english_word: "raspberry", spanish_word: "frambruesa" },
        { english_word: "strawberry", spanish_word: "fresa" },
        { english_word: "watermelon", spanish_word: "sandía" },
        { english_word: "salad", spanish_word: "ensalada" },
        { english_word: "pizza", spanish_word: "pizza" },
        { english_word: "pasta", spanish_word: "pasta" },
        { english_word: "popcorn", spanish_word: "palomitas de maíz" },
        { english_word: "lobster", spanish_word: "langosta" },
        { english_word: "steak", spanish_word: "filete/bistec" },
        { english_word: "bbq", spanish_word: "barbacoa" },
        { english_word: "pudding", spanish_word: "budín" },
        { english_word: "hamburger", spanish_word: "hamburguesa" },
        { english_word: "pie", spanish_word: "tarta" },
        { english_word: "cake", spanish_word: "pastel" },
    ];

    for (let word of words) {
        await prisma.forkityKeys.create({
            data: {
                english_word: word.english_word,
                spanish_word: word.spanish_word,
            },
        });
    }
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
