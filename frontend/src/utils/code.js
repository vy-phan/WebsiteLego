export const codes = [
  {
    code: "LEGOCHIMA",
    discount: 20,
  },
  {
    code: "BATMAN",
    discount: 10,
  },
  {
    code: "HAPPYBIRTHDAY",
    discount: 15,
  },
  {
    code: "BLACKFRIDAY30",
    discount: 30,
  },
];

export const getCodeDiscount = (code) => {
  const foundCode = codes.find((c) => c.code === code);
  if (foundCode) {
    return foundCode.discount;
  }
  return 0;
};
