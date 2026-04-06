import supabase from "./supabase";

export async function getPots() {
  const { data, error } = await supabase
    .from("pots")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error(error.message);
    throw Error(error.message);
  }

  return data;
}

export async function createPot(newData) {
  const { data, error } = await supabase
    .from("pots")
    .insert([newData])
    .select()
    .single();

  if (error) {
    console.error(error.message);

    throw new Error(`Failed to create pot: ${error.message}`);
  }

  return data;
}

export async function updatePot({ updatedData, id }) {
  const { data, error } = await supabase
    .from("pots")
    .update(updatedData)
    .eq("id", id)
    .select();

  if (error) throw new Error(`Failed to update pot: ${error.message}`);

  return data;
}

export async function deletePot(id) {
  const { error } = await supabase.from("pots").delete().eq("id", id);

  if (error) throw new Error(`Failed to delete pot: ${error.message}`);
}
