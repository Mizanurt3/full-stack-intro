import FetchPostsData from "./fetchPostsData";

export default function UsePost (apiEndPoint){
return useQuery(['mizanPost', apiEndPoint],() => fetchPostsData(apiEndPoint));
};