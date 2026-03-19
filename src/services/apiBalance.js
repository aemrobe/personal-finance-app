import supabase from "./supabase";

export async function updateBalance({ updatedData, id }) {
  const { data, error } = await supabase
    .from("balance")
    .update(updatedData)
    .eq("id", id)
    .select();

  if (error) throw Error(`Error updating a balance ${error.message}`);

  return data;
}

export async function getBalance() {
  let { data, error } = await supabase.from("balance").select("*");

  if (error) {
    console.error(error.message);
    throw Error(`Error loading a balance ${error.message}`);
  }

  return data;
}
