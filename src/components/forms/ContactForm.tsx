"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { contactForm } from "@/content/contact";
import { contact } from "@/content/site";
import { submitContact, type SubmitResult } from "@/lib/contact-client";
import { contactSchema, serviceOptions, type ContactFormValues } from "@/lib/contact-schema";

type Status = "idle" | SubmitResult;

const { labels, consent, success } = contactForm;

const labelClasses = "mb-1.5 block text-sm font-medium text-foreground";
const inputClasses =
  "w-full rounded-xl border border-muted bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted transition-colors focus:border-action focus:outline-none focus:ring-2 focus:ring-action/30";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 inline-flex rounded-md bg-error px-2 py-0.5 text-sm text-white">{message}</p>;
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (values: ContactFormValues) => {
    setStatus("idle");
    const result = await submitContact(values);
    setStatus(result);
    if (result === "success") reset();
  };

  if (status === "success") {
    return (
      <Card role="status" className="flex flex-col items-center gap-3 p-8 text-center">
        <CheckCircle2 className="text-success" size={32} />
        <p className="text-lg font-medium text-foreground">{success.title}</p>
        <p className="text-sm text-muted">{success.description}</p>
        <Button variant="secondary" onClick={() => setStatus("idle")}>
          {success.again}
        </Button>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-busy={isSubmitting} className="flex flex-col gap-4">
      <div>
        <label htmlFor="name" className={labelClasses}>
          {labels.name}
        </label>
        <input id="name" className={inputClasses} {...register("name")} />
        <FieldError message={errors.name?.message} />
      </div>

      <div>
        <label htmlFor="email" className={labelClasses}>
          {labels.email}
        </label>
        <input id="email" type="email" className={inputClasses} {...register("email")} />
        <FieldError message={errors.email?.message} />
      </div>

      <div>
        <label htmlFor="phone" className={labelClasses}>
          {labels.phone}
        </label>
        <input id="phone" className={inputClasses} {...register("phone")} />
        <FieldError message={errors.phone?.message} />
      </div>

      <div>
        <label htmlFor="service" className={labelClasses}>
          {labels.service}
        </label>
        <select id="service" className={inputClasses} {...register("service")} defaultValue="">
          <option value="">{labels.servicePlaceholder}</option>
          {serviceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>
          {labels.message}
        </label>
        <textarea id="message" rows={4} className={inputClasses} {...register("message")} />
        <FieldError message={errors.message?.message} />
      </div>

      <div aria-hidden className="sr-only">
        <label htmlFor="website">{labels.honeypot}</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div>
        <div className="flex items-start gap-3 text-sm text-foreground">
          <input
            id="consent"
            type="checkbox"
            className="mt-0.5 size-4 shrink-0 accent-action"
            {...register("consent")}
          />
          <label htmlFor="consent">
            {consent.before}
            <Link href="/privacidad" className="font-medium text-action underline underline-offset-2">
              {consent.link}
            </Link>
            {consent.after}
          </label>
        </div>
        <p className="mt-1.5 text-sm text-muted">{contactForm.privacyNote}</p>
        <FieldError message={errors.consent?.message} />
      </div>

      {status !== "idle" && (
        <div role="alert" className="flex flex-col gap-3">
          <p className="flex items-center gap-2 rounded-xl bg-error px-4 py-3 text-sm text-white">
            <AlertCircle size={18} className="shrink-0" />
            {contactForm.failure[status]}
          </p>
          <Button href={contact.whatsappHref} variant="secondary">
            <WhatsAppIcon aria-hidden className="size-5" />
            {contactForm.whatsappCta}
          </Button>
        </div>
      )}

      <Button type="submit" disabled={isSubmitting} className="justify-center">
        {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
        {isSubmitting ? contactForm.sending : contactForm.submit}
      </Button>
    </form>
  );
}
