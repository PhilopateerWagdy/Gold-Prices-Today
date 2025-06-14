import axios from "axios";
import { Company } from "@/types";

export async function getCompanies(): Promise<Company[]> {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/companies`
    );
    return data;
  } catch (err) {
    console.error("Error fetching companies:", err);
    return [];
  }
}
