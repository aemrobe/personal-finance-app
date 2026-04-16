export const FOCUS_DELAY = 150;
export const FIELD_REQUIRED_MESSAGE = "This field is required";
export const INVALID_EMAIL_MESSAGE = "Invalid email address";
export const EMAIL_PATTERN = /\S+@\S+\.\S+/;
export const ANIMATION_DURATION = 200;
export const ANIMATION_DURATION_MENU = 200;
export const ANIMATION_DURATION_SELECT_MENU = 300;
export const TOAST_DURATION_MS = 4000;
export const PAGE_TITLE_FOCUS_AFTER_TOAST_DURATION = 1;
export const MODAL_FOCUS_DURATION = 20;
export const NETWORKERROREVENT = "network-error";
export const AUGUSTMONTH = 7;
export const YEAR2024 = 2024;

export const THEMES = [
  {
    name: "green",
    color: "#277c78",
  },
  { name: "yellow", color: "#f2cdac" },
  { name: "cyan", color: "#82c9d7" },
  { name: "navy", color: "#626070" },
  { name: "red", color: "#c94736" },
  { name: "purple", color: "#826cb0" },
  { name: "turquoise", color: "#597c7c" },
  { name: "brown", color: "#93674f" },
  { name: "magenta", color: "#934f6f" },
  { name: "blue", color: "#3f82b2" },
  { name: "navy grey", color: "#97a0ac" },
  { name: "army green", color: "#7f9161" },
  { name: "pink", color: "#af81ba" },
  { name: "gold", color: "#cab361" },
  { name: "orange", color: "#be6c49" },
];

export const PAGE_SIZE = 10;

export const SORT_BY_OPTIONS = [
  {
    label: "Latest",
    value: "date-desc",
  },
  {
    label: "Oldest",
    value: "date-asc",
  },
  { label: "A to Z", value: "name-asc" },
  { label: "Z to A", value: "name-desc" },
  { label: "Highest", value: "amount-desc" },
  { label: "Lowest", value: "amount-asc" },
];

export const EMPTY_BALANCE = {
  id: null,
  current: 0,
  income: 0,
  expenses: 0,
};
