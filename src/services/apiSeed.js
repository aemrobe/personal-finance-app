import { transactions } from "../data/data-transactions";
import { pots } from "../data/data-pots";
import { balance } from "../data/data-balance";
import supabase from "./supabase";
import { categories } from "../data/data-categories";
import { budgets } from "../data/data-budgets";

export async function seedNewUserData(userId) {
  try {
    //we need to create a budget data first
    const categoriesToInsert = categories.map((cat) => {
      return {
        ...cat,
        user_id: userId,
      };
    });

    const { data: createdCategories, error: categoriesError } = await supabase
      .from("categories")
      .insert(categoriesToInsert)
      .select(); //.select() because we want to use the createdCategories data on the next line

    if (categoriesError) throw new Error(categoriesError.message);

    const transactionsToInsert = transactions.map((transaction) => {
      const cat = createdCategories.find(
        (cat) => transaction.category === cat.category,
      );

      return {
        avatar: transaction.avatar,
        name: transaction.name,
        date: transaction.date,
        amount: transaction.amount,
        recurring: transaction.recurring,
        category_id: cat ? cat.id : null,
        user_id: userId,
      };
    });

    const budgetsToInsert = budgets.map((bud) => {
      const cat = createdCategories.find(
        (cat) => bud.category === cat.category,
      );

      return {
        maximum: bud.maximum,
        theme: bud.theme,
        category_id: cat ? cat.id : null,
        user_id: userId,
      };
    });

    const { error: transactionError } = await supabase
      .from("transactions")
      .insert(transactionsToInsert);
    const { error: budgetsError } = await supabase
      .from("budgets")
      .insert(budgetsToInsert);

    if (transactionError) throw new Error(transactionError.message);
    if (budgetsError) throw new Error(budgetsError.message);

    const potsToInsert = pots.map((pot) => {
      return { ...pot, user_id: userId };
    });
    const balanceToInsert = balance.map((balance) => {
      return { ...balance, user_id: userId };
    });

    const { error: potsError } = await supabase
      .from("pots")
      .insert(potsToInsert);
    const { error: balanceError } = await supabase
      .from("balance")
      .insert(balanceToInsert);

    if (potsError) {
      throw new Error(potsError.message);
    }
    if (balanceError) {
      throw new Error(balanceError.message);
    }
  } catch (error) {
    console.error("Seeding Failed", error.message);
    throw new Error(error.message);
  }
}
