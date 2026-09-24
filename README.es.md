# SolarisPKN-IA — Blueprint público

[English](README.md) · **Español**

SolarisPKN-IA es un **blueprint público y neutral respecto de proveedores** para construir un asistente personal privado, extensible y orientado al chat.

Este repositorio **no es la instancia privada de Solaris**. No incluye memoria personal, personalidad, conversaciones, credenciales, rutas locales, proyectos privados, modelos empaquetados ni código fuente de frameworks o servicios de terceros.

La idea es simple: si alguien pregunta **«¿cómo puedo construir un asistente como Solaris?»**, este repositorio debería explicar la arquitectura y mostrar una implementación mínima suficiente para crear una versión independiente.

## La idea central

Solaris no es un único modelo gigante ni una carpeta con cientos de botones. Está compuesto por capas pequeñas y reemplazables:

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

El asistente selecciona las capacidades automáticamente. La interfaz normal debe sentirse como un chat, no como una caja de herramientas.

## Principios de diseño

1. **Privado por defecto.** Los datos locales no salen de la máquina salvo que una política explícita lo autorice.
2. **Capacidad antes que proveedor.** El núcleo pide `speech.tts`, `code.execute`, `memory.search` o `image.edit`; el proveedor se decide después.
3. **Deny-by-default.** Leer y razonar están separados de las acciones con efectos externos.
4. **La aprobación pertenece a la acción exacta.** Aprobar un payload no autoriza otro distinto.
5. **Un único stream durable de eventos.** El estado importante de una sesión se puede reconstruir a partir de eventos tipados.
6. **La memoria está gobernada.** La información nueva no se promociona automáticamente a verdad permanente.
7. **Aprendizaje basado en evidencia.** Un conocimiento puede avanzar por `candidate → validated → practiced → verified → mastered`.
8. **Adaptadores reemplazables.** Modelos, voz, navegador, herramientas creativas, canales y dispositivos son proveedores opcionales.
9. **Chat-first.** Los paneles avanzados existen para diagnóstico y administración, no para el uso cotidiano.
10. **Los sistemas de terceros no son la arquitectura.** Este repositorio no redistribuye frameworks externos.

## Qué incluye

- arquitectura vendor-neutral;
- una implementación de referencia pequeña y original usando solamente módulos built-in de Node.js;
- ejemplos de sesiones event-sourced, capabilities, selección de tools, políticas, aprendizaje, gateways, nodos y contratos de voz;
- reglas de seguridad y privacidad;
- una guía paso a paso para construir tu propia implementación;
- checklist para separar lo público de lo privado;
- tests que demuestran invariantes importantes.

## Qué NO incluye

Ver [docs/WHAT-IS-NOT-INCLUDED.md](docs/WHAT-IS-NOT-INCLUDED.md).

## Por dónde empezar

1. Leé [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).
2. Seguí [docs/BUILD-YOUR-OWN.md](docs/BUILD-YOUR-OWN.md).
3. Ejecutá `npm test`.
4. Ejecutá `npm run demo`.
5. Agregá tus propios providers mediante contratos genéricos en lugar de modificar el core.

## Límite público / privado

Una instancia real puede tener memoria privada, personalidad propia, proyectos del usuario, credenciales, rutas locales, dispositivos vinculados y reglas personales de automatización. **Nada de eso pertenece a este repositorio.**

Este repositorio documenta el mecanismo, no a su dueño.

## Licencia

SolarisPKN-IA se distribuye bajo la **GNU General Public License v3.0 (GPL-3.0)**. Consultá [LICENSE](LICENSE).
