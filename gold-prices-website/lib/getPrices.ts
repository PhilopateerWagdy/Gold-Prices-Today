import axios from "axios";

export async function getGoldPricesByCountry(country: string) {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/gold-prices/${country}`
  );
  return data;
}
