import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";



export async function DELETE(request, {params}){
    const id = params.id;
    
    const post = await prisma.post.delete({
        where: {id}
    })

    return NextResponse.json(post)
}

function handleError(error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching post" }, { status: 500 });
  }
  
  export async function GET(request, { params }) {
    try {
        const id=request.url.split("post/")[1];
    //   const id = params.id;
  
      const post = await prisma.post.findUnique({ // Use findUnique for single record
        where: { id },
      });
  
      if (!post) {
        return NextResponse.json({ message: "Post not found" }, { status: 404 });
      }
  
      return NextResponse.json(post);
    } catch (error) {
      return handleError(error);
    }
  }

  export async function generateStaticParams() {
    const posts = await prisma.post.findMany({
        where: { published: true },
        include: {
          author: {
            select: { name: true },
          },
        },
      }); // getPosts অপ্রত্যাশিত বলে ধরে নেওয়া হচ্ছে
    // if (!Array.isArray(posts)) {
    //     // ফাঁকা অ্যারে বা অ্যারে ছাড়া রিটার্ন মান পরিচালনা করুন
    //     console.error("getPosts অ্যারে ফেরত দেয়নি");
    //     return []; // অথবা একটি ত্রুটি ছুঁড়ে ফেলুন
    // }
  
  const params = posts.map((post) => ({
        id: post.id,
    }));
    return params;
  }
  