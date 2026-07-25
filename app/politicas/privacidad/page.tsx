import type { Metadata } from "next";
import { LegalLayout } from "@/components/ui/LegalLayout";

export const metadata: Metadata = {
  title: "Política de privacidad y tratamiento de datos",
  description:
    "Cómo NEXKO PARFUM recolecta, usa, comparte y protege tus datos personales conforme a la Ley 1581 de 2012 (Habeas Data).",
};

export default function Page() {
  return (
    <LegalLayout title="Política de privacidad y tratamiento de datos" updated="Julio de 2026">
      <p>
        En <strong>NEXKO PARFUM</strong> (marca de <strong>NEXKO GROUP S.A.S.</strong>) protegemos
        tu información personal. Esta política explica qué datos recolectamos, con qué fines, con
        quién los compartimos y cómo puedes ejercer tus derechos, en cumplimiento de la{" "}
        <strong>Ley 1581 de 2012</strong>, el <strong>Decreto 1377 de 2013</strong> y demás normas
        colombianas de protección de datos. Al usar <strong>www.nexkogroup.com</strong> y
        entregarnos tus datos, aceptas el tratamiento descrito aquí.
      </p>

      <h2>1. Responsable del tratamiento</h2>
      <p>
        <strong>NEXKO GROUP S.A.S.</strong>
        <br />
        NIT: 902.034.652-0
        <br />
        Domicilio: Montería, Córdoba, Colombia
        <br />
        Correo: servicioalcliente@nexkogroup.com
        <br />
        WhatsApp: +57 311 707 3395
      </p>

      <h2>2. Datos que recolectamos</h2>
      <p>
        <strong>a) Que nos entregas directamente:</strong>
      </p>
      <ul>
        <li>Identificación y contacto: nombre, documento, teléfono, correo electrónico.</li>
        <li>
          Datos del pedido: dirección de envío y facturación, productos comprados, confirmación de
          pago.
        </li>
        <li>Comunicaciones que nos envías por WhatsApp, Instagram, correo o formularios.</li>
      </ul>
      <p>
        <strong>b) Que se recolectan automáticamente</strong> mediante cookies y tecnologías
        similares: dirección IP, tipo de dispositivo y navegador, páginas visitadas, productos
        vistos e interacción con el sitio.
      </p>
      <p>
        <strong>c) Que recibimos de terceros:</strong> confirmaciones de nuestra pasarela de pago y
        de la plataforma de comercio que soporta la tienda.{" "}
        <strong>No almacenamos los datos de tu tarjeta</strong> — los procesa directamente la
        pasarela.
      </p>

      <h2>3. Finalidades del tratamiento</h2>
      <ul>
        <li>Procesar, despachar y hacer seguimiento a tus pedidos.</li>
        <li>Gestionar pagos, facturación, cambios, devoluciones y garantías.</li>
        <li>Brindarte soporte y atención al cliente.</li>
        <li>
          Con tu autorización, enviarte información comercial, promociones y novedades por correo,
          WhatsApp o SMS.
        </li>
        <li>Prevenir fraude y proteger la seguridad de la tienda y de nuestros clientes.</li>
        <li>Analizar y mejorar la experiencia de compra y el desempeño del sitio.</li>
        <li>Cumplir obligaciones legales, contables y tributarias.</li>
      </ul>

      <h2>4. Cookies y tecnologías de seguimiento</h2>
      <p>Nuestro sitio utiliza cookies y píxeles de tres tipos:</p>
      <ul>
        <li>
          <strong>Esenciales:</strong> necesarias para el carrito, el inicio de sesión y el
          checkout. Sin ellas la tienda no funciona.
        </li>
        <li>
          <strong>Analíticas:</strong> usamos <strong>Google Analytics 4</strong> para entender el
          tráfico y mejorar el sitio de forma agregada.
        </li>
        <li>
          <strong>Marketing:</strong> usamos el <strong>Meta Pixel</strong> (Facebook/Instagram)
          para medir y optimizar nuestra publicidad y mostrarte anuncios relevantes.
        </li>
      </ul>
      <p>
        Puedes eliminar o bloquear las cookies desde la configuración de tu navegador; ten en cuenta
        que deshabilitar las esenciales puede afectar el funcionamiento del sitio. Respetamos la
        señal <strong>Control Global de Privacidad (GPC)</strong> como solicitud válida de exclusión
        de cookies de marketing cuando tu navegador la envía.
      </p>

      <h2>5. Con quién compartimos tus datos</h2>
      <p>
        No vendemos tu información. La compartimos únicamente con aliados que nos permiten operar,
        bajo obligaciones de confidencialidad:
      </p>
      <ul>
        <li>
          <strong>Transportadoras</strong> (Servientrega, Coordinadora, Interrapidísimo, Envía) para
          entregar tus pedidos.
        </li>
        <li>
          <strong>Pasarela de pago (BOLD)</strong> y la plataforma de comercio (<strong>Shopify</strong>)
          para procesar transacciones y alojar la tienda.
        </li>
        <li>
          <strong>Meta Platforms</strong> (Facebook/Instagram) y <strong>Google</strong> para medición
          y publicidad, conforme a sus propias políticas.
        </li>
        <li>Autoridades competentes cuando la ley lo exija.</li>
      </ul>

      <h2>6. Datos de menores de edad</h2>
      <p>
        Nuestra tienda está dirigida a mayores de edad. No recolectamos de forma consciente datos de
        menores. Si un padre o tutor detecta que un menor nos entregó información, puede escribirnos
        para eliminarla.
      </p>

      <h2>7. Seguridad y conservación</h2>
      <p>
        Aplicamos medidas técnicas y administrativas razonables para proteger tus datos. Ningún
        sistema es completamente infalible, por lo que no podemos garantizar seguridad absoluta.
        Conservamos tu información mientras exista la relación comercial y por los plazos que exijan
        las normas contables, tributarias y de protección al consumidor; luego la eliminamos o
        anonimizamos.
      </p>

      <h2>8. Tus derechos (Habeas Data)</h2>
      <p>Como titular de tus datos tienes derecho a:</p>
      <ul>
        <li><strong>Conocer, actualizar y rectificar</strong> tus datos personales.</li>
        <li>
          Solicitar prueba de la autorización otorgada, salvo cuando la ley no la requiera.
        </li>
        <li>Ser informado sobre el uso que damos a tus datos.</li>
        <li>
          <strong>Revocar la autorización</strong> y/o solicitar la <strong>supresión</strong> de tus
          datos cuando no exista un deber legal o contractual de conservarlos.
        </li>
        <li>Solicitar copia de tus datos y oponerte a su tratamiento con fines de marketing.</li>
        <li>Presentar quejas ante la Superintendencia de Industria y Comercio (SIC).</li>
      </ul>
      <p>
        Para ejercerlos, escríbenos a <strong>servicioalcliente@nexkogroup.com</strong>. Podremos
        pedirte que verifiques tu identidad. Atenderemos las <strong>consultas</strong> en un máximo
        de <strong>diez (10) días hábiles</strong> y los <strong>reclamos</strong> en un máximo de{" "}
        <strong>quince (15) días hábiles</strong>, prorrogables en los términos de ley.
      </p>

      <h2>9. Reclamaciones ante la autoridad</h2>
      <p>
        Si no estás conforme con nuestra respuesta, puedes presentar tu reclamación ante la{" "}
        <strong>Superintendencia de Industria y Comercio (SIC)</strong>, autoridad de protección de
        datos en Colombia (www.sic.gov.co).
      </p>

      <h2>10. Transferencia internacional de datos</h2>
      <p>
        Algunos de nuestros proveedores (por ejemplo, plataforma de tienda, analítica y publicidad)
        procesan información en servidores fuera de Colombia. Al usar el sitio autorizas esta
        transferencia internacional, la cual se realiza con proveedores que ofrecen niveles adecuados
        de protección conforme a la normativa aplicable.
      </p>

      <h2>11. Vigencia y cambios</h2>
      <p>
        Esta política rige desde su publicación y puede actualizarse en cualquier momento. Los
        cambios se publicarán en esta página con su nueva fecha de actualización. Consulta también
        nuestro <a href="/politicas/aviso-legal">Aviso legal</a>.
      </p>

      <h2>12. Contacto</h2>
      <p>
        Dudas sobre esta política o sobre tus datos: <strong>servicioalcliente@nexkogroup.com</strong>{" "}
        · WhatsApp{" "}
        <a href="https://wa.me/573117073395" target="_blank" rel="noopener noreferrer">
          +57 311 707 3395
        </a>
        .
      </p>
    </LegalLayout>
  );
}
