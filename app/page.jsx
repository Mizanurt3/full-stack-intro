import Image from "next/image";
import styles from './page.module.css';

import prisma from '@/lib/prisma';
import Post from "./components/Post";
import Link from "next/link";


async function getPosts() {
  const response = await fetch("https://full-stack-intro-livid.vercel.app//api/post",
  
  {
    method:"GET",
    next: {
        revalidate: 10,
    },
}
  );
  if (!response.ok) {
    throw new Error("There was an error fetching posts");
  }

  const posts = await response.json();
  return posts;
  
}

export default async function Home() {
  const postss = await getPosts();
  const posts =postss.posts
 
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

