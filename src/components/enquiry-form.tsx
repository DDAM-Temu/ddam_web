"use client";

import { useState } from "react";
import { ArrowRight } from "@/components/icons";
import { CORPORATE } from "@/lib/content";

/**
 * The enquiry as a sentence the reader completes, rather than a stack of
 * labelled boxes. Same idea as a form, far lower activation energy: the page
 * has already started the message and it only needs finishing.
 *
 * It composes a `mailto:` rather than posting anywhere, and that is the point
 * rather than a shortcut. A posted form needs a destination inbox, a spam
 * strategy and a privacy notice, none of which are decided — this needs none
 * of the three, because nothing reaches us until the reader sends the mail
 * themselves from their own client. It also means there is no consent
 * checkbox: we collect nothing at this step, and there is no privacy policy
 * page to point one at yet. When a real endpoint exists, `send` is the only
 * function that has to change.
 *
 * Without JavaScript the sentence still reads and the address is still on the
 * page beside it, so nobody is stranded — the compose step is the only thing
 * that needs the script.
 */
export function EnquiryForm() {
  const [name, setName] = useState("");
  const [intent, setIntent] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const send = (event: React.FormEvent) => {
    event.preventDefault();
    const body = [
      `Hello ${CORPORATE.shortName},`,
      "",
      `My name is ${name} and I would like to ${intent}`,
      "",
      `You can reach me at ${email}${phone ? ` or on ${phone}` : ""}.`,
    ].join("\n");

    window.location.href =
      `mailto:${CORPORATE.email}` +
      `?subject=${encodeURIComponent(`Enquiry from ${name}`)}` +
      `&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={send} className="flex flex-col gap-9">
      <p className="enq-line">
        Hello {CORPORATE.shortName}, my name is{" "}
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="enq-blank"
          size={14}
          aria-label="Your name"
          placeholder="your name"
          autoComplete="name"
        />
      </p>

      <p className="enq-line">
        and I would like to{" "}
        <textarea
          required
          rows={1}
          value={intent}
          onChange={(e) => setIntent(e.target.value)}
          className="enq-blank enq-blank-grow"
          aria-label="What you would like to do"
          placeholder="build something with AI, data or marketing…"
        />
      </p>

      <p className="enq-line enq-line-small">
        You can reach me at{" "}
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="enq-blank"
          size={18}
          aria-label="Your email address"
          placeholder="you@company.com"
          autoComplete="email"
        />{" "}
        or on{" "}
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="enq-blank"
          size={14}
          aria-label="Your phone number (optional)"
          placeholder="optional"
          autoComplete="tel"
        />
      </p>

      <div className="mt-1 flex flex-wrap items-center gap-x-7 gap-y-3">
        <button
          type="submit"
          className="shine flex w-fit items-center gap-2.5 bg-accent px-8 py-[17px] text-[15px] font-semibold text-ink"
        >
          Send it
          <ArrowRight size={15} />
        </button>
        <p className="max-w-[330px] text-[13px] leading-[1.6] text-faint">
          Opens in your own mail app, addressed to {CORPORATE.email} — nothing
          is sent until you press send there.
        </p>
      </div>
    </form>
  );
}
