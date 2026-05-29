---
title: "How Computers Actually Work"
tagline: "By the end you'll never look at your laptop the same way again."
time: ""
tier: "Fundamentals"
---
---

## The Story

You've been using computers your whole life. Phones, iPads, Chromebooks, school laptops, smart TVs — all computers. You tap an icon and a thing happens. You type into a box and the screen changes. It feels like magic. It feels like the device just *knows* what to do.

It doesn't. It's not magic. There is no tiny person inside the screen. What's actually happening is much weirder, and once you see it, you can't un-see it.

A computer is a machine. A very fast machine. But it is not smart. It does not understand anything. It has no opinions. The only thing it can do — the only thing — is follow instructions, one at a time, very quickly. That's the whole job. That's the secret.

In this module you'll meet the six pieces of the machine you need to know before any other module makes sense. Then you'll learn the one rule that separates a hacker from a criminal. Then you'll learn four keyboard shortcuts that the rest of this series will quietly assume you know.

By the end you'll never look at your laptop the same way again.

---

## The Six Things You Need To Know

### 1. A computer is a machine that follows instructions very fast

Think about a recipe for cookies. The recipe says: "Mix the butter and sugar. Add the egg. Stir for two minutes." If you follow the steps exactly, in order, you get cookies. If you skip a step or do them out of order, you don't.

A computer is a cook that can follow billions of recipe steps every second. Each step is tiny — usually something like "add these two numbers" or "look at this spot in memory and tell me what's there." On their own those steps are boring. But billions of them, in the right order, can paint a picture, play a song, deliver a video call, or run a game.

The piece doing the cooking is called the **CPU** (Central Processing Unit). When someone says "the chip" or "the processor," they mean the CPU. The CPU has no idea what it's doing. It just executes one instruction after another, like a metronome that never gets tired.

That's the first big idea: the computer is fast, not clever.

---

### 2. Programs are recipes; files are ingredients

Look at your laptop. You've got photos, songs, documents, and apps. They all live on a thing called the **disk** (or "storage" or "drive"). To the disk, they are all the same kind of thing: a **file**. A file is just a bunch of numbers saved somewhere on the disk with a name.

A photo is a file. A song is a file. A document is a file. *And so are programs.* Chrome is a file. Minecraft is a file. The thing you double-click to launch an app — that's a file.

The difference is what kind of file it is. A photo file is **ingredients**: it just sits there until something opens it. A program file is a **recipe**: a list of instructions for the CPU to follow.

When you double-click a program, the computer reads the recipe off the disk, hands it to the CPU, and the CPU starts following the steps. That's it. That's "opening an app."

---

### 3. Folders and paths

The disk has millions of files on it. To stop them turning into one giant pile, the computer puts them into **folders** (sometimes called "directories"). Folders can hold files, and they can also hold other folders. So you end up with folders inside folders inside folders.

To describe exactly where a file lives, the computer uses a **path**. A path is just a list of folders separated by slashes, ending with the file's name.

```
/Users/you/Pictures/cat.jpg
```

Read that right-to-left and it makes sense: it is the file `cat.jpg`, which lives inside the folder `Pictures`, which lives inside the folder `you`, which lives inside the folder `Users`. The leading `/` means "start at the very top of the disk."

