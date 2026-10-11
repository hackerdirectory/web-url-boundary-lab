# WEB-LAB-03 — URL Boundary Lab

A small local companion to WEB-06.01/.02/.03. Predict first, observe native API output, then explain differences. Node.js 20+ is sufficient. No packages, server, or internet are needed: commands parse URL text without contacting it, navigating a browser, or executing it as code.

From the repository root, run `cd labs/web/url`. For a downloaded package, enter the folder containing this README. Copy `predictions.example.json` to `predictions.json`. Fill the 17 fields before viewing output; use JSON booleans and `""` for an empty string. Your prediction file is excluded from Git.


## From lessons to this workbook

| Lesson | Boundary observed in the lab | Evidence to keep |
|---|---|---|
| WEB-06.01 | URL components are not the request target | Host/hostname/port, repeated tags and a fragment excluded from the target |
| WEB-06.02 | Origin and site have different equality rules | Subdomain/port/scheme pairs, listed-domain scope and not-computed result |
| WEB-06.03 | Relative resolution depends on base and encoding context | File/directory bases, query-only/fragment-only, form round trip and missing-base error |

The site's lab page includes setup, this workbook, hints and solution. Use **Download source package** and extract the ZIP; no GitHub account or repository clone is required. Run the commands from your extracted working directory. The workbook can be read offline; executing the commands additionally needs the packaged JS files and Node.js.

## 1 — Components, query, and fragment

Predict hostname, host, port, tags, and httpOriginForm:

```sh
node inspect.mjs --reference 'https://books.example:8443/catalog/atlas?lang=tr&tag=network&tag=web#summary'
node inspect.mjs --reference 'https://books.example:443/catalog'
```

Fill `hostname`, `host`, `port`, `tags`, `httpOriginForm`, and `normalizedDefaultPort`. Why are there two tag values? Why is hash absent from the derived request target? Does a normalized empty port imply that the service has no port? Has either command sent HTTP?

## 2 — One reference, different bases

Predict `fileBaseHref` and `directoryBaseHref`:

```sh
node inspect.mjs --reference notes --base 'https://books.example/catalog/lesson.html?lang=tr#old'
node inspect.mjs --reference notes --base 'https://books.example/catalog/lesson/'
```

Explain the final slash. The parser does not establish whether lesson.html is a disk file. Then try `/notes` and `../notes` with both bases: explain root-relative versus parent-relative resolution and why this is not filesystem access.

## 3 — Query-only and fragment-only

Predict `queryHref` and `fragmentHref`:

```sh
node inspect.mjs --reference '?lang=en' --base 'https://books.example/catalog/lesson.html?lang=tr#old'
node inspect.mjs --reference '#new' --base 'https://books.example/catalog/lesson.html?lang=tr#old'
```

Name the components retained or replaced. Has the calculation established that a server resource exists?

## 4 — Origins and sites answer different questions

Predict the comparison fields separately:

```sh
node inspect.mjs --left 'https://app.example.com/catalog' --right 'https://api.example.com/catalog'
node inspect.mjs --left 'https://app.example.com/catalog' --right 'https://app.example.com:8443/catalog'
node inspect.mjs --left 'https://app.example.com/catalog' --right 'http://app.example.com/catalog'
```

Fill `apiSameOrigin`, `apiSameSite`, `portSameOrigin`, `portSameSite`, and `schemeSameSite`. Why can two pairs be same-site but cross-origin? Does either result establish object authorization or browser response-read permission?

The site calculation uses a declared com/org fixture for three listed hosts, not a complete Public Suffix List. An unlisted host produces null/not-computed rather than a guessed site. Origin comparisons accept ordinary HTTP(S) tuples only; serialized opaque-origin null is not treated as identity.

## 5 — Encoding and local failure

```sh
node inspect.mjs --form-value 'notlar ı'
node inspect.mjs --form-value 'A+B'
node inspect.mjs --reference '/catalog/atlas'
```

Fill `formSerialized` from the first command and explain preservation of a literal plus in the second. A round trip establishes neither encryption nor permission.

Fill `missingBaseError` from the last command. Exit1 is expected because this relative reference has no base. It is not HTTP404, DNS failure, or a timeout; no network operation started. Retry with a valid base and compare the outcomes.

## Finish on your own — a new base and reference

Create a local record under `.local-results/`. Choose a new path below `https://books.example/`, once as a file-like base and once ending in `/`. Use a relative reference with a repeated `tag` query parameter and a fragment. Write the expected `href`, `pathname`, `tags`, and `httpOriginForm` before running `inspect.mjs` with your inputs.

Then choose two URLs using the listed `app.example.com` / `api.example.com` hosts. Change only a port or scheme and predict both `sameOrigin` and `sameSite` before comparing them. Finally compare a listed host with an unlisted `.example` host: distinguish a computed mismatch from a result the fixture does not compute.

Acceptance: keep the exact inputs, your original predictions, native outputs, and an explanation of any difference. Explain why the fragment is absent from the request target, why the base's trailing slash matters, and what origin/site equality cannot prove about authorization. The 17-field checker checks the original workbook only; it does not grade these new inputs. No URL in this task is contacted.

Reset by removing your local record; shared sources do not need changes.

## Self-check and evidence

Run `node checker.mjs predictions.json`. The checker reports match/different/missing for 17 fields, plus unknown keys. Complete matching answers return exit0; missing or incorrect answers return exit1. This practice self-check is separate from site exams/certificates and does not independently measure understanding. Explain a mismatch before correcting it; use [HINTS](HINTS.en.md) when stuck and [SOLUTION](SOLUTION.en.md) after completing the work.

Keep predictions, a short observation record, and explanations of host/hostname, fragment/request-target, trailing slashes, origin/site, and local/network failure. Use the supplied ordinary examples rather than secrets or real target data. To reset, recreate your personal prediction file from the template without changing shared sources.
