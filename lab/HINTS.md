# Hints / İpuçları

1. `hostname` port içermez; `host` non-default port içerebilir. / hostname excludes the port; host can include a non-default port.
2. Repeated query için `getAll` sonucuna bak. Fragment request target’tan ayrıdır. / Check getAll for repeated values. Keep the fragment separate from the request target.
3. Base’in current directory’si son slash’a kadar olan path’tir. / A base's current directory depends on the final slash.
4. HTTP(S) origin: scheme/host/normalized port. Domain fixture site: scheme/registrable domain. / HTTP(S) origin uses scheme/host/normalized port; this fixture's site uses scheme/registrable domain.
5. `+` space representation’ı yalnız form query bağlamında geçerlidir. / Plus represents space in this form-query context, not universally.
6. Failure’ın hangi stage’de oluştuğunu düşün. Parser bir absolute URL üretemediyse network sonucu olamaz. / Identify the failed stage. A parser that produced no absolute URL has no network result.
