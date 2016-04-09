---
title: Falling in Love with Web Development Again
route: /loving-web-development-again
description: "\"I've had a growing interest in accessibility lately. Screen readers, Braille keyboards, that sort of thing,\" I said, offhand."
date: 2015-08-10
---

During one of our weekly 1-on-1's, my manager [Marcia](https://twitter.com/marcia_lee) and I were speaking casually about some of the things I was interested in pursuing. I was a few months into my new job at [Khan Academy](https://khanacademy.org), building tools for teachers and parents.

"I've had a growing interest in accessibility lately. Screen readers, Braille keyboards, that sort of thing," I said, offhand.

My pal [Cassidy](https://twitter.com/cassidoo) had recently given a talk on accessibility, and I had been poking around Bootstrap's source code - seeing various mentions of this "aria" thing. It all seemed pretty nifty, but admittedly I knew *nothing* about it, just that it helped people use the software I was writing.

"Oh cool, I'll keep that in mind," replied Marcia (it was more enthusiastic than I can convey in a blog post). The rest of the walk was pretty normal - I think we saw some chickens that day.

---

Prior to starting my career, I spent a lot of my free time in college [building various things](/projects). I learned a lot this way - gaining some technical know-how, and even more non-technical skills like communication and time management.

As I got into the groove of things at work, time passed, and my interests wandered. Issues built up, discussion died down, and I became less interested in the problems my open source projects were solving.

**Because at the end of a long day of coding, writing more code isn't the most appealing thing in the world, and that's okay**. The unfortunate side-effect is that the way I used to learn technology - reckless experimentation - no longer held a significant presence in my day-to-day.

Work was going well - really well in fact. I had the opportunity to <a href="http://facebook.github.io/react/" aria-label="use cool technologies like React">use cool technologies</a> and solve interesting problems, but I wanted to make sure I still had opportunities to learn something *completely* new. At work I had to follow style guidelines and deal with deadlines, while in college I'd spend three hours reading a rails tutorial and writing a blog engine I would never use.

So, I was in a bit of a funk. I found myself reluctant to work on side projects, and was worried I wouldn't be leaving my comfort zone enough at work. I was hungry to attack something I had *zero* experience with, just like I did in between classes in college.

---

An email found its way into my inbox about six weeks later.

![Email. Subject: Invitation: Chat about accessibility @ Fri Oct 24, 2014 11:15am - 11:30am (Jordan Scales)](/img/a11y-invite.png)

Word had spread that I was interested in accessibility (thanks Marcia), and an opportunity came up to do some related work as part of a new series of projects at Khan Academy. I happily accepted, and started doing some research.

I found a [great talk on accessibility testing](https://www.youtube.com/watch?v=rxh6B3ChLIc) by Google's [Alice Boxhall](https://twitter.com/sundress). In it, she mentions [Accessibility Developer Tools](https://github.com/GoogleChrome/accessibility-developer-tools): a suite of tools for accessibility testing. "Neat! I know some of these words," I thought, and added the link to my in-progress "a11y-resources.txt".

So I played around with [OSX's built-in screen reader](https://www.apple.com/voiceover/info/guide/), learned how folks with impaired vision or motor skills relied on the keyboard, and read up on some common accessibility mistakes.

I started making blanket statements such as "These things can be completed in about a day" and "These things may take a week or more to fix." They were broad guesses, I had no idea what I was doing, and I was loving every minute of it. **Here I was, once again feeling my way around a new world of software development.** One day I'd think I knew something and the next I'd learn I was wrong.

But I pushed forward and completed a write-up (my a11y puns have gotten way better since).

![Google doc: Accessicademy: on improving the accessibility (a11y) efforts at Khan Academy (k11y)](/img/accessicademy.png)

Fun fact, not only was I terrible at accessibility, but I was also terrible at numeronyms - "Khan Academy" has *nine* letters between the K and Y (or 10 if you count the space).

---

Thus began a few weeks of accessibility fixes: trying to fix things, not fixing them correctly, then learning and re-fixing. Each day my colleague [John](http://ejohn.org) and I would share links in our "Accessibility" HipChat room, and attempt to answer each other's questions.

I realized that this sliver of software development was *far* larger than I originally thought, and it was full of well-thought-out standards as well as many unknowns. Lots of work to be done, and I was excited to dive in head-first. I started <a href="/a11y/clicking-with-a-keyboard/" aria-label="blogging: Clicking with a Keyboard - thatjdanisso.cool">blogging</a> <a href="/a11y/focus-vs-hover/" aria-label="again: Focus vs. Hover - thatjdanisso.cool">again</a>, and became overwhelmingly excited to learn and share.

We built some testing infrastructure using [Accessibility Developer Tools](https://github.com/GoogleChrome/accessibility-developer-tools), caught some bugs, caught some things that *seemed* like bugs, and started off on the monumental task of evangelizing web accessibility at Khan Academy.

There were scary moments, of course. *What if I'm doing this wrong? What if I'm spreading misinformation? What if I'm making the experience even worse for people?* But I kept an open mind, accepted the fact that mistakes would be made, and embraced my potential to figure it out.

But there was one issue that stayed in the back of my head - I felt a *disconnect* between my code and the issues it was causing. Other devs felt it too. I could preach all day about using the right tags with the right attributes, but how could I make these things more obvious? **How could I make accessibility development an interesting and informative experience?**

---

A few months later, during one of "Web Frontend" team meetings (don't worry, we don't quite know what the distinction is, either), I pitched this very idea - an interactive accessibility testing utility. I was still new to accessibility, everyone knew it, but folks agreed it seemed like an interesting idea. I didn't know what it would look like, I didn't know exactly what it would do, but I wanted to do it.

So I did it.

[![A sunglasses logo with the text "tota11y" beneath it](/img/tota11y.png)](http://khan.github.io/tota11y)

At the end of the month we released [tota11y](http://khan.github.io/tota11y) - an "accessibility visualization toolkit" - to the world, accompanied by [a post on our engineering blog](http://engineering.khanacademy.org/posts/tota11y.htm).

The response was minimal, a few bites on social media at first, but people seemed to like it.

<blockquote class="twitter-tweet" lang="en" width="590"><p lang="en" dir="ltr">Super excited to announce <a href="https://twitter.com/tota11y">@tota11y</a> – a visualization toolkit to help reduce the friction of accessibility testing <a href="http://t.co/b8B4uxHq8x">http://t.co/b8B4uxHq8x</a></p>&mdash; Jordan Scales (@jdan) <a href="https://twitter.com/jdan/status/607923883639980032">June 8, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Interestingly enough, tota11y was posted again (by someone else) to Hacker News a few weeks later, making its way to the top on a Monday morning and staying there until late in the evening.

It was incredibly energizing to see so many folks talking about accessibility, many of whom were in the same boat as I was - web developers who knew it was a *thing* but weren't sure how to approach the problem. But among those web developers were many who knew *a lot* about accessibility. They spread the word, offered advice, and provided tons of motivating feedback.

I learned a lot more from them as I went along, the most important lesson being that **everyone in this space is *so friggin' nice*. Like, seriously, *so nice*.** A bunch of approachable folks, eager to answer any question you throw at them. In my (admittedly short few) years in software, I've never come across a community as kind and welcoming.

And it makes sense, given the work that they do, but it's just such a pleasant surprise.

---

**If you're looking for some cool things to learn, I highly encourage you to experience the wild world of accessibility and its amazing community.** There's a lot of room for improvement on the web, and chances are that your skills can impact many, many people. The barrier of entry is low, the impact is high, and you can [start learning wherever you'd like](http://a11yproject.com/).

I get an incredible sense of satisfaction doing this work - whether it's running a screen reader on a new interface, adding a new feature to tota11y, or just interacting with folks in [the web-a11y slack channel](https://twitter.com/ryanflorence/status/578240236267773952). Each day brings a new challenge, and I feel empowered (and *excited*) to tackle it.

Looking back on the past twelve months, I realize how quickly new interests can come forward and how, with time and care, you can learn a lot about new things. I'm still brand new to this field, and there's *so much* more to learn, but I can't even begin to describe how excited I am for whatever's next.

I've fallen in love with web development all over again.
