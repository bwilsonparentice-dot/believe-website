# Proposed privacy-page update for Create Believers — draft for review

**Status: not applied.** Nothing on the live Privacy Policy has been changed. This
is proposed wording for Beth to review (and, ideally, to have a lawyer glance
at) before Create Believers collects real applications. Once approved, it goes
into `src/chapters/Legal.tsx` and the effective date at the top of the page is updated.

Three points need a decision from Beth before this is final. They are marked **[DECIDE]**.

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
> your shipping preference, and what you are willing to offer a brand, including
> how guests could learn about it, a recap afterwards, and whether and how
> photos may be used. We do not ask for a street address or for the names of
> your guests at this stage. If a partnership is approved, we ask separately for
> the delivery details needed to send product.
>
> **If you are a founder and send an inquiry,** we collect your name, work email
> address, brand name, and website, and what you tell us about your product,
> where it is sold, and what you would like to explore.
>
> **If you send a recap after a gathering,** we collect the attendance and
> serving details you report, your observations, any link to photos you choose
> to share, and the permission you give for how those photos may be used.
> Sharing a photo with us does not give permission to publish it; we use photos
> only as you have agreed.
>
> **How we use it.** We use this information to review your application or
> inquiry, to contact you about it, and, if a partnership goes ahead, to plan
> and deliver it. When we ask a brand's founder to approve a gathering, we share
> a summary of the gathering and of what the host has offered. That summary does
> not include the host's name, contact details, or postal code. We share a
> host's contact or delivery details with a brand only when that is needed to
> deliver product and the host has agreed. We do not sell this information, and
> we add you to a mailing list only if you tick the separate, optional box asking for news.
>
> **Where it is kept.** Submissions are stored in a private database operated
> for us by Supabase, an independent hosting service, on servers in the United
> States. Supabase processes the information on our behalf under its own
> privacy policy. Only members of the Believe Studio team who sign in can read
> these records.
>
> **How long we keep it.** **[DECIDE]** We keep applications and inquiries for
> as long as we are in conversation with you and for up to ___ months
> afterwards, and records of completed partnerships for up to ___ years, unless
> you ask us to delete them sooner.
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

## Decisions needed

1. **[DECIDE] Retention periods** in "How long we keep it". Nothing is deleted
   automatically today; whatever is promised here has to be done by hand in the
   workspace, so choose periods you will actually keep to. If you would rather
   not commit to numbers, an alternative is: "We keep this information for as
   long as it is needed for the purposes above, and delete it on request."
2. **[DECIDE] Sharing with founders.** The draft says host contact details are
   shared with a brand only when needed for delivery and with the host's
   agreement. Confirm that matches how you intend to work (for example, if
   Believe always handles shipping itself, the sentence can say that hosts'
   details are never shared with brands).
3. **[DECIDE] Who else can read records.** The draft says "members of the
   Believe Studio team". If a contractor or partner will have a workspace
   sign-in, say so.

## What the draft is based on

- The fields the forms actually collect (`src/create-believers/HostForm.tsx`,
  `FounderForm.tsx`, `RecapForm.tsx`).
- The database project being created in a US region, on Supabase.
- Guest-page measurement as built: totals per page of views and purchase-link
  clicks, with no visitor identifier stored.

This is a plain-language draft, not legal advice.
