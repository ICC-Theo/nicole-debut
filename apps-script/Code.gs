// Nicole's Debut RSVP: paste this whole file into Extensions -> Apps Script of the "Nicole RSVP" sheet,
// then Deploy -> New deployment -> Web app (Execute as: Me, Who has access: Anyone).
//
// Each RSVP from the site:
//   1. upserts one row per Guest ID on the "RSVP Response" tab (all attendee names, counts, yes/no, time)
//   2. writes the main guest's name and seat counts onto the guest list tab (first tab) beside that Guest ID

const RESPONSE_TAB = 'RSVP Response';
const RESPONSE_HEADERS = ['GuestID', 'Guest Name', 'Attendee Names', 'Adults', 'Kids', 'Attending', 'Timestamp'];

// Guest list tab layout: A Name | B Seats | C Kids Seat | D Guest ID
const GUEST_ID_COL = 4;

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000); // two guests submitting at once must not overwrite each other's rows
  try {
    const data = JSON.parse(e.postData.contents);
    const guestId = String(data.guestId || '').trim().toUpperCase();
    if (!guestId) throw new Error('Missing guestId');

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const attending = data.attending === 'No' ? 'No' : 'Yes';
    const adults = attending === 'Yes' ? Number(data.adults) || 0 : 0;
    const kids = attending === 'Yes' ? Number(data.kids) || 0 : 0;

    writeResponse(ss, guestId, [
      guestId,
      data.guestName || '',
      data.attendeeNames || '',
      adults,
      kids,
      attending,
      data.timestamp || new Date().toLocaleString(),
    ]);

    updateGuestList(ss, guestId, data.guestName || '', adults, kids, attending);

    return json({ status: 'success' });
  } catch (error) {
    return json({ status: 'error', error: String(error) });
  } finally {
    lock.releaseLock();
  }
}

function writeResponse(ss, guestId, row) {
  let sheet = ss.getSheetByName(RESPONSE_TAB);
  if (!sheet) {
    sheet = ss.insertSheet(RESPONSE_TAB);
    sheet.appendRow(RESPONSE_HEADERS);
    sheet.getRange(1, 1, 1, RESPONSE_HEADERS.length).setFontWeight('bold');
  }

  const ids = sheet.getRange(1, 1, Math.max(sheet.getLastRow(), 1), 1).getValues();
  for (let i = 1; i < ids.length; i++) {
    if (String(ids[i][0]).trim().toUpperCase() === guestId) {
      sheet.getRange(i + 1, 1, 1, row.length).setValues([row]);
      return;
    }
  }
  sheet.appendRow(row);
}

function updateGuestList(ss, guestId, guestName, adults, kids, attending) {
  const sheet = ss.getSheets()[0];
  if (sheet.getName() === RESPONSE_TAB) return;

  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return;

  const ids = sheet.getRange(2, GUEST_ID_COL, lastRow - 1, 1).getValues();
  for (let i = 0; i < ids.length; i++) {
    if (String(ids[i][0]).trim().toUpperCase() === guestId) {
      const row = i + 2;
      if (attending === 'Yes' && guestName) sheet.getRange(row, 1).setValue(guestName);
      sheet.getRange(row, 2, 1, 2).setValues([[adults, kids]]);
      return;
    }
  }
}

function doGet() {
  return json({ status: 'ok', message: 'Nicole RSVP API is running' });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
