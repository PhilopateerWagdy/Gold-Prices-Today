export type Company = {
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

export type Coin = {
  coin: number;
  size: number;
  factory: number;
  cashback: number;
  sel: number;
  pur: number;
};

export type Ingot = {
  size: number;
  factory: number;
  cashback: number;
  sel: number;
  pur: number;
};
