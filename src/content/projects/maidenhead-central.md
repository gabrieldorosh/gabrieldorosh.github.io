---
title: Maidenhead Central
shortTitle: Maidenhead Central
summary: "A full-stack property-booking platform for a short-term lettings business, supporting property listings, booking requests, reservation management, and iCal synchronisation with external platforms. The public development build is still being refined."
seoDescription: "A full-stack property-booking platform with authentication, booking requests, host tools, email notifications, and inbound iCal availability synchronisation."
year: "2024–Present"
type: "Full-Stack Web App"
role: "Sole Developer"
featured: true
order: 2
draft: false
accent: "#6875d9"
technologies:
  - Next.js 13
  - React 18
  - TypeScript
  - Tailwind CSS
  - Prisma
  - MongoDB
  - NextAuth.js
  - Zustand
  - Cloudinary
  - Resend
  - node-ical
  - React Leaflet
cover: ../../assets/projects/project_one.png
coverFit: contain
liveUrl: https://maidenhead-central.vercel.app/
liveLabel: View development demo
repoUrl: https://github.com/gabrieldorosh/maidenhead_central
phoneScreens:
  - image: ../../assets/projects/maidenhead-home.jpeg
    label: "Home page"
    alt: Maidenhead Central mobile home page showing a property listing
    caption: "The home page surfaces available properties with clear imagery and nightly prices."
  - image: ../../assets/projects/maidenhead-booking-calendar.jpeg
    label: "Interactive booking calendar"
    alt: Maidenhead Central mobile booking calendar with selected dates and pricing
    caption: "The booking calendar combines date selection, live pricing, and blocked availability."
  - image: ../../assets/projects/maidenhead-manage-property.jpeg
    label: "Host management"
    alt: Maidenhead Central mobile property-management form
    caption: "Each property has a host dashboard for editing listing details and availability."
---

## Context

- **Problem:** Maidenhead Central was created for a short-term lettings business that wanted to support direct relationships with returning guests and reduce its reliance on third-party booking platforms and their service fees.
- **Audiences:** Guests can browse and favourite properties, request bookings, manage reservations, and contact hosts. Hosts can create listings, manage availability, and review reservation requests.
- **Scope:** Authentication supports email and password alongside Google and GitHub OAuth. Each property can also import external availability through iCal feeds.
- **Status:** The public development build demonstrates the current working flows. Payments and two-way calendar synchronisation remain in development.

## Product decisions

- **Booking model:** The platform uses booking requests rather than instant payment. This allows hosts to review a request before accepting it, but means a complete direct-booking flow still requires payment integration.
- **Availability:** A scheduled import refreshes blocked dates from third-party iCal feeds, while hosts can also run a manual sync or force a complete reimport. Because synchronisation is currently inbound only, cancellations and accepted direct bookings still require careful reconciliation.
- **Responsive journeys:** Guest browsing and host-management flows were designed for both desktop and mobile because either device may be used during a booking journey.
- **Authentication:** Credential sign-in gives users an alternative to third-party accounts, while Google and GitHub OAuth reduce friction for users who prefer them.
- **Property rules:** Hosts can configure minimum stays and guest capacities per property, giving each listing its own booking constraints.

## Build

- **Architecture:** Next.js API routes handle application logic, with Prisma providing typed access to MongoDB.
- **Authorisation:** NextAuth.js sessions protect account, listing, and reservation actions, with owner checks applied to host-only operations.
- **Client and media:** Zustand manages shared interface state, Cloudinary stores listing media, and React Leaflet provides property-location maps.
- **Notifications:** Resend sends transactional messages during the booking-request journey.
- **Calendar integration:** `node-ical` parses Airbnb, Booking.com, Vrbo, and other ICS feeds so imported reservations can block unavailable dates.
- **Automation:** An authenticated scheduled task refreshes imported calendars, while conflict checks prevent overlapping requests from being created.

## Outcome

- **Working flows:** The current build supports account creation, authentication, property browsing, favourites, booking requests, guest reservations, host listings, calendar imports, and email notifications.
- **Evidence:** I have tested the deployed workflows and integrations, but the app has not yet been used in production, so I do not claim usage or conversion metrics.
- **Lessons:** The hardest part was keeping local availability consistent with cancellations and partial updates from external calendars.
- **Next milestone:** Add secure payments and outbound calendar updates so accepted direct bookings can propagate to external platforms.
