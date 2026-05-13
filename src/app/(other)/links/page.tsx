import Links from "@/components/links";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Links",
  description:
    "Discover all my important links in one place! Access my social media profiles, website, and more.",
  alternates: {
    canonical: "https://www.benjaminlooi.dev/links",
  },
  robots: {
    index: false,
    follow: true,
  },
};

function App() {
  return <Links />;
}

export default App;
