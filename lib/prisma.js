import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === 'production'){
    prisma = new PrismaClient()
} else {
    if (!global.prisma){
        global.prisma = new PrismaClient()
    }
    prisma = global.prisma
}

export default prisma;


export async function getPosts() {
    const posts = await prisma.post.findMany({
      where: { published: true },
      include: { author: { select: { name: true } } },
      next: {
          revalidate: 10,
      },
  });
    return posts;
  }