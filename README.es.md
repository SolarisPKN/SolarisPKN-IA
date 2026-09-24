# SolarisPKN-IA — Blueprint público

[English](README.md) · **Español**

Este repositorio contiene la **idea arquitectónica pública** detrás de SolarisPKN-IA.

Deliberadamente **no es la Solaris privada**. No contiene memoria personal, personalidad privada, historial de proyectos privados, credenciales, rutas locales, conversaciones privadas, pesos de modelos ni código fuente de frameworks/servicios de terceros.

La meta es sencilla: si alguien pregunta **«¿cómo puedo construir un asistente como Solaris?»**, este repositorio debe mostrar la arquitectura, el mapa completo de capacidades y una implementación mínima de referencia sin publicar la instancia privada.

## Espacio completo de capacidades

Ahora el repo documenta el catálogo sanitizado completo recuperado del diseño:

- **133** primitivas fundacionales;
- **660** requisitos posteriores individualizados;
- **793** puntos de capacidad/requisito en total;
- evolución arquitectónica desde **M00 hasta M71**.

Empezá por:

- [Inventario completo de capacidades](docs/capabilities/README.md)
- [Capacidades fundacionales](docs/FOUNDATION-CAPABILITIES.md)
- [Especificación completa del sistema](docs/FULL-SYSTEM-SPEC.md)
- [Evolución M00–M71](docs/MODULE-LINEAGE.md)

## Nuevos patrones de referencia hasta M71

El blueprint público ahora también documenta:

- **perfiles de routing** sobre gateways de modelos reemplazables, con contexto privado denegado salvo declaración explícita de compatibilidad;
- **doble mente Markdown**: un vault del dueño en solo lectura + un vault separado y escribible de la IA;
- Markdown/wikilinks compatibles con Obsidian, sharding por fecha, recuperación acotada y sugerencias de conexiones entre ambas mentes;
- un ciclo explícito de **Sueño/reflexión** que genera candidatos pero nunca promociona hechos silenciosamente;
- **métricas afectivas funcionales** (solo presentación/control; jamás verdad o autorización);
- una capa opcional de **estado de avatar de escritorio** guiada por actividad/afecto, sin autoridad implícita sobre cámara o control del escritorio.

Ver [Doble mente Markdown](docs/DUAL-MIND-MARKDOWN.md), [Sueño/Afecto/Avatar](docs/DREAM-AFFECT-AVATAR.md) y [Router Bridges](docs/ROUTER-BRIDGES.md).

## Idea central

Solaris no es un único modelo gigante ni una carpeta con cientos de botones. Es un asistente privado compuesto por capas pequeñas y reemplazables:

```text
Usuario (texto / voz / interfaz)
             |
             v
    Router de intención/contexto
             |
             v
   Broker de capacidades/tools
             |
             v
 Pipeline de políticas/aprobación
             |
      +------+------+----------------+
      |             |                |
      v             v                v
   Memoria       Aprendizaje      Adaptadores externos
      |             |                |
      +-------> Log de sesión/eventos <---+
                     |
                     v
                 Verificación
                     |
                     v
               Respuesta al usuario
```

El asistente elige las capacidades automáticamente. La interfaz normal debe sentirse como un chat, no como una caja de herramientas.

## Principios

1. **Privado por defecto.**
2. **Capacidad antes que proveedor.**
3. **Deny-by-default para efectos externos.**
4. **La aprobación está ligada a la acción exacta.**
5. **Un stream durable de eventos.**
6. **Memoria gobernada y con procedencia.**
7. **Aprendizaje basado en evidencia:** `candidate → validated → practiced → verified → mastered`.
8. **Adaptadores reemplazables.**
9. **UX chat-first.**
10. **Los sistemas de terceros son referencias, no la arquitectura.**

## Qué incluye

- arquitectura neutral respecto del proveedor;
- inventario exhaustivo sanitizado;
- implementación de referencia pequeña y original;
- sesiones event-sourced, registry de capacidades, broker de tools, políticas, learning, gateway/nodes y contratos de voz;
- seguridad y privacidad;
- guía para construir una implementación propia;
- separación público/privado;
- tests sintéticos.

## Qué no incluye

Ver [docs/WHAT-IS-NOT-INCLUDED.md](docs/WHAT-IS-NOT-INCLUDED.md).

## Por dónde empezar

1. Leé [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).
2. Abrí el [inventario completo](docs/capabilities/README.md).
3. Seguí [docs/BUILD-YOUR-OWN.md](docs/BUILD-YOUR-OWN.md).
4. Ejecutá `npm test`.
5. Ejecutá `npm run demo`.
6. Agregá providers mediante contratos genéricos en lugar de reescribir el core.

## Límite público / privado

Una instalación real puede tener memoria, personalidad, proyectos, credenciales, rutas locales, dispositivos vinculados y reglas personales. **Nada de eso pertenece a este repositorio.**

El repo documenta el mecanismo y el espacio de ideas, no a su dueño.

## Licencia

SolarisPKN-IA se distribuye bajo la **GNU General Public License v3.0 only (GPL-3.0-only)**. Ver [LICENSE](LICENSE).
