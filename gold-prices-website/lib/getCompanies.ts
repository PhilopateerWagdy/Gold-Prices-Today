import axios from "axios";

type Company = {
  _id: string;
  name: string;
  url: string;
  imgUrl: string;
  ignot_size?: number[];
  ignot_factory?: number[];
  ignot_cashback?: number[];
  coin?: number[];
  coin_size?: number[];
  coin_factory?: number[];
  coin_cashback?: number[];
  __v?: number;
};

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
