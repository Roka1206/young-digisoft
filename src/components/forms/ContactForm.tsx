"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { contactSchema, serviceOptions, type ContactFormValues } from "@/lib/contact-schema";

type Status = "idle" | "success" | "error";

const inputClasses =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30";

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
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("request-failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-8 text-center">
        <CheckCircle2 className="text-brand" size={32} />
        <p className="font-heading text-lg text-foreground">¡Mensaje enviado!</p>
        <p className="text-sm text-muted">Te responderemos lo antes posible.</p>
        <Button variant="secondary" onClick={() => setStatus("idle")}>
          Enviar otro mensaje
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
          Nombre
        </label>
        <input id="name" className={inputClasses} {...register("name")} />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
          Email
        </label>
        <input id="email" type="email" className={inputClasses} {...register("email")} />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-foreground">
          Teléfono (opcional)
        </label>
        <input id="phone" className={inputClasses} {...register("phone")} />
        {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
      </div>

      <div>
        <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-foreground">
          Servicio de interés (opcional)
        </label>
        <select id="service" className={inputClasses} {...register("service")} defaultValue="">
          <option value="">Selecciona un servicio</option>
          {serviceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
          Mensaje
        </label>
        <textarea id="message" rows={4} className={inputClasses} {...register("message")} />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
          <AlertCircle size={18} />
          No se pudo enviar el mensaje. Inténtalo de nuevo o escríbenos por WhatsApp.
        </div>
      )}

      <Button type="submit" disabled={isSubmitting} className="justify-center">
        {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
        {isSubmitting ? "Enviando..." : "Enviar mensaje"}
      </Button>
    </form>
  );
}
