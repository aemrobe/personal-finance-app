import supabase from "./supabase";

export async function getBudgets() {
  let { data, error } = await supabase.from("budgets").select("*");

  if (error) throw new Error(error.message);

  return data;
}
