import ClientPage from "./page.client";
import api, { fetchNewsData } from "@/lib/api";

// Define the generateStaticParams functionimport api from "@/lib/api";

// Define the generateStaticParams function
export async function generateStaticParams() {
  try {
    // Fetch all news items to get their ids
    const res = await api.get("/news");
    const news = res.data.results; // Ensure the path to results is correct

    // Return an array of objects with id property
    return news.map((item) => ({
      id: item.id.toString(), // Convert id to string if it's not
    }));
  } catch (error) {
    console.error("Error fetching news ids:", error);
    return []; // Return an empty array in case of an error
  }
}

// Define the main server-side page component
const ServerPage = async ({ params }) => {
  const { id } = params;

  try {
    const res = await api.get(`/news/${id}`);
    const newsData = res.data; // Ensure this matches your API response structure
    return <ClientPage newsData={newsData} />;
  } catch (error) {
    console.error("Error fetching news data:", error);
    return <div>Error loading news data</div>; // Render a fallback UI
  }
};

export default ServerPage;
