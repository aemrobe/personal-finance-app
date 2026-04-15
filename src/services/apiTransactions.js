import supabase from "./supabase";

export async function getTransactions({ filter, sortBy }) {
  let query = supabase
    .from("transactions")
    .select("*,categories!inner(category)");

  if (filter) query = query[filter.method || "eq"](filter.field, filter.value);

  if (sortBy)
    query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  const { data, error } = await query;

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return data;
}
