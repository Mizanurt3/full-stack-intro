export async function getPosts() {
    const response = await fetch("https://full-stack-intro-livid.vercel.app/api/post",
    
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