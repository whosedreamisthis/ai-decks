"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAsDemo() {
  const cookieStore = await cookies();
  cookieStore.set("demo_mode", "true", { path: "/", maxAge: 60 * 60 * 24 }); // 24 hours
  redirect("/dashboard");
}

export async function logoutDemo() {
  const cookieStore = await cookies();
  cookieStore.delete("demo_mode");
  redirect("/");
}
