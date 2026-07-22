import { SettingsSidebar } from "./componentplace/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

interface PageProps {
  searchParams: Promise<{ tab?: string }> | { tab?: string };
}

export default async function Home() {
  return <div>homepage</div>;
}
