# WEB-LAB-03 — Observations and explanations

Compare these values with your saved predictions after running the workbook. Explain differences before replacing an answer.

| Prediction field | Expected observation |
|---|---|
| hostname | `books.example` |
| host | `books.example:8443` |
| port | `8443` |
| tags | `["network", "web"]` |
| httpOriginForm | `/catalog/atlas?lang=tr&tag=network&tag=web` |
| normalizedDefaultPort | `""` |
| fileBaseHref | `https://books.example/catalog/notes` |
| directoryBaseHref | `https://books.example/catalog/lesson/notes` |
| queryHref | `https://books.example/catalog/lesson.html?lang=en` |
| fragmentHref | `https://books.example/catalog/lesson.html?lang=tr#new` |
| apiSameOrigin | `false` |
| apiSameSite | `true` |
| portSameOrigin | `false` |
| portSameSite | `true` |
| schemeSameSite | `false` |
| formSerialized | `q=notlar+%C4%B1` |
| missingBaseError | `TypeError` |

`#summary` remains a separate client component and does not enter the derived request target. HTTPS default port 443 is omitted from URL serialization, not from service semantics. The final slash changes the base directory used for relative resolution. The same-site comparisons rely on the declared domain fixture, while origin also distinguishes subdomains and ports. A scheme change differs under the selected schemeful-site comparison.

The separate literal `A+B` form example becomes `q=A%2BB` and round-trips unchanged. Missing-base failure occurs inside parsing before any HTTP, DNS or TLS operation.

These are local algorithm observations. The site fixture is not a complete Public Suffix List. Parsing establishes neither remote resource existence, secure transport, browser response-read permission nor object authorization. A matching answer sheet does not replace explaining those boundaries.

Return to [the workbook](README.en.md), or revisit [the hints](HINTS.en.md).
