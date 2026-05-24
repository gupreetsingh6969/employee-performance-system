import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const connectDatabase = async () => {

  try {

    await prisma.$connect();

    console.log(
      "PostgreSQL Connected Successfully"
    );

  } catch (error) {

    console.log(
      "Database Connection Failed"
    );

    console.log(error);

    process.exit(1);

  }

};

export default connectDatabase;