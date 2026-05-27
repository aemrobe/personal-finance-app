import { useState } from "react";
import supabase from "../services/supabase";
import { balance } from "../data/data-balance";
import { budgets } from "../data/data-budgets";
import { pots } from "../data/data-pots";
import { transactions } from "../data/data-transactions";

async function deleteBalance() {
  const { error } = await supabase.from("balance").delete().gt("id", 0);

  if (error) {
    throw new Error(error.message);
  }
}

async function deleteBudgets() {
  const { error } = await supabase.from("budgets").delete().gt("id", 0);

  if (error) {
    throw new Error(error.message);
  }
}

async function deletePots() {
  const { error } = await supabase.from("pots").delete().gt("id", 0);

  if (error) {
    throw new Error(error.message);
  }
}

async function deleteTransactions() {
  const { error } = await supabase.from("transactions").delete().gt("id", 0);

  if (error) {
    throw new Error(error.message);
  }
}

async function createBalance() {
  const { error } = await supabase.from("balance").insert(balance);

  if (error) {
    throw new Error(error.message);
  }
}

async function createBudgets() {
  const { error } = await supabase.from("budgets").insert(budgets);

  if (error) {
    throw new Error(error.message);
  }
}

async function createPots() {
  const { error } = await supabase.from("pots").insert(pots);

  if (error) {
    throw new Error(error.message);
  }
}

async function createTransactions() {
  const { data: allBudgets } = await supabase.from("budgets").select("*");

  const finalTransaction = transactions.map((transaction) => {
    const budget = allBudgets.find(
      (budget) => transaction.category === budget.category,
    );

    return {
      avatar: transaction.avatar,
      name: transaction.name,
      date: transaction.date,
      amount: transaction.amount,
      recurring: transaction.recurring,
      budgetId: budget ? budget.id : null,
    };
  });

  const { error } = await supabase
    .from("transactions")
    .insert(finalTransaction);

  if (error) {
    throw new Error(error.message);
  }
}

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    try {
      setIsLoading(true);

      //### deleting case ###
      //delete children first
      await deleteTransactions();

      //then delete parent
      await deleteBudgets();

      await deleteBalance();
      await deletePots();

      //### creating case ###
      //parent should be created first
      await createBudgets();

      //then create children
      await createTransactions();

      await createBalance();
      await createPots();

      alert("Database successfully seeded!");
    } catch (err) {
      alert(`Failed to seed database: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteAll() {
    try {
      setIsLoading(true);
      //### deleting case ###
      //delete children first
      await deleteTransactions();

      //then delete parent
      await deleteBudgets();

      await deleteBalance();
      await deletePots();
      alert("Database successfully seeded!");
    } catch (err) {
      alert(`Failed to seed database: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  async function uploadTransaction() {
    try {
      setIsLoading(true);
      //### Delete case ###
      //children should be deleted first
      await deleteTransactions();

      //then parents should be deleted
      await deleteBudgets();

      //### Create case ###
      //Parent should be created first
      await createBudgets();

      //then Children should be created
      await createTransactions();
      alert("Database successfully seeded!");
    } catch (err) {
      alert(`Failed to seed database: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <h3>Sample Data</h3>

      <button
        className="border-2 border-red-500 block mt-5"
        disabled={isLoading}
        onClick={() => {
          uploadAll();
        }}
      >
        upload all
      </button>
      <button
        className="border-2 border-lime-500 mt-5"
        onClick={() => {
          uploadTransaction();
        }}
      >
        upload transactions only
      </button>
      <button
        className="border-2 border-cyan-500 mt-5 block"
        onClick={() => {
          deleteAll();
        }}
      >
        delete all data
      </button>
    </div>
  );
}

export default Uploader;
