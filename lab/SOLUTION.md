# Solution / Çözüm

- hostname `books.example`; host `books.example:8443`; port `8443`; tags `["network", "web"]`.
- httpOriginForm `/catalog/atlas?lang=tr&tag=network&tag=web`. Fragment `#summary` ayrı client component’tir. / The fragment is a separate client component.
- normalizedDefaultPort `""`: HTTPS default443 serialization’dan çıkar; service portsuz olmaz. / HTTPS default443 is omitted from serialization, not from service semantics.
- fileBaseHref `https://books.example/catalog/notes`; directoryBaseHref `https://books.example/catalog/lesson/notes`.
- queryHref `https://books.example/catalog/lesson.html?lang=en`; fragmentHref `https://books.example/catalog/lesson.html?lang=tr#new`.
- apiSameOrigin `false`, apiSameSite `true`; portSameOrigin `false`, portSameSite `true`; schemeSameSite `false`.
- formSerialized `q=notlar+%C4%B1`; literal `A+B` separately becomes `q=A%2BB` and round-trips unchanged.
- missingBaseError `TypeError`. Parsing başarısız; HTTP/DNS/TLS çalışmadı. / Parsing failed; no HTTP/DNS/TLS executed.

Native observations are local algorithm evidence. The selected site fixture is not a full PSL, and URL parsing does not establish resource existence, secure transport, browser read permission, or object authorization. Matching the answer sheet does not replace explaining these boundaries.
