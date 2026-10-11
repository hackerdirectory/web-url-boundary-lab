# WEB-LAB-03 — Hints

Use these clues after writing your first predictions. Keep the initial prediction when you revise it.

1. `hostname` excludes the port; `host` can include a non-default port. An omitted default port in serialization does not mean the service has no port.
2. Repeated query values need `getAll`, rather than one selected value. The fragment is a client component, separate from the derived request target.
3. Check the base path up to its final slash. A base ending in `lesson.html` and one ending in `lesson/` establish different resolution directories; neither reads a filesystem.
4. HTTP(S) origin uses scheme, host and normalized port. This lab's declared site fixture uses scheme and the listed registrable domain. If a host is outside that fixture, keep the site result not-computed rather than guessing.
5. `+` represents a space in this form-query serialization context. A literal plus must survive its own encode/decode round trip.
6. Identify the stage that failed. A relative reference without a base cannot become an absolute URL; there is no HTTP, DNS or TLS outcome to explain.

Return to [the workbook](README.en.md). Compare the full observations in [the solution](SOLUTION.en.md) after completing your own record.
