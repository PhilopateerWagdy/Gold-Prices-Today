import axios from "axios";

export async function getNews(locale: "ar" | "en") {
  const apikey = "pub_85454a92c741c29363f49ad0597d229711644";
  const search = "gold";
  const category = "top";
  try {
    const { data } = await axios.get(
      `https://newsdata.io/api/1/latest?apikey=${apikey}&q=${search}&category=${category}&language=${locale}`
    );
    return data.results;
  } catch (err) {
    console.log("No News Found: ", err);
    return [];
  }
}
