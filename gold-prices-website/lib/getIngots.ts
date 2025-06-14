import axios from "axios";
import { Ingot, Company } from "@/types";

export async function getIngots(selectedCompany: Company): Promise<Ingot[]> {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/ignots/${selectedCompany.name}`
    );
    return data;
  } catch (err) {
    console.error("Error fetching companies:", err);
    return [];
  }
}
