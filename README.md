# KlokMat - Upute za pokretanje projekta

Web-aplikacija za vježbanje i pripremu zadataka iz natjecanja "Klokan bez granica"

## Preduvjeti

- Node.js (verzija 18 ili novija) - preuzmi sa https://nodejs.org/
- npm (dolazi s Node.js instalacijom)
- Git (za kloniranje repozitorija)

**Napomena:** PostgreSQL baza se nalazi u cloudu (Neon), nije potrebna lokalna instalacija baze podataka.

## Instalacija i pokretanje

### 1. Kloniranje repozitorija

```bash
git clone https://github.com/vidacrnjak/KlokMat
cd klokmat
```

### 2. Instalacija paketa

```bash
npm install
```

_Napomena: Instalacija može potrajati nekoliko minuta._

### 3. Konfiguracija baze podataka

Kreirajte `.env` datoteku u root folderu projekta (uz package.json) i kopirajte sadržaj koji ste dobili putem emaila.

**Pristupne podatke za bazu dobili ste u zasebnoj datoteci putem emaila.**

### 4. Inicijalizacija Prisma klijenta

```bash
npx prisma generate
```

Ovaj korak generira Prisma klijent koji omogućava komunikaciju s bazom podataka.

### 5. Pokretanje aplikacije

```bash
npm run dev
```

Aplikacija će biti pokrenuta na: **http://localhost:3000**

Otvorite browser i unesite gornji URL.

## Pregled baze podataka (opcionalno)

Za pregled sadržaja baze podataka možete koristiti Prisma Studio:

```bash
npx prisma studio
```

Otvara se na: http://localhost:5555

## Funkcionalnosti

Aplikacija omogućuje dva načina vježbanja:

1. **Vježbanje po razredima** - Rješavanje cjelokupnog natjecanja s vremenskim ograničenjem:
   - 2.-3. razred: 60 minuta
   - 4.-5. razred: 75 minuta
   - 6.-7. razred: 75 minuta

2. **Vježbanje po kategorijama bodova** - Rješavanje zadataka određene težine (3, 4 ili 5 bodova)

## Tehnologije

- **Next.js** - React framework
- **React** - Frontend biblioteka
- **PostgreSQL (Neon)** - Cloud baza podataka
- **Prisma** - ORM za bazu podataka
- **CSS** - Stiliziranje

## Autori

- Vida Crnjak
- Lana Batinić
- Marija Dundović
- Ivana Vidović
