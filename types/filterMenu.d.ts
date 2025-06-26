interface FilterOptions {
  type: "remainingSpaces" | "price";
  sort: "asc" | "desc";
}

interface FilterMenu extends FilterOptions {
  title: string;
}
