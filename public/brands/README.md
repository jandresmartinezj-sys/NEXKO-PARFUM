# Logos de marcas (cinta del home)

Suelta aquí un archivo por marca. El componente `components/sections/BrandsMarquee.tsx`
los detecta solo: **si el archivo existe muestra el logo; si no, muestra el nombre en texto.**

## Formato
- Sirve **logo negro sobre fondo blanco** (una captura normal) **o PNG/SVG transparente**.
  El CSS aplica `invert` + `mix-blend-screen`: el fondo blanco se elimina solo y el logo
  queda blanco. No hace falta recortar nada.
- Extensiones aceptadas, en orden de prioridad: `.svg`, `.png`, `.webp`, `.jpg`, `.jpeg`
- Evita logos **blancos sobre fondo negro** (quedarían invisibles). Si solo tienes uno así,
  avísame y le pongo una regla aparte.
- Altura de render: 32px (móvil) / 40px (desktop), ancho automático, máx. 160px.

## Nombres exactos de archivo

| Marca | Archivo |
|---|---|
| Lattafa | `lattafa.png` |
| Xerjoff | `xerjoff.png` |
| Armaf | `armaf.png` |
| Orientica | `orientica.png` |
| Paris Corner | `paris-corner.png` |
| Al Haramain | `al-haramain.png` |
| Carolina Herrera | `carolina-herrera.png` |
| Jean Paul Gaultier | `jean-paul-gaultier.png` |
| Dior | `dior.png` |
| Paco Rabanne | `paco-rabanne.png` |
| Valentino | `valentino.png` |
| Yves Saint Laurent | `yves-saint-laurent.png` |
| Victoria's Secret | `victoria-s-secret.png` |
| Tous | `tous.png` |
| Ariana Grande | `ariana-grande.png` |
| Amouage | `amouage.png` |
| Creed | `creed.png` |
| Chanel | `chanel.png` |
| Moschino | `moschino.png` |
| Maison Alhambra | `maison-alhambra.png` |

> Si usas SVG, cambia la extensión: `moschino.svg`, etc.

## Después de añadir logos
Los logos se detectan al construir. Haz commit y push:

```bash
git add public/brands
git commit -m "feat(brands): logos reales"
git push
```

Vercel redespliega y aparecen.

## Aviso
Son marcas registradas de sus respectivos dueños. NEXKO PARFUM no es distribuidor
oficial (ver aviso legal del footer).
