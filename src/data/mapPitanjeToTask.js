export function mapPitanjeToTask(p) {
  return {
    id: p.idPitanje, // id pitanja iz baze

    image: p.photoURL ? `/${p.photoURL}` : null, // putanja do slike iz baze

    // putanja do slike objašnjenja iz baze
    explanationImage: p.objasnjenje?.photoURL
      ? `/${p.objasnjenje.photoURL}`
      : null,
    
    // oznake odgovora
    options: ["A", "B", "C", "D", "E"],

    // točan odgovor dolazi od 1 do 5 pa ga pretvaramo u index 0 do 4
    correctIndex: Number(p.correctAnswer) - 1,

    points: p.tezina, // težina pitanja
    grade: p.razina, // razred odnosno razina
  };
}
