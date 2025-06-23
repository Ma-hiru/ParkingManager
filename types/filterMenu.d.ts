interface FilterOptions {
  type: "distance" | "price" | "blank" | "total";
  sort: "asc" | "desc";
}

interface FilterMenu extends FilterOptions {
  title: string;
}
