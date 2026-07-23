import type { Metadata } from "next";
import { LegalLayout } from "@/components/ui/LegalLayout";

export const metadata: Metadata = {
  title: "Términos del Servicio",
  description: "Condiciones de uso de la tienda en línea NEXKO PARFUM.",
};

export default function Page() {
  return (
    <LegalLayout title="Términos del Servicio" updated="Julio de 2026">
      <p>
        Al navegar y comprar en <strong>www.nexkogroup.com</strong> (en adelante, el “Sitio”),
        aceptas los presentes Términos del Servicio. Si no estás de acuerdo, por favor no
        utilices el Sitio.
      </p>

      <h2>1. Identificación</h2>
      <p>
        El Sitio es operado por <strong>NEXKO GROUP S.A.S.</strong> (NIT 902.034.652-0),
        titular de la marca NEXKO PARFUM, con domicilio en <strong>Montería, Córdoba,
        Colombia</strong>. Representante legal: José Andrés Martínez Jiménez (C.C. 1.062.427.484).
      </p>

      <h2>2. Productos y disponibilidad</h2>
      <p>
        Ofrecemos perfumería de inspiración premium y alternativas de autor. Las imágenes son
        de referencia y pueden variar levemente del producto físico. La disponibilidad está
        sujeta a existencias; si un producto se agota tras tu compra, te contactaremos para
        reponer o reembolsar.
      </p>

      <h2>3. Precios y pagos</h2>
      <ul>
        <li>Todos los precios están expresados en <strong>pesos colombianos (COP)</strong> e incluyen impuestos cuando aplique.</li>
        <li>Nos reservamos el derecho de modificar precios sin previo aviso; el precio válido es el vigente al momento de finalizar la compra.</li>
        <li>
          Los pagos se procesan mediante la pasarela <strong>BOLD</strong> y otros medios
          habilitados. NEXKO PARFUM no almacena los datos de tu tarjeta.
        </li>
      </ul>

      <h2>4. Proceso de compra</h2>
      <p>
        Una vez confirmado el pago, recibirás una confirmación del pedido. El contrato de compra
        se perfecciona en ese momento. Consulta nuestras políticas de{" "}
        <a href="/politicas/envios">envío</a> y{" "}
        <a href="/politicas/devoluciones">devoluciones</a>.
      </p>

      <h2>5. Uso del Sitio</h2>
      <p>
        Te comprometes a usar el Sitio de forma lícita y a no realizar actividades que afecten
        su funcionamiento, seguridad o la de otros usuarios. La información que suministres debe
        ser veraz y actualizada.
      </p>

      <h2>6. Propiedad intelectual</h2>
      <p>
        El diseño, los textos, el logotipo y demás contenidos del Sitio son propiedad de NEXKO
        PARFUM y no pueden reproducirse sin autorización. Las marcas de terceros mencionadas son
        propiedad de sus respectivos dueños; ver nuestro{" "}
        <a href="/politicas/aviso-legal">Aviso legal</a>.
      </p>

      <h2>7. Limitación de responsabilidad</h2>
      <p>
        NEXKO PARFUM no será responsable por daños indirectos derivados del uso del Sitio o de
        retrasos imputables a terceros (transportadoras, pasarelas de pago o fuerza mayor),
        salvo lo dispuesto por la ley.
      </p>

      <h2>8. Tratamiento de datos personales</h2>
      <p>
        El tratamiento de tus datos se rige por la <strong>Ley 1581 de 2012</strong> y se
        describe en nuestro <a href="/politicas/aviso-legal">Aviso legal</a>.
      </p>

      <h2>9. Ley aplicable</h2>
      <p>
        Estos términos se rigen por las leyes de la República de Colombia. Cualquier
        controversia se resolverá ante las autoridades competentes del país.
      </p>

      <h2>10. Contacto</h2>
      <p>
        Para cualquier consulta, visita nuestra página de{" "}
        <a href="/contacto">contacto</a>.
      </p>
    </LegalLayout>
  );
}
