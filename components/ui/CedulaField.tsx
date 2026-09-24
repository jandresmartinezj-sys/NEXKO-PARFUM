"use client";

import { forwardRef } from "react";

/** Valida un número de documento colombiano (cédula/NIT): solo dígitos, 5–15. */
export function isValidCedula(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 5 && digits.length <= 15;
}

/** Deja solo dígitos. */
export function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

interface CedulaFieldProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: boolean;
  id?: string;
  className?: string;
}

/**
 * Campo "Número de cédula" para el carrito. Controlado por el componente padre;
 * el valor se guarda en el carrito de Shopify como atributo del pedido (útil
 * para facturación y para el pago con Addi).
 */
export const CedulaField = forwardRef<HTMLInputElement, CedulaFieldProps>(
  function CedulaField({ value, onChange, onBlur, error, id = "cedula", className = "" }, ref) {
    return (
      <div className={className}>
        <label htmlFor={id} className="mb-1 block text-sm font-medium text-ink-primary">
          Número de cédula <span className="text-rose-scent">*</span>
        </label>
        <input
          ref={ref}
          id={id}
          name="cedula"
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(onlyDigits(e.target.value))}
          onBlur={onBlur}
          placeholder="Ej. 1234567890"
          aria-invalid={error || undefined}
          className={`w-full rounded-xl border bg-cream px-3 py-2.5 text-ink-primary outline-none transition-colors placeholder:text-ink-secondary/60 focus:ring-2 focus:ring-gold/40 ${
            error ? "border-rose-scent" : "border-subtle focus:border-gold"
          }`}
        />
        {error ? (
          <p className="mt-1 text-xs text-rose-scent">
            Ingresa tu número de cédula para continuar.
          </p>
        ) : (
          <p className="mt-1 text-xs text-ink-secondary">
            La necesitamos para tu factura y para pagos a cuotas con Addi.
          </p>
        )}
      </div>
    );
  },
);
