import supabase from "./supabase";

export async function getBudgets() {
  let { data, error } = await supabase
    .from("budgets")
    .select("*,categories(category)")
    .order("id", { ascending: false });

  if (error) {
    console.error(error.message);
    throw new Error(`${error.message}`);
  }

  return data;
}

export async function createBudget(newData) {
  const { data, error } = await supabase
    .from("budgets")
    .insert([newData])
    .select();

  if (error) {
    console.error(error.message);
    throw new Error(`Failed to create a budget: ${error.message}`);
  }

  return data;
}

export async function updateBudget({ updatedData, id }) {
  const { data, error } = await supabase
    .from("budgets")
    .update(updatedData)
    .eq("id", id)
    .select();

  if (error) {
    throw new Error(`Failed to update a budget: ${error.message}`);
  }

  return data;
}

export async function deleteBudget(id) {
  const { error } = await supabase.from("budgets").delete().eq("id", id);

  if (error) {
    console.error(error.message);
    throw new Error(`Failed to delete a budget: ${error.message}`);
  }
}
