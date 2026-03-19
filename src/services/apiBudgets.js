import supabase from "./supabase";

export async function getBudgets() {
  let { data, error } = await supabase
    .from("budgets")
    .select("*,categories(category)")
    .order("id", { ascending: false });

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return data;
}
