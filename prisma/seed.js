const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  // Create Authors
  const author1 = await prisma.author.create({
    data: {
      name: "Author One",
    },
  });

  const author2 = await prisma.author.create({
    data: {
      name: "Author Two",
    },
  });

  // Create Books
  const book1 = await prisma.book.create({
    data: {
      title: "Book One",
      authorId: author1.id,
    },
  });

  const book2 = await prisma.book.create({
    data: {
      title: "Book Two",
      authorId: author2.id,
    },
  });

  // Hash passwords
  const password1 = await bcrypt.hash("password123", 10);
  const password2 = await bcrypt.hash("securepass456", 10);

  // Create Users
  const user1 = await prisma.user.create({
    data: {
      email: "user1@example.com",
      password: password1,
      name: "User One",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "user2@example.com",
      password: password2,
      name: "User Two",
    },
  });

  // Create Borrows
  await prisma.borrow.create({
    data: {
      userId: user1.id,
      bookId: book1.id,
      borrowedAt: new Date(),
    },
  });

  await prisma.borrow.create({
    data: {
      userId: user2.id,
      bookId: book2.id,
      borrowedAt: new Date(),
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
