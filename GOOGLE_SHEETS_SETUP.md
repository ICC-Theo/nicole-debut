# Google Sheet for Nicole's Debut

**Sheet:** [Nicole RSVP](https://docs.google.com/spreadsheets/d/1OY_z0B62aiXQCPskeBumoo1il0L8Xf2c0zMNe3fGEpI/edit)
(shared as *Anyone with the link → Viewer*).

| Tab | Purpose |
|---|---|
| First tab (guest list) | A Name · B Seats · C Kids Seat · **D Guest ID**. The site validates IDs against column D live. |
| RSVP Response | One row per guest, written by the Apps Script below. |

If the sheet can't be reached, the site falls back to `public/Event Invitation.csv`,
so keep that file's IDs in sync when you add guests.

## Connect RSVP saving (one-time, ~5 min)

Google only lets the sheet owner do this step.

1. Open the sheet → **Extensions → Apps Script**.
2. Select everything in the editor, delete it, and paste the whole of [`apps-script/Code.gs`](apps-script/Code.gs).
3. **Save** (Ctrl+S). Name the project **Nicole RSVP** if asked.
4. **Deploy → New deployment** → gear icon → **Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
5. **Deploy** → **Authorize access** → choose your account → **Advanced** →
   **Go to Nicole RSVP (unsafe)** → **Allow**. ("Unsafe" only means Google hasn't reviewed your own script.)
6. Copy the **Web app URL** (`https://script.google.com/macros/s/…/exec`) and put it in
   `src/services/guestService.ts` as `rsvpEndpoint`, then commit and push.

Each RSVP then:
- adds or updates the guest's row on **RSVP Response** (Guest ID, main name, all attendee names, adults, kids, Yes/No, time);
- fills **Name**, **Seats** and **Kids Seat** on the guest list beside that Guest ID.

Never use the `/exec` URL from Enchong's site: that script belongs to Enchong's sheet.

## Troubleshooting

- **Opening the `/exec` URL in a browser** should show `{"status":"ok","message":"Nicole RSVP API is running"}`.
- **RSVPs not appearing**: Apps Script → **Executions** lists each call and any error.
- **Edited the script?** Use **Deploy → Manage deployments → Edit (pencil) → Version: New version → Deploy**.
  A *New deployment* would give a different URL; the old one keeps running the old code.
- **"Invalid Guest ID"**: the ID must be in column D of the first tab.
- **Old page after a push**: Ctrl+F5, or a private window.
