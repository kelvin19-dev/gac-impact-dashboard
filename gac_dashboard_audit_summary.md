# GAC Dashboard Audit Summary

## What Worked

- The app already used Coss UI primitives for the main dashboard shell: cards, badges, buttons, selects, tables, sheets, tooltips, progress, and skeleton states.
- The information architecture had most of the right executive areas: overview, network, funding, impact, reports, and data quality.
- The simulated backend pattern was appropriate for a pitch demo: typed mock data, client-side filters, drilldowns, and export actions.

## What Felt Weak

- Seed data still used global geography, global regions, and generic CBO names, which made the demo feel less client-specific.
- Currency and funding labels were USD-oriented instead of Kenya Shillings.
- The first screen was useful but too broad; county performance and leadership follow-up needed a clearer executive frame.
- Projects did not have a dedicated portfolio page, even though project status, risk, completion, and utilization are central to the pitch.

## What Changed

- Rebuilt the mock dataset around Kenyan counties, Kenya regions, CBO-style member names, local wards, and Kenya-relevant project themes.
- Updated dashboard helpers to use KES formatting, county filters, county-facing insights, and Kenya-specific executive narrative copy.
- Added a dedicated Projects section with project type filtering, sorting, portfolio KPIs, risk follow-up, CSV export, and a project table.
- Reframed the footprint view around counties and Kenya regions, including a Kenya-bounded county bubble map.
- Simplified visible copy and replaced leftover generic/global labels with concise executive dashboard language.

## Future Work

- Replace the lightweight SVG county map with a real Kenya county TopoJSON/GeoJSON layer.
- Add real authentication, role-based views, and connected data imports when moving beyond the demo.
- Add downloadable PDF report generation for board and donor packs.
- Add field-level confidence metadata for reach estimates and report completeness.
