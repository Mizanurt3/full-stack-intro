import UsePost from "@/lib/query/usePostDataByQuery";

export default function AllPosts  () {
    const { data, isLoading, isError } = UsePost('/api/post');
  
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching data</div>;
  
    return (
      <div>
        {/* <h1>Data: {data}</h1> */}
      </div>
    );
  };