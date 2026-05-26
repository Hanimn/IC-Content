# Hint 2

For Level 3: the key is the `!` character. ASCII decimal 33, hex `0x21`. Type `!` in the key input and click **Decode** — XOR will undo itself and reveal the message.

Remember: the same key that encrypted it will decrypt it. That is the self-inverse property in action. `ciphertext XOR key = plaintext`, just as `plaintext XOR key = ciphertext`.

If you want to verify before using the input box, open your browser console (F12 → Console) and try:

```javascript
let key = 0x21;
let cipher = [0x67, 0x6D, 0x60, 0x66, 0x5A];
cipher.map(b => String.fromCharCode(b ^ key)).join('');
```

You should see the first five characters of the flag.

---

*[← Hint 1](hint-1.md) | [Back to challenge](index.html) | [Solution →](solution.md)*
