import supabase from "./supabase";

export async function getTransactions() {
  let { data, error } = await supabase
    .from("transactions")
    .select("*,budgets(category,theme)");

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return data;
}
