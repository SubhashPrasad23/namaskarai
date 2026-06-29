import Sidebar from "@/components/layout/admin/Sidebar";
import {createClient} from "@/./lib/supabase/server"
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // not logged in
  if (!user) {
    redirect("/login");
  }

  // not admin
  if (user.email !== process.env.ADMIN_EMAIL) {
    redirect("/user");
  }

  return (
    <div className="flex min-h-screen bg-[#FFF8F6]">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8 mt-12 md:mt-0 bg-[#FFF8F6]">
        {children}
      </main>
    </div>
  );
}
