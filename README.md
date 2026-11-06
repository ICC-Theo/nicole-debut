# Nicole's 18th Debut 🌸

Invitation and RSVP website for Nicole's debut, built with React and TypeScript.
Duplicated from the Enchong 50th birthday site (`icc-theo.github.io`) and re-themed.

## Event Details

All details live in [`src/eventConfig.ts`](src/eventConfig.ts). Edit that one file to change them.

- **Celebrant**: Nicole
- **Date / Time**: Saturday, December 19, 2026, 2:30 PM – 7:00 PM (`dateTime` / `endTime` in `eventConfig.ts`)
- **Venue**: AHF 77 Westside Private Resort, Sitio Lagundi, Banaba West, Batangas City
- **Theme**: Floral Paintings (Impressionist plein air: Monet, Griffel, Averin)
- **Dress code**: Pastel colors except pink

## Theme Colors

| Token | Hex | Use |
|---|---|---|
| `--rose` | `#D6577B` | Blush pink: accents, buttons |
| `--rose-light` | `#EBADBD` | Baby pink: highlights, borders |
| `--sage` | `#98A84E` | Light sage: leaves, secondary accents |
| `--sage-dark` | `#4A592B` | Dark sage: headings, text |
| `--cream` | `#FFFBF7` | White background |

Fonts: Cormorant Garamond (headings), Pinyon Script (script accents), Poppins (body).

## Guest list and RSVPs

- Guest IDs are read from `public/Event Invitation.csv` (column 4, five letters). The test ID is `NICOL`.
- To use Google Sheets instead, create a **new** sheet and Apps Script for Nicole
  (see [GOOGLE_SHEETS_SETUP.md](GOOGLE_SHEETS_SETUP.md)), then fill in `spreadsheetId`, `rsvpEndpoint`
  and set `useGoogleSheets: true` in `src/services/guestService.ts`.
- Until then, RSVPs are kept only in the guest's own browser.

## Photos

`public/Gallery/Photo1.jpg` … `Photo6.jpg`, resized to 1600px from the originals in `Desktop\Nicole`.
The hero background uses Photo1.

Painted backdrop: Claude Monet, *The Artist's Garden in Giverny* (1900), Yale University Art Gallery,
public domain via Wikimedia Commons. Stored at `src/assets/monet-garden.jpg` (1100px, ~225 KB).

## Running

```bash
npm install
npm start          # http://localhost:3000/?GuestID=NICOL
npm run build
```

`homepage` is `"."`, so the build works from any GitHub Pages path (e.g. `/<repo-name>/`).
