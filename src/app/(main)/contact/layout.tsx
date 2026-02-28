import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generatePageMetadata(
  {
    title: "Contact Me - Benjamin Looi",
    description: "Get in touch with Benjamin Looi. Schedule a meeting, send an email, or connect on social media. Open to collaboration and new opportunities.",
  },
  "/contact"
);

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
