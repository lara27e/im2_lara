async function markiereBelegtePlaetze() {
    try {
      const res = await fetch("https://data.bs.ch/api/explore/v2.1/catalog/datasets/100088/records?limit=100");
      const data = await res.json();
      const records = data.results;
  
      records.forEach(eintrag => {
        const id2 = eintrag.id2; // z. B. "elisabethen"
        const auslastung = eintrag.auslastung; // z. B. 0.42
  
        // Hole das Parkhaus-Container-Element anhand von id2
        const container = document.getElementById(id2);
        if (!container) return;
  
        const fenster = container.querySelectorAll('.fenster');
        const anzahlZuFaerben = Math.round(auslastung * fenster.length);
  
        // Fenster einfärben
        fenster.forEach((elem, index) => {
          elem.style.backgroundColor = index < anzahlZuFaerben ? '#fff774' : '#848484';
        });
      });
    } catch (err) {
      console.error("Fehler beim Laden der Parkhausdaten:", err);
    }
  }
  
  // DOM muss fertig geladen sein
  document.addEventListener("DOMContentLoaded", markiereBelegtePlaetze);