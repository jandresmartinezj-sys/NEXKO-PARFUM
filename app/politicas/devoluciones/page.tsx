import type { Metadata } from "next";
import { LegalLayout } from "@/components/ui/LegalLayout";

export const metadata: Metadata = {
  title: "Política de devoluciones y reembolsos",
  description:
    "Derecho de retracto, garantía legal y proceso de devolución en NEXKO PARFUM.",
};

export default function Page() {
  return (
    <LegalLayout title="Devoluciones y reembolsos" updated="Julio de 2026">
      <p>
        En <strong>NEXKO PARFUM</strong> queremos que compres con total confianza. Esta
        política se rige por la <strong>Ley 1480 de 2011 (Estatuto del Consumidor)</strong> de
        Colombia.
      </p>

      <h2>Derecho de retracto</h2>
      <p>
        Al ser una venta a distancia, tienes derecho a retractarte de tu compra dentro de los{" "}
        <strong>cinco (5) días hábiles</strong> siguientes a la entrega del producto, sin
        necesidad de justificación (Art. 47, Ley 1480 de 2011).
      </p>
      <p>Para ejercer el retracto, el producto debe estar:</p>
      <ul>
        <li><strong>Sin abrir, sin usar</strong> y con el sello o celofán original intacto.</li>
        <li>En su empaque original, con todos sus accesorios y etiquetas.</li>
        <li>En condiciones de ser vendido nuevamente.</li>
      </ul>
      <p>
        Por razones de <strong>higiene y salubridad</strong>, los perfumes cuyo empaque de
        seguridad haya sido abierto o que muestren señales de uso no admiten retracto, salvo
        que presenten un defecto de calidad.
      </p>
      <p>
        Aceptado el retracto, te devolveremos el dinero pagado en un plazo máximo de{" "}
        <strong>treinta (30) días calendario</strong>. Los costos de transporte del retorno
        corren por cuenta del cliente.
      </p>

      <h2>Garantía legal (producto defectuoso)</h2>
      <p>
        Si recibes un producto <strong>dañado, incompleto o diferente al comprado</strong>,
        cuentas con la garantía legal. Escríbenos dentro de los{" "}
        <strong>cinco (5) días</strong> siguientes a la entrega adjuntando fotos o video del
        producto y del empaque. Según el caso, podrás elegir entre:
      </p>
      <ul>
        <li>Cambio por el mismo producto.</li>
        <li>Reposición por otro de igual valor.</li>
        <li>Reembolso del valor pagado.</li>
      </ul>

      <h2>Cambios</h2>
      <p>
        Aceptamos cambios por otra referencia siempre que el producto cumpla las condiciones de
        la sección de retracto. La diferencia de precio, si la hay, y el costo de envío del
        cambio están a cargo del cliente.
      </p>

      <h2>Productos que no admiten devolución</h2>
      <ul>
        <li>Perfumes, body sprays o sets con el sello de seguridad abierto o usados.</li>
        <li>Productos en promoción marcados como venta final <mark>[si aplica]</mark>.</li>
      </ul>

      <h2>¿Cómo solicito una devolución?</h2>
      <p>
        Escríbenos por{" "}
        <a href="https://wa.me/573117073395" target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>{" "}
        con tu número de pedido y el motivo. Te indicaremos los pasos y la dirección de retorno.
      </p>
    </LegalLayout>
  );
}
