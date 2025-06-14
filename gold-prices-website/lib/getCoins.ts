import axios from "axios";
import { Coin, Company } from "@/types";

export async function getCoins(selectedCompany: Company): Promise<Coin[]> {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/coins/${selectedCompany.name}`
    );
    return data;
  } catch (err) {
    console.error("Error fetching companies:", err);
    return [];
  }
}
