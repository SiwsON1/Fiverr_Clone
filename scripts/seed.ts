const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {

    try{
await database.category.createMany({
    data: [

{name: "Coding & Technology"},
{name: "Online Marketing & Promotion"},
{name: "Film & Motion Graphics"},
{name: "Literature & Linguistics"},
{name: "Audio & Melody"},
{name: "Entrepreneurship & Strategy"},
{name: "Information & Analytics"},
{name: "Imagery & Captures"},
{name: "Machine Learning & Automation"},
    ]
});
console.log("Success");
    }catch(error){
console.log("Error seeding the database categories", error)
    }finally{
        await database.$disconnect();

    }
}

main();