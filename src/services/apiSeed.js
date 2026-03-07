import { budgets } from "../data/data-budgets";
import { transactions } from "../data/data-transactions";
import { pots } from "../data/data-pots";
import { balance } from "../data/data-balance";
import supabase from "./supabase";

export async function seedNewUserData(userId) {
  try {
    //we need to create a budget data first
    const budgetsToInsert = budgets.map((budget) => {
      return {
        ...budget,
        user_id: userId,
      };
    });

    const { data: createdBudgets, error: budgetError } = await supabase
      .from("budgets")
      .insert(budgetsToInsert)
      .select(); //.select() because we want to use the createdBudget data on the next line

    if (budgetError) throw new Error(budgetError.message);

    const transactionsToInsert = transactions.map((transaction) => {
      const budget = createdBudgets.find(
        (budget) => transaction.category === budget.category,
      );

      return {
        avatar: transaction.avatar,
        name: transaction.name,
        date: transaction.date,
        amount: transaction.amount,
        recurring: transaction.recurring,
        budgetId: budget ? budget.id : null,
        user_id: userId,
      };
    });

    const { error: transactionError } = await supabase
      .from("transactions")
      .insert(transactionsToInsert);

    if (transactionError) throw new Error(transactionError.message);

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
