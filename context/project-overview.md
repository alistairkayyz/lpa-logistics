# LPA Logistics

## Overview

LPA Logistics is a South African road freight and transport company. This project is a marketing and lead-generation website for the business, targeting companies that need local or cross-border freight solutions. It presents the company's services, coverage area, and contact details, and allows prospects to submit enquiries.

## Goals

1. Present LPA Logistics as a credible, professional transport provider
2. Communicate the full range of services clearly to prospective clients
3. Generate leads via a contact / quote enquiry form

## Core User Flow

1. Visitor lands on the homepage hero
2. Scrolls through sections: Who We Are, Services, Why Choose Us, Process, Industries, Coverage, CTA
3. Navigates to a detail page (Services, Coverage, About, or Contact)
4. Submits a quote enquiry via the Contact form

## Features

### Marketing Pages

- Full-page hero with animated CTA buttons (GSAP)
- Who We Are section
- Services overview cards (Local Transport, Cross-Border Logistics, Freight Coordination)
- Why Choose Us differentiators
- Step-by-step Process section
- Industries served
- Coverage map section (South Africa + SADC region)
- CTA section

### Dedicated Pages

- `/services` — detailed breakdown of Local and Cross-Border service offerings with images and feature lists
- `/coverage` — coverage section + major corridors grid
- `/about` — about the company
- `/contact` — contact details (phone, email, address) + enquiry form with GSAP animation

### Navigation

- Responsive site header (transparent on homepage, light on inner pages)
- Mobile hamburger menu
- Phone number + "Get a Quote" CTA in header

## Scope

### In Scope

- Public marketing website (no auth, no user accounts)
- Static/SSR pages deployed to Vercel
- Contact form (currently client-side only; no backend submission)
- GSAP-powered animations on hero and contact form

### Out of Scope

- Admin panel or CMS
- User authentication or dashboards
- Live shipment tracking
- Backend form submission / email delivery (not yet implemented)
- Payments or booking flow

## Success Criteria

1. All five pages (/, /about, /services, /coverage, /contact) render correctly on desktop and mobile
2. Hero CTA buttons animate into view on load
3. Contact form validates required fields and shows a confirmation state on submit
4. `npm run build` produces a valid Vercel Build Output API directory
5. No broken image or asset links
