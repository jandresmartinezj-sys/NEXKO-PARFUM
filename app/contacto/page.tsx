import type { Metadata } from "next";
import { LegalLayout } from "@/components/ui/LegalLayout";

export const metadata: Metadata = {
  title: "Información de contacto",
  description: "Canales de atención de NEXKO PARFUM: WhatsApp, Instagram y correo.",
};

export default function Page() {
  return (
    <LegalLayout title="Información de contacto" updated="Julio de 2026">
      <p>
        ¿Tienes dudas sobre un producto, tu pedido o quieres asesoría olfativa? Escríbenos por
        cualquiera de estos canales:
      </p>

      <h2>Canales de atención</h2>
      <ul>
        <li>
          <strong>WhatsApp:</strong>{" "}
          <a href="https://wa.me/573117073395" target="_blank" rel="noopener noreferrer">
            +57 311 707 3395
          </a>{" "}
          — el canal más rápido.
        </li>
        <li>
          <strong>Instagram:</strong>{" "}
          <a href="https://instagram.com/nexko_parfum" target="_blank" rel="noopener noreferrer">
            @nexko_parfum
          </a>
        </li>
        <li>
          <strong>Correo:</strong> servicioalcliente@nexkogroup.com
        </li>
        <li>
          <strong>Sitio web:</strong> www.nexkogroup.com
        </li>
      </ul>

      <h2>Horario de atención</h2>
      <p>Lunes a sábado, 8:00 a. m. – 6:00 p. m.</p>

      <h2>Ubicación</h2>
      <p>
        Tienda 100% en línea. Despachamos desde <strong>Montería, Córdoba</strong> hacia toda
        Colombia.
      </p>

      <h2>Datos de la empresa</h2>
      <p>
        <strong>NEXKO GROUP S.A.S.</strong> — NIT 902.034.652-0. Consulta nuestro{" "}
        <a href="/politicas/aviso-legal">Aviso legal</a>.
      </p>
    </LegalLayout>
  );
}
