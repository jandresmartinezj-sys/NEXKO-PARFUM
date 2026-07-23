import type { Metadata } from "next";
import { LegalLayout } from "@/components/ui/LegalLayout";

export const metadata: Metadata = {
  title: "Aviso legal",
  description:
    "Identidad, propiedad intelectual, marcas y tratamiento de datos personales de NEXKO PARFUM.",
};

export default function Page() {
  return (
    <LegalLayout title="Aviso legal" updated="Julio de 2026">
      <h2>Identificación del responsable</h2>
      <p>
        <strong>NEXKO GROUP S.A.S.</strong> — marca <strong>NEXKO PARFUM</strong>
        <br />
        NIT: 902.034.652-0
        <br />
        Representante legal: José Andrés Martínez Jiménez (C.C. 1.062.427.484)
        <br />
        Domicilio: Montería, Córdoba, Colombia
        <br />
        Correo: servicioalcliente@nexkogroup.com
        <br />
        Sitio web: www.nexkogroup.com
      </p>

      <h2>Naturaleza de los productos</h2>
      <p>
        NEXKO PARFUM comercializa <strong>fragancias de inspiración premium y alternativas de
        autor</strong>. <strong>No somos distribuidores oficiales</strong> de las marcas de
        diseñador mencionadas en el sitio. Las marcas, nombres comerciales y logotipos de
        terceros (Dior, Paco Rabanne, Carolina Herrera, Chanel, Lattafa, entre otros) son
        propiedad de sus respectivos dueños y se citan únicamente con fines descriptivos y de
        referencia olfativa. Su mención no implica afiliación, patrocinio ni respaldo por parte
        de dichas marcas.
      </p>

      <h2>Propiedad intelectual del sitio</h2>
      <p>
        El logotipo NEXKO PARFUM, el diseño, la estructura, los textos y demás elementos propios
        del sitio están protegidos por las normas de propiedad intelectual y son de titularidad
        de NEXKO PARFUM. Queda prohibida su reproducción total o parcial sin autorización previa
        y escrita.
      </p>

      <h2>Tratamiento de datos personales (Habeas Data)</h2>
      <p>
        En cumplimiento de la <strong>Ley 1581 de 2012</strong> y el Decreto 1377 de 2013,
        informamos:
      </p>
      <ul>
        <li>
          <strong>Responsable:</strong> NEXKO GROUP S.A.S. Contacto:{" "}
          servicioalcliente@nexkogroup.com.
        </li>
        <li>
          <strong>Finalidad:</strong> gestionar tus pedidos, procesar pagos, coordinar envíos,
          brindar soporte y, con tu autorización, enviarte información comercial y promociones.
        </li>
        <li>
          <strong>Datos recolectados:</strong> nombre, documento, dirección, teléfono, correo
          electrónico y datos de la compra. No almacenamos datos de tarjetas de crédito.
        </li>
        <li>
          <strong>Tus derechos:</strong> conocer, actualizar, rectificar y suprimir tus datos, y
          revocar la autorización, escribiéndonos al correo indicado.
        </li>
      </ul>

      <h2>Cookies</h2>
      <p>
        El sitio puede utilizar cookies y tecnologías similares para mejorar tu experiencia y,
        cuando estén activas, para fines analíticos y de marketing. Puedes gestionarlas desde tu
        navegador.
      </p>

      <h2>Modificaciones</h2>
      <p>
        NEXKO PARFUM podrá actualizar este aviso legal en cualquier momento. La versión vigente
        es la publicada en esta página.
      </p>
    </LegalLayout>
  );
}
