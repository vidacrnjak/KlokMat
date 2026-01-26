export function mapGradeToRazina(grade) {
  if (grade === "2") return "Pcelice";
  if (grade === "3") return "Leptirici";
  if (grade === "4-5") return "Ecolier";
  if (grade === "6-7") return "Benjamin";

  throw new Error("Nepoznat razred");
}
