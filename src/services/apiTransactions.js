import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";

export async function getTransactions({ filter, sortBy, page, searchTerm }) {
  let query = supabase
    .from("transactions")
    .select("*,categories!inner(category)", {
      count: "exact",
    });

  if (filter) query = query[filter.method || "eq"](filter.field, filter.value);

  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }

  if (searchTerm && searchTerm.trim() !== "") {
    const isNumber = !isNaN(searchTerm);

    if (isNumber) {
      query = query.or(`name.ilike.%${searchTerm}%,amount.eq.${searchTerm}`);
    } else {
      query = query.ilike("name", `%${searchTerm}%`);
    }
  }

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + (PAGE_SIZE - 1);

    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return { data, count };
}

export async function getAllTransactions() {
  const { data, error } = await supabase
    .from("transactions")
    .select("*,categories!inner(category)");

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return data;
}
