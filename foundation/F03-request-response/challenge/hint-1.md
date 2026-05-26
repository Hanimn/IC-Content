# Hint 1 — F03 Challenge

Stuck? Here are some gentle nudges. Try each question on its own before reading the hint for it.

---

## Question 1: HTTP Method in Exchange 2

Look at the very first line of Exchange 2's request. An HTTP request always starts with the method, then the path, then the protocol version.

The first word of that line *is* the method.

---

## Question 2: Status Code in Exchange 3

Look at the very first line of Exchange 3's response. An HTTP response always starts with the protocol version, then the status code, then the reason phrase.

The middle number on that first line *is* the status code.

---

## Question 3: The Complete Flag

The flag has been split into two fragments. Look carefully at **all** the response headers in each exchange — not just the familiar ones like `Content-Type` and `Server`.

Custom headers starting with `X-` often carry interesting data. CTF challenges frequently hide flags in exactly this kind of header.

---

[hint-2.md →](hint-2.md) | [solution.md →](solution.md)
