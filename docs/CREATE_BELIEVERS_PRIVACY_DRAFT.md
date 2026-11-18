# Proposed privacy-page update for Create Believers — draft for review

**Status: unpublished draft.** Nothing on the live Privacy Policy has been
changed, and nothing will be until Beth has reviewed and approved the actual
wording below. Once approved, it goes into `src/chapters/Legal.tsx` and the
effective date at the top of the page is updated.

**One decision is outstanding: retention** (how long records are kept). The
draft deliberately contains no retention promise. See "Outstanding decision" at the end.

---

## 1. Replace the first paragraph under "What this website collects"

**Current:**

> Apart from one inquiry form on an invitation-only page, described below, the
> website has no contact forms, no email sign-ups, and no advertising or
> analytics trackers, and it does not set cookies. We do not build profiles of
> visitors or sell any information.

**Proposed:**

> The website collects information only when you choose to send it: through the
> Create Believers forms and through one inquiry form on an invitation-only
> page, both described below. It has no advertising or analytics trackers and
> does not set cookies. We do not build profiles of visitors or sell any information.

## 2. Add a new section after "Sending an inquiry (Formspree)"

> ### Create Believers applications and inquiries (Supabase)
>
> Create Believers is our service for bringing food and beverage brands into
> gatherings. Its pages include three forms. Each collects only what you enter.
>
> **If you tell us about a gathering,** we collect your name and email address;
> your organization, role, and website or social profile if you give them; and
> the details of your gathering: its name, type, and description, the date and
> timing, the city, state or region, country, and postal code, the kind of
> venue, the expected number of guests, a general description of who is coming,
> the products and serving plans you have in mind, any dietary or allergy notes,
> your shipping preference, and what you are willing to offer a brand: how
> guests could learn about it, a recap afterwards, and whether you would share
> photos. We do not ask for a street address or for the names of
> your guests at this stage. If a partnership is approved, we ask separately for
> the delivery details needed to send product.
>
> **If you are a founder and send an inquiry,** we collect your name, work email
> address, brand name, and website, and what you tell us about your product,
> where it is sold, and what you would like to explore.
>
> **If you send a recap after a gathering,** we collect the attendance and
> serving details you report, your observations, any link to photos you choose
> to share.
>
> **Photos.** Sharing a photo with us does not give permission to publish or
> reuse it. We ask two separate questions, and each is your choice: whether
> photos may be shown publicly, and whether Believe Studio and the
> participating brand may reuse them in their own marketing. If you agree to
> neither, your photos are seen only by Believe Studio and the participating
> brand, privately. We confirm the details with you in writing before any photo
> is used.
>
> **How we use it.** We use this information to review your application or
> inquiry, to contact you about it, and, if a partnership goes ahead, to plan
> and deliver it. We do not sell this information, and we add you to a mailing
> list only if you tick the separate, optional box asking for news.
>
> **What a brand sees.** While we are considering a match, a host's name,
> contact details, and postal code stay private to Believe Studio. When we ask
> a brand's founder to approve a gathering, we send a summary of the gathering
> and of what the host has offered, without those details. If product is to be
> sent and the brand or a fulfilment partner needs a host's contact or delivery
> details, we first tell the host exactly what would be shared and with whom,
> and we share it only with the host's permission.
>
> **Where it is kept.** Submissions are stored in a private database operated
> for us by Supabase, an independent hosting service, on servers in the United
> States. Supabase processes the information on our behalf under its own
> privacy policy. Only Beth Wilson-Parentice and the Believe Studio team members
> she has individually authorized can sign in and read these records. Brand
> founders and hosts do not have access to them.
>
> *[A paragraph on how long records are kept belongs here. It is intentionally
> left out of this draft: see "Outstanding decision". Do not publish until it is settled.]*
>
> **Guest pages.** If you visit a page we share with guests of a gathering, we
> count page views and clicks on links to buy a product. These are simple totals
> for each page. They are not linked to you, and the page does not set cookies
> or ask for your details.
>
> If you would like to see, correct, or delete the information you sent, write
> to hello@believestudio.co and we will take care of it.

## 3. Small consistency edit under "Links to other sites" (optional)

No change needed. Purchase links on guest pages are covered by the existing wording.

---

## Outstanding decision: retention

How long applications, inquiries, recaps, and partnership records are kept has
not been decided, and nothing in the system deletes records automatically
today. The draft therefore makes no promise about it. Before the page is
published, either:

- agree retention periods and a routine for carrying them out (for example, a
  dated reminder to remove closed records by hand in the workspace), then add
  wording that matches what is actually done; or
- state only what is true now, for example: "We delete your information on
  request", which the last paragraph of the section already says.

## Already reflected, from Beth's instructions

- Workspace access is limited to Beth and team members she explicitly authorizes.
- Founders receive the approval summary without workspace access.
- Host contact details stay private during matching; sharing contact or
  delivery details with a brand or fulfilment partner happens only after the
  host is told what will be shared and gives permission. The workspace has a
  place on each partnership to record that permission.
- Permission to show photos publicly and permission for Believe Studio or the
  brand to reuse them are separate, explicit choices; providing photos grants neither.

## What the draft is based on

- The fields the forms actually collect (`src/create-believers/HostForm.tsx`,
  `FounderForm.tsx`, `RecapForm.tsx`).
- The database project being created in a US region, on Supabase.
- Guest-page measurement as built: totals per page of views and purchase-link
  clicks, with no visitor identifier stored.

This is a plain-language draft, not legal advice.
