# RentBack Landing — One-Click Deploy

This repo contains your landing page. No coding required.

## What you will do
1. Make a Google Sheet collector (copy/paste a tiny script).
2. Put the web app URL into the code (one line) **or** add a small snippet later.
3. Put this project on Vercel using GitHub.
4. Point your domain.

---

## 1) Google Sheet + Apps Script (stores signups)
- Create a new Google Sheet (name it `RentBack Waitlist`).
- Click **Extensions → Apps Script** and replace all code with:

```js
const SHEET_NAME = "Waitlist";

function doPost(e) {
  try {
    const ct = (e.postData && e.postData.type) || "";
    let data = {};
    if (ct.includes("application/json")) {
      data = JSON.parse(e.postData.contents || "{}");
    } else {
      data = e.parameter || {};
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sh.getLastRow() === 0) {
      sh.appendRow([
        "timestamp","email","phone","city","lang","theme",
        "utmSource","utmMedium","utmCampaign","analytics","bot","ua","ts"
      ]);
    }
    sh.appendRow([
      new Date(), data.email||"", data.phone||"", data.city||"",
      data.lang||"", data.theme||"", data.utmSource||"", data.utmMedium||"",
      data.utmCampaign||"", data.analytics ? "TRUE" : "FALSE",
      data.bot ? "TRUE" : "FALSE", data.ua||"", data.ts||""
    ]);

    return ContentService.createTextOutput("OK")
      .setMimeType(ContentService.MimeType.TEXT);
  } catch (err) {
    return ContentService.createTextOutput("ERR")
      .setMimeType(ContentService.MimeType.TEXT);
  }
}
```

- Click **Deploy → New deployment → Web app**  
  - **Execute as:** Me  
  - **Who has access:** Anyone  
- Click **Deploy**, authorize if prompted, and copy the **Web app URL**.

> You can rotate this later; your site sends data with `mode: 'no-cors'` (fire‑and‑forget).

---

## 2) Tell the site where to send form data
Open `components/RentBackLanding.tsx` and find this line near the top:

```ts
const FALLBACK_WAITLIST_ENDPOINT = "https://script.google.com/.../exec" as const;
```

Replace it with your **Web app URL** from step 1, then save & commit in GitHub (next step).

---

## 3) Put the project on the internet (Vercel + GitHub)
- Create a **GitHub** account if you don't have one.
- On GitHub, click **New repository** → name `rentback-site` → **Create**.
- In the repo, click **Upload files**, then **drag the entire folder** from this zip into the page → **Commit**.
- Go to **vercel.com** → **Log in with GitHub** → **Add New Project** → choose `rentback-site` → **Deploy**.
- Wait for the green checkmark; you'll get a URL like `https://rentback-site.vercel.app`.

(If you update the file later on GitHub, Vercel redeploys automatically.)

---

## 4) Use your domain
In Vercel → your project → **Settings → Domains** → add `rentback.app` (or subdomain).  
At your domain provider, create the DNS record Vercel tells you to add. Done.

---

## Optional tweaks
- **Analytics:** The page only loads Plausible if you enable it in the Cookie modal. Change the domain in code if you use a subdomain.
- **Email delivery:** You can also forward signups to email via Apps Script later, but the Sheet is enough to start.
- **WordPress:** If you want a blog, point `blog.rentback.app` to WordPress and link back to your landing.

---

## No-code fallback (if you don't want any of the above)
- Create a free site in **Framer** or **Carrd**, and embed a **Tally** form. You’ll be live in minutes. You can always migrate to this React site later.
