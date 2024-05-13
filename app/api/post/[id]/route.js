import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic' // defaults to auto

export async function DELETE(request, { params }) {
  const id = params.id;

  const post = await prisma.post.delete({
    where: { id },
  });

  return NextResponse.json(post);
}

function handleError(error) {
  console.error(error);
  return NextResponse.json({ message: "Error fetching post" }, { status: 500 });
}

export async function GET(request, { params }) {
  try {
    const id = params.id;

    const post = await prisma.post.findUnique({ // Use findUnique for single record
      where: { id },
      include: {
        author: {
          select: { name: true },
        },
      },
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(request, { params}) {
  try {
    const res = await request.json()
    const {title, content} = res;
    const id = params.id;
    // const data = JSON.parse(body); // Request body is in JSON format

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        published: true,
        author: {create: {
            name: 'Mizanur'
        }}
    }
  });

    if (!updatedPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(updatedPost);
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

  const params = posts.map((post) => ({
    id: post.id,
  }));

  return params;
}