Macs and Linux machines use forward slashes (`/`). Windows uses backslashes (`\`):

```
C:\Users\you\Pictures\cat.jpg
```

Same idea, different punctuation. When you see a path in this series, don't be intimidated. It's a sentence telling you where to find a file.

---

### 4. The browser is one program among many

Chrome. Safari. Firefox. Edge. Brave. Those are all **browsers**. A browser is a program — a recipe — whose job is to talk to other computers over the internet and show you what they send back. That is all a browser does.

Here is the part most people get wrong: a browser is *not* the internet. The internet is the giant network of cables and wireless signals connecting every computer on Earth. Your browser is a program that *talks to* the internet. You can have Chrome and Firefox both installed at the same time. They will both show you the same web pages, because they are both pointing at the same internet.

When this series asks you to "open the browser," it means: launch the program — Chrome, Safari, whichever — that lets you visit web pages. It does not mean any specific brand. Use whatever you have.

---

### 5. A server is just another computer

When you open a webpage, your browser sends a question across the internet, and another computer somewhere sends an answer back. That other computer is called a **server**.

A server is not a special, mysterious super-machine. It is a regular computer — same parts as your laptop — sitting in a building somewhere, with no screen attached, waiting for questions. When a question comes in (like "send me the YouTube homepage"), the server sends an answer back (the page).

Servers usually live in big rooms full of other servers, called **data centres**. They run 24 hours a day, 7 days a week. Your laptop could technically be a server too — there's nothing magic about the hardware. The word "server" is a job description, not a kind of machine.

---

### 6. Source code vs. running program

The recipe for cookies, written on paper, is not the same thing as a plate of cookies. One is the instructions; the other is the result of following them.

Computers have the same split. The instructions, written down for humans to read, are called **source code**. Source code is just text — letters, numbers, symbols — saved in a file. You can open it and read it.

When you double-click a program, the computer reads the source code (or a translated version of it) and *follows* the instructions. The thing on your screen, doing things, is now a **running program** (also called a **process**).

So: source code = the recipe. Running program = the meal being made. They are connected, but they are not the same thing. In later modules, you'll learn to read source code to figure out how a program works — and sometimes, to find the flag hidden inside it.

---

## The Ethics Section — One Rule, Three Scenarios

Before you go further, you need the rule. Everything in this series — every challenge, every skill — depends on it.

> **Just because you *can* do something, doesn't mean you *should*.**

Here are three situations to think about:

**Scenario 1 — The Instagram joke.** Your friend gave you their Instagram password as a joke. Should you log in?

> **No.** A password is permission for one person. It does not transfer when shared. Even if your friend laughs about it, logging in to someone else's account — any account — is wrong, and in many places it is illegal. The right move is to give the password back and tell them to change it.

**Scenario 2 — The school website bug.** You notice that the school's grade portal lets you see other students' grades by changing one number in the URL. What do you do?

> **Tell a teacher or the school's IT person privately.** Don't post it. Don't show friends. Don't use it. Real cybersecurity professionals get paid to find bugs exactly like this one — but they always report them to the people responsible for the system. Doing the same thing without authorisation, even "just to look," can get you suspended, expelled, or worse.

**Scenario 3 — The diary file.** Your sister left her diary file open on the family computer. You can see it. Do you read it?

> **No, even though you can.** This is the most important rule in security: *can* is not *should*. A computer will let you do all kinds of things it shouldn't. Your job, as someone who is learning real skills, is to decide what is right — not to test what is possible.

You will be tempted, eventually. Everybody is. The line between curious kid and criminal is the rule above. Memorise it.

---

## Keyboard Shortcuts You'll Need

The rest of this series uses these constantly. Learn them now.

| Shortcut (Windows/Linux) | Shortcut (Mac) | What it does |
|---|---|---|
| `Ctrl + U` | `Cmd + Option + U` | View page source — see the raw code behind any webpage |
| `Ctrl + F` | `Cmd + F` | Find — search for text on the current page |
| `Ctrl + Shift + I` | `Cmd + Option + I` | Open Developer Tools (DevTools) |
| `Ctrl + C` / `Ctrl + V` | `Cmd + C` / `Cmd + V` | Copy and paste |

`Ctrl + F` and `View Source` will be your two most-used tools from F04 onward. Practise them now.

---

## Your Challenge — The Computer Tour

Open `challenge/index.html`. You'll see a faux desktop with six zones. Click each one, answer one short question, and you'll get the next zone unlocked. When all six are answered, the flag will be revealed.

One of the zones will force you to use `Ctrl + F` to search a long block of text. That's on purpose — by the time you finish this module, that shortcut will be in your fingers.

---

## Concept Card

See `concept-cards.md` for the full quick reference.

---

## Keep Going

**Coming up:** F01 — The Postman Problem teaches you how the internet actually delivers a webpage from a server to your browser. Now that you know what those words mean, the rest of the series unlocks.
