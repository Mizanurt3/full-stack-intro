export default async function FetchPostsData (apiEndPoint) {
    const response = await fetch(apiEndPoint);
    const data = await response.json();
    return data;
};