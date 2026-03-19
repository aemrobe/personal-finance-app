import supabase from "./supabase";

export async function getCategories() {
  let { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return data;
}
