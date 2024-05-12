import Image from "next/image";
import styles from './page.module.css';

import { getPosts } from "@/lib/getPosts";
import Post from "./components/Post";
import Link from "next/link";




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


