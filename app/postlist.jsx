"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import prisma from '@/lib/prisma';
function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  setPosts(postsprisma);
const deletePost = async (postId) => {
    await axios.delete(`/api/posts/${postId}`);
    // Refresh posts after successful deletion
    fetchPosts();
};
return (
    <h1>fgf</h1>
)
}

export default PostList;