import Image from "next/image";
import styles from './page.module.css';

import prisma from '@/lib/prisma';
import Post from "./components/Post";
import Link from "next/link";
// import { AddPostLinkButton } from "./components/add-post-link-button"; // Assuming the component name is Button

async function getPosts() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return posts;
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className={styles.main}>
      <Link className="outline-2 font-bold uppercase" href="/add-post">  
       Add Post
      </Link>
      <h1>Feed</h1>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.content}
          authorName={post.author.name}
        />
      ))}
    </main>
  );
}
