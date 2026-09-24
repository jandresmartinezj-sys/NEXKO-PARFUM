/**
 * Widget promocional de Addi ("Paga a cuotas con Addi").
 *
 * Se renderiza como un <script> NATIVO en el HTML del servidor (no con
 * next/script). Es imprescindible: el bundle de Addi lee su configuración con
 * `document.currentScript`, que queda `null` cuando el script se inserta
 * dinámicamente (next/script) — por eso antes cargaba pero no arrancaba. Al
 * emitir el tag en el HTML, el navegador lo parsea de forma nativa,
 * `currentScript` apunta al tag y el bundle puede leer data-ally-slug,
 * data-element-reference, etc.
 *
 * Debe colocarse DESPUÉS del precio (`.addi-price-anchor`) en el DOM, para que
 * ese elemento ya exista cuando el bundle se ejecute.
 *
 * El ally-slug y el id NO son secretos (viajan en el HTML), así que se dejan por
 * defecto y se pueden sobreescribir por variables de entorno:
 *   NEXT_PUBLIC_ADDI_ALLY_SLUG · NEXT_PUBLIC_ADDI_ID · NEXT_PUBLIC_ADDI_WIDGET_SRC
 */

const ALLY_SLUG =
  process.env.NEXT_PUBLIC_ADDI_ALLY_SLUG ?? "nexkoparfumstore-ecommerce";
const ADDI_ID = process.env.NEXT_PUBLIC_ADDI_ID ?? "nexkoparfumstore";
const WIDGET_SRC =
  process.env.NEXT_PUBLIC_ADDI_WIDGET_SRC ??
  "https://statics.addi.com/shopify/js/shopify-co-widget-wrapper.bundle.min.js";

/** Clase que marca un precio para que Addi inyecte el mensaje de cuotas al lado. */
export const ADDI_PRICE_ANCHOR_CLASS = "addi-price-anchor";

/**
 * Script nativo del widget de Addi. Renderízalo en un componente de servidor,
 * después del bloque de precio.
 */
export function AddiWidgetScript() {
  if (!ALLY_SLUG) return null;
  return (
    <script
      src={WIDGET_SRC}
      async
      data-name="shopifyAddiWidget"
      data-id={ADDI_ID}
      data-ally-slug={ALLY_SLUG}
      data-element-reference={`.${ADDI_PRICE_ANCHOR_CLASS}`}
    />
  );
}
