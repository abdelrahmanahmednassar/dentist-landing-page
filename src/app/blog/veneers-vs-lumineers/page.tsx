import BlogDetail from "@/components/BlogDetail";
import { getMessages } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const messages = (await getMessages()) as any;
  const blog = messages.blogPages.veneersVsLumineers;

  return {
    title: `${blog.title} - فايد دينتال كلينك`,
    description: blog.lead,
  };
}

export default function VeneersVsLumineersPage() {
  return <BlogDetail blogKey="veneersVsLumineers" />;
}
