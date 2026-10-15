# 50-item implementation status

42 items are implemented. Eight items are partially prepared or awaiting personal content, a real deployment URL, or a hosting/domain choice. Those requirements were not replaced with invented facts.

The site still has only Projects, Experiments, and CV. All features remain separated into components/data fields so they can be removed after review.

| #   | Roadmap item                                                             | Status       | Outcome / remaining input                                                                                         |
| --- | ------------------------------------------------------------------------ | ------------ | ----------------------------------------------------------------------------------------------------------------- |
| 1   | Replace the draft CV with real experience and education.                 | Input needed | Needs your real experience and education; the CV layout/data model is ready.                                      |
| 2   | Add a real downloadable CV PDF.                                          | Input needed | Needs your actual PDF; download support is ready.                                                                 |
| 3   | Add verified email, GitHub, and LinkedIn links.                          | Input needed | GitHub is linked and reachable. Email and LinkedIn await your approved details.                                   |
| 4   | Add real projects beyond this portfolio.                                 | Input needed | Needs real project material beyond this portfolio. No filler projects were added.                                 |
| 5   | Add a clear target role beside the name.                                 | Input needed | Needs your chosen target role; the header supports it.                                                            |
| 6   | Add a concise personal contribution to each case study.                  | Implemented  | Truthful contribution and AI-assistance notes in the portfolio case study.                                        |
| 7   | Show project outcomes with evidence rather than unsupported metrics.     | Implemented  | Outcome statements link to working archive/lab evidence; no invented metrics.                                     |
| 8   | Add live demos where a working deployment exists.                        | Input needed | Needs real deployed demo URLs; conditional demo links are supported.                                              |
| 9   | Separate team contributions from individual work.                        | Implemented  | Individual direction and AI-assisted implementation are distinguished.                                            |
| 10  | Add an accurate project status: live, archived, or in progress.          | Implemented  | Project status is displayed in lists and case studies.                                                            |
| 11  | Filter the archive by technology.                                        | Implemented  | Technology filter in the archive.                                                                                 |
| 12  | Filter by project type or discipline.                                    | Implemented  | Discipline filter in the archive.                                                                                 |
| 13  | Search project names and descriptions.                                   | Implemented  | Search across titles, descriptions, and stack.                                                                    |
| 14  | Sort by date or title without changing featured order.                   | Implemented  | Date/title sorting preserves source and featured order.                                                           |
| 15  | Show a useful empty state when filters have no matches.                  | Implemented  | No-results state with Clear filters.                                                                              |
| 16  | Persist archive filters in the URL for sharing.                          | Implemented  | Filters and view mode round-trip through the URL.                                                                 |
| 17  | Add compact list and visual grid views.                                  | Implemented  | Grid and compact list views.                                                                                      |
| 18  | Show related projects beneath each case study.                           | Implemented  | Relevance-ranked related projects; hidden until more real projects exist.                                         |
| 19  | Add previous/next case-study navigation.                                 | Implemented  | Previous/next case-study links; hidden with only one real project.                                                |
| 20  | Add a project timeline showing major milestones.                         | Implemented  | Dated, factual milestones.                                                                                        |
| 21  | Add screenshot lightboxes with keyboard navigation.                      | Implemented  | Native modal screenshot viewer, arrow keys, Escape, and focus restoration.                                        |
| 22  | Add before/after comparisons using real design versions.                 | Implemented  | Slider compares two different real lab captures.                                                                  |
| 23  | Add short, captioned demo videos with playback controls.                 | Implemented  | Ten-second recorded browser demo with WebVTT captions and playback controls.                                      |
| 24  | Include architecture diagrams where they explain a project.              | Implemented  | Readable architecture flow for shared content, pages, and client components.                                      |
| 25  | Document tradeoffs and constraints for each project.                     | Implemented  | Explicit constraints and implementation tradeoffs.                                                                |
| 26  | Add lessons learned and what you would change next.                      | Implemented  | Lessons and next steps in the case study.                                                                         |
| 27  | Show estimated case-study reading time.                                  | Implemented  | Estimated reading time from narrative content.                                                                    |
| 28  | Add an on-page contents menu for longer case studies.                    | Implemented  | Contents links for available case-study sections.                                                                 |
| 29  | Add copy-link buttons for individual case-study sections.                | Implemented  | Copy-section links with clipboard feedback/fallback.                                                              |
| 30  | Add dated project update notes.                                          | Implemented  | Dated update entries.                                                                                             |
| 31  | Give each experiment a dedicated shareable URL.                          | Implemented  | Seven generated individual experiment routes.                                                                     |
| 32  | Save experiment parameters in the URL.                                   | Implemented  | Validated and bounded composition URL state.                                                                      |
| 33  | Export compositions as PNG files.                                        | Implemented  | Real 2200×1200 browser PNG exports.                                                                               |
| 34  | Export vector experiments as SVG files.                                  | Implemented  | Self-contained SVG exports.                                                                                       |
| 35  | Add undo/redo for experiment settings.                                   | Implemented  | Complete-state undo/redo, bounded to 40 states.                                                                   |
| 36  | Add curated presets to each experiment.                                  | Implemented  | Three curated presets per experiment.                                                                             |
| 37  | Add a drawing experiment with adjustable brushes.                        | Implemented  | Pointer/touch drawing, adjustable brushes, and keyboard-created marks.                                            |
| 38  | Add a procedural landscape experiment.                                   | Implemented  | Seeded landscape with roughness and sun controls.                                                                 |
| 39  | Add a color-mixing experiment with contrast readouts.                    | Implemented  | Color blends with WCAG ratio and AA/AAA readouts.                                                                 |
| 40  | Add a kinetic poster experiment with custom text.                        | Implemented  | Editable poster with palette, tracking, outline, remix, and optional playback.                                    |
| 41  | Audit keyboard interaction and focus order across all routes.            | Implemented  | Keyboard/focus regression tests and axe A/AA audits across routes.                                                |
| 42  | Audit text and control contrast in both appearances.                     | Implemented  | Automated contrast audits in Paper and Ink; study-number issues corrected.                                        |
| 43  | Add a manual site-wide motion preference alongside system settings.      | Implemented  | Persistent Reduced/System setting, plus system preference handling.                                               |
| 44  | Add automated regression tests for the main hiring journey.              | Implemented  | Permanent unit and browser regression suites, including the hiring journey.                                       |
| 45  | Track image and JavaScript performance budgets.                          | Implemented  | Enforced compressed JS/CSS and image byte budgets.                                                                |
| 46  | Add project-specific social sharing cards.                               | Implemented  | Generated project/site social PNGs; sharing metadata activates with a real origin.                                |
| 47  | Add a sitemap, robots rules, and canonical URLs after choosing a domain. | Input needed | Needs the production SITE_URL. Canonical/sitemap/robots logic is implemented and tested.                          |
| 48  | Add structured identity/project metadata using verified information.     | Implemented  | Safely serialized Person/CreativeWork data using supplied/verified facts.                                         |
| 49  | Add link checks for screenshots, source links, demos, and the CV.        | Implemented  | Local file/route checks and opt-in external checks; current destinations verified.                                |
| 50  | Add preview deployments for reviewing changes before publication.        | Input needed | Runnable preview packaging and CI artifact workflow are ready. Hosted previews need a provider and authorization. |

## Verification

- Production build passes.
- 10 unit tests and 17 browser regression tests pass. They cover filters, history/state restoration, SVG/PNG exports, drawing, keyboard/focus, captioned video, mobile layouts, and both-theme accessibility/contrast.
- Existing GitHub destinations were checked successfully. Local screenshot/media/route destinations pass the link checker.
- Client-code/image budgets pass.
- A preview archive was extracted and run independently, including media and image responses.

See [content inputs](content-guide.md) and [deployment status](deployment.md) for the remaining requirements. Remote publication and a remote CI run are separate from local verification.
