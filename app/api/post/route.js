import prisma from "@/lib/prisma";
import { NextResponse } from "next/server"

export async function GET(request){
    const posts = await prisma.post.findMany({
        where: { published: true },
        include: {
          author: {
            select: { name: true },
          },
        },
      });

    return NextResponse.json({posts})
}



export async function POST(request){
    const res = await request.json()
    const {title, content} = res;
    const result = await prisma.post.create({
        data: {
            title,
            content,
            published: true,
            author: {create: {
                name: 'Mizanur'
            }}
        }
     })

    return NextResponse.json({result})
}