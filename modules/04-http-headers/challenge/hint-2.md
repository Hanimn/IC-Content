# Hint 2

After reloading with the Network tab open, you should see two requests: one for the main page and one for **`secret.json`**.

Click **`secret.json`** in the Network tab list. Then click the **Preview** or **Response** subtab (not the Headers subtab — those are the request/response headers, which is a separate topic).

You'll see the JSON data the server returned. Read through all the fields — one of them has a value that looks encoded. It's base64.

Open the **Console** tab and run:
```javascript
atob("paste_the_data_field_value_here")
```

Combine what you get with the flag part visible on the main page.

---

*[← Hint 1](hint-1.md) | [Back to challenge](http://localhost:8080) | [Solution →](solution.md)*
