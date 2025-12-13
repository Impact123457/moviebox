# 🎬 movieBox
---
![Status](https://img.shields.io/badge/status-in--development-yellow.svg)
![Issues](https://img.shields.io/github/issues/zuranmateo/forvalorofficial.svg)
![PRs](https://img.shields.io/github/issues-pr/zuranmateo/forvalorofficial.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
---

movieBox je spletna aplikacija za vse ljubitelje filmov, ki omogoča enostavno spremljanje filmov, ki si jih želiš ogledati, si jih že ogledal ali so ti bili posebej všeč. Uporabniki lahko raziskujejo filme, si ogledajo njihove podrobnosti in si ustvarijo svojo osebno filmsko zbirko.
---

## 📝 Kazalo
- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [TODO](#todo)
- [Authors](#authors)
- [Acknowledgements](#acknowledgement)
---

## ✨ Funkcionalnosti
- 📌 **Watch List** – seznam filmov, ki si jih uporabnik želi ogledati  
- 📖 **Diary** – evidenca filmov, ki jih je uporabnik že pogledal  
- ❤️ **Liked Movies** – filmi, ki so uporabniku posebej všeč  
- 🎥 **Podrobnosti o filmih**, vključno z:
  - opisom (description)
  - režiserjem (director)
  - žanri (genres)

## 🏁 Kako začeti

### Predpogoji
Če želiš projekt poganjati lokalno, potrebuješ:

    Node.js (LTS)

    npm ali pnpm

    Git

### Nameščanje

1. Kloniraj projekt:

```git clone``` [movieBox](https://github.com/Impact123457/moviebox)
2. Namesti odvisnosti:

        npm install

    ali:

        pnpm install



3. Zaženi development server:

        npm run dev
    
    ali:

        pnpm dev


---

## ⛏️ Tehnologije in orodja
- **Next.js**
- **TypeScript**
- **Sanity CMS**
- **TailwindCSS**
- **Node.js**
- **NextAuth**
- **GitHub**
- **Vercel**
- **shadcn/ui**
---
## 🧑‍💻Uporaba

1. Uporabnik lahko brska po filmih.
2. Pri vsakem filmu so na voljo podrobne informacije.
3. Filme lahko:
    - doda na **Watch List**
    - označi kot ogledane (**Diary**)
    - označi kot všečkane (**Liked Movies**)
4. Uporabnik ima vedno pregled nad svojo osebno filmsko statistiko.
5. Uporabnik lahko ureja svoje:
    - uporabniško ime
    - profilno sliko
    - svoj bio
---
### Kako in kaj?

#### Kako se prijaviti

prijaviš se lahko na strani ```/login```. Zgoraj desno v navigacijski vrstici se nahaja. Nato lahko greste na registracijo, ki je na dnu okna za prijavo. Če se želite se lahko prijavite z emailom in geslom, če pa se želite prijaviti z Github profilom, se s tem lahko prijavite na strani za prijavo.

#### Kako dodajati filme na watch list, diary ali med liked filme

na strani *Movies* so izpisai vsi filmi, na đeljeni film kliknete in ste na strani kjer vidite vse podatke o filmu, pod opisom filma so trije gumbi 1. srce(liked filmi), 2. oko(diary) in 3. list(watch list), s tem ko stisnete na gumb se film doda na željeni list, in da ga vzamete z lista še enkrat stisnete na gumb.

#### Kako urejati profil

da uredite profil imate na strani kjer se izpiše vaš profil gumb *Edit profile*, ko stisnete na ta gumb se znajdete na novi strani z vpisnimi polji, kjer vpišete željene podatke in nato shranite spremembe.
***V kolikor ste prijavljeni z Github profilom, urejanje profila ni mogoča***

---

## 🚀Nadaljnje izboljšave

- Uporabniški računi
- Ocene filmov
- Filtriranje po žanrih
- Možnost odstanjevanja filmov iz lista

---

## ✍️Avtorica

- **Ema Škruba** – Avtorica in razvijalka  
  - GitHub: https://github.com/Impact123457

---
## 🎉Dodatno

- **Inspiracija:** Projekt izhaja iz podobne aplikacije *movieBoxd* 
- **Mentor:** Samo Železnik  
- **Avtentikacija:** Implementirano z **NextAuth**.  
- **Open-source community:** Next.js, Sanity, TailwindCSS, shadcn/ui, Vercel.