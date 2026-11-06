# Google Sheet for Nicole's Debut

Guest IDs work **today** without any sheet: the site reads them from `public/Event Invitation.csv`
(80 IDs). The sheet only adds two things: editing the guest list without a code push, and collecting
RSVP answers in one place. Use a **new** sheet for Nicole — never Enchong's.

## 1. Create the sheet (2 min)

1. Go to <https://sheets.new>. Name it **Nicole Debut RSVP**.
2. **File → Import → Upload** → choose `public/Event Invitation.csv` from this repo.
3. Import location: **Replace current sheet**. Separator: **Comma**. Click **Import data**.
4. Fill in guest names in column **A**. Keep the Guest IDs in column **D**, on the **first tab**.
5. **Share** → General access: **Anyone with the link** → **Viewer**.

Layout the site expects:

| A | B | C | D |
|---|---|---|---|
| Name | Seats | Kids Seat | Guest ID |

## 2. Collect RSVP answers (5 min)

1. In the sheet: **Extensions → Apps Script**. Delete the sample code and paste:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    let sheet = ss.getSheetByName('RSVP Response');
    if (!sheet) {
      sheet = ss.insertSheet('RSVP Response');
      sheet.appendRow(['GuestID', 'Guest Name', 'Attendee Names', 'Adults', 'Kids', 'Attending', 'Timestamp']);
      sheet.getRange(1, 1, 1, 7).setFontWeight('bold');
    }

    // One row per guest: a changed answer overwrites the earlier one
    const values = sheet.getDataRange().getValues();
    let rowIndex = -1;
    for (let i = 1; i < values.length; i++) {
      if (values[i][0] === data.guestId) { rowIndex = i + 1; break; }
    }

    const rowData = [
      data.guestId,
      data.guestName || '',
      data.attendeeNames || '',
      data.adults || 0,
      data.kids || 0,
      data.attending || 'Yes',
      data.timestamp || new Date().toLocaleString()
    ];

    if (rowIndex > 0) {
      sheet.getRange(rowIndex, 1, 1, 7).setValues([rowData]);
    } else {
      sheet.appendRow(rowData);
    }

    return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({ status: 'ok', message: 'Nicole RSVP API is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

2. **Save** (Ctrl+S), name the project **Nicole RSVP**.
3. **Deploy → New deployment** → gear icon → **Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
4. **Deploy** → **Authorize access** → pick your account → **Advanced** → **Go to Nicole RSVP (unsafe)** → **Allow**.
5. Copy the **Web app URL** (ends in `/exec`).

## 3. Connect the site

In `src/services/guestService.ts`, set:

```typescript
spreadsheetId: '<the long ID between /d/ and /edit in the sheet URL>',
rsvpEndpoint: '<the /exec Web app URL>',
useGoogleSheets: true,
```

Commit and push; GitHub Actions redeploys in about 2 minutes.
If the sheet can't be reached, the site falls back to `public/Event Invitation.csv`,
so keep the two lists in sync when you add guests.

## Troubleshooting

- **"Invalid Guest ID"**: the ID must be in column D of the first tab, and the sheet must be shared
  as *Anyone with the link → Viewer*.
- **RSVPs not appearing**: Apps Script → **Executions** shows errors. If you edit the script,
  use **Deploy → Manage deployments → Edit → New version**, or the old code keeps running.
- **Old page after a push**: Ctrl+F5, or a private window.
