import type { Metadata } from "next";
import { LegalLayout } from "@/components/ui/LegalLayout";

export const metadata: Metadata = {
  title: "Política de envío",
  description: "Cobertura, tiempos y costos de envío de NEXKO PARFUM en toda Colombia.",
};

export default function Page() {
  return (
    <LegalLayout title="Política de envío" updated="Julio de 2026">
      <p>
        En <strong>NEXKO PARFUM</strong> realizamos envíos a <strong>toda Colombia</strong>.
        A continuación encontrarás las condiciones de nuestros despachos.
      </p>

      <h2>Cobertura</h2>
      <p>
        Enviamos a todas las ciudades y municipios del territorio nacional a través de
        empresas transportadoras aliadas —<strong>Servientrega, Coordinadora, Interrapidísimo
        y Envía</strong>—, seleccionando la más adecuada según la zona de destino.
      </p>

      <h2>Tiempos de entrega</h2>
      <ul>
        <li><strong>Ciudades principales:</strong> 1 a 3 días hábiles.</li>
        <li><strong>Ciudades intermedias y municipios:</strong> 3 a 6 días hábiles.</li>
        <li><strong>Zonas apartadas:</strong> hasta 8 días hábiles.</li>
      </ul>
      <p>
        Los pedidos se procesan en un plazo de <strong>1 a 2 días hábiles</strong> después de
        confirmado el pago. Los tiempos se cuentan a partir del despacho y pueden variar por
        factores ajenos a nosotros (clima, orden público, temporadas de alta demanda).
      </p>

      <h2>Costos de envío</h2>
      <ul>
        <li>
          <strong>Envío gratis</strong> en compras iguales o superiores a{" "}
          <strong>$250.000 COP</strong>.
        </li>
        <li>
          Para compras menores, el costo de envío es de <strong>$19.000 COP</strong> y se
          muestra al finalizar la compra.
        </li>
      </ul>

      <h2>Pago contra entrega</h2>
      <p>
        Ofrecemos <strong>pago contra entrega únicamente en la ciudad de Montería</strong>.
        Para el resto del país, el pago se realiza de forma anticipada a través de nuestros
        medios de pago en línea.
      </p>

      <h2>Seguimiento del pedido</h2>
      <p>
        Una vez despachado tu pedido, recibirás el número de guía de la transportadora para
        que hagas seguimiento. Si tienes dudas, escríbenos por{" "}
        <a href="https://wa.me/573117073395" target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
        .
      </p>

      <h2>Pedidos no entregados</h2>
      <p>
        Si la transportadora no logra entregar tras varios intentos por datos incorrectos o
        ausencia del destinatario, el pedido regresa a nuestra bodega. Nos comunicaremos para
        coordinar un nuevo envío, cuyo costo podrá estar a cargo del cliente.
      </p>
    </LegalLayout>
  );
}
