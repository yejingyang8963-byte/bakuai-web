# Baku AI — Política de Privacidad

**Fecha de entrada en vigor:** 2026-04-11
**Última actualización:** 2026-04-11

Baku AI ("nosotros", "nos", "la app") es una aplicación sin conexión
de cuentos para dormir diseñada para niños de 3 a 7 años y sus padres.
Esta política explica exactamente qué datos maneja la aplicación y —
más importante aún — qué datos nunca toca.

---

## 1. La versión corta

**Baku AI no recopila ningún dato personal.** Sin cuentas, sin
rastreo, sin análisis, sin publicidad, sin servidores en la nube
procesando la voz o los cuentos de tu hijo. La app se ejecuta 100%
en tu dispositivo después de la descarga inicial del modelo de IA.
No podemos ver, almacenar ni compartir nada de lo que tú o tu hijo
digan o hagan dentro de la app, porque no hay ningún backend que
reciba esa información.

Si no lees nada más, lee este párrafo.

---

## 2. Lo que **no** recopilamos

No recopilamos, transmitimos ni almacenamos ninguna de las siguientes
cosas:

- Tu nombre, correo electrónico, número de teléfono o cualquier
  identificador
- El nombre, edad, grabación de voz o contenido de cuentos de tu hijo
- Datos de ubicación (GPS, basados en IP o cualquier otro método)
- Identificadores de dispositivo usados para rastreo (IDFA, IDFV)
- Análisis de uso, informes de fallos o telemetría
- Identificadores publicitarios
- Contactos, fotos, calendarios ni cualquier otro dato de tu dispositivo
- Ningún dato sujeto a COPPA, GDPR-K o normativas similares de
  privacidad infantil

No hay "cuenta" que crear. No hay "inicio de sesión". No hay nada
de lo que desuscribirse, porque no hay nada a lo que suscribirse.

---

## 3. Lo que se queda en tu dispositivo

Los siguientes datos son creados y almacenados **solo en tu
dispositivo**. Ninguno se transmite a ningún lugar:

| Dato | Dónde vive | Por qué existe |
|---|---|---|
| Voz del niño capturada por el micrófono | Reconocimiento de voz de iOS (modo on-device) | Convertida a texto para generar cuentos con IA; descartada inmediatamente después |
| Semillas de cuento habladas o escritas | Solo en memoria | Enviadas al modelo de IA en el dispositivo para generar un cuento |
| Texto del cuento generado | En RAM durante la reproducción | Por defecto nunca se escribe en disco |
| Historial de escucha (solo títulos) | iOS UserDefaults, local a tu dispositivo | Impulsa la sugerencia "Cuento de hoy" |
| Estadísticas de duración del sueño | iOS UserDefaults | Impulsa la vista opcional de estadísticas de sueño |
| Ajustes (idioma, voz, estado de compras) | iOS UserDefaults | Recuerda tus preferencias entre lanzamientos |
| Perfil del nino (nombre, edad, preferencias) | Almacenamiento local de la app (Application Support), cifrado por iOS Data Protection | Permite historias personalizadas donde tu hijo es el protagonista (v1.1). Nunca se transmite. |

Todo esto está dentro del sandbox de la app. Cuando eliminas Baku AI,
todo esto se elimina con ella. No hay ninguna copia en ningún otro lugar.

---

## 4. Micrófono y reconocimiento de voz

Cuando tocas "Quiero contar el mío", Baku AI activa el micrófono del
iPhone y usa `SFSpeechRecognizer` de Apple para transcribir tu voz a
texto. Hemos configurado este reconocedor con
`requiresOnDeviceRecognition = true`, lo que significa:

- Tu voz se procesa **totalmente en tu dispositivo**
- Las muestras de audio **nunca se envían a la nube de Apple**
- Las muestras de audio **nunca se envían a nuestros servidores**
  (no tenemos ninguno)
- El audio crudo se descarta en cuanto termina la transcripción

iOS puede pedirte permiso la primera vez que uses esta función. Si
niegas el permiso, puedes seguir usando todas las demás partes de la
app — cuentos preestablecidos, canciones de cuna, meditación y sonidos
ambientales funcionan todos sin el micrófono.

---

## 5. Descarga inicial del modelo de IA

Cuando instalas Baku AI por primera vez, la app descarga un modelo de
lenguaje de IA en el dispositivo (~1,5 GB, Google Gemma 4) desde el
CDN público de Hugging Face (`huggingface.co`). Esta descarga ocurre
**solo una vez**. Después el modelo se ejecuta completamente sin
conexión en tu dispositivo.

Durante esta descarga única:

- Tu dirección IP es visible para Hugging Face y tu proveedor de red,
  igual que con cualquier otra descarga web
- Nosotros (el equipo de Baku AI) no recibimos ninguna información
  sobre la descarga — va directamente de Hugging Face a tu dispositivo
- Después de que la descarga termina, la app nunca vuelve a contactar
  a Hugging Face

También puedes usar la app inmediatamente con cuentos preestablecidos,
canciones de cuna y sonidos ambientales mientras el modelo se descarga
en segundo plano.

---

## 6. Servicios de terceros

Baku AI **no** integra ningún SDK, rastreador o servicio de terceros
para datos de usuario. Específicamente, no hay:

- Firebase, Mixpanel, Segment u otro SDK de análisis
- Facebook, Google, Apple Search Ads u otro SDK de publicidad
- Crashlytics, Sentry u otro SDK de informes de fallos
- Compartir en redes sociales, foros de usuarios ni funciones comunitarias
- Chatbots ni API de LLM en la nube

El único recurso externo que la app toca alguna vez es el repositorio
público de modelos de Hugging Face durante la descarga inicial del
modelo, como se describe en la Sección 5.

---

## 7. Compras dentro de la app

Baku AI ofrece mejoras de pago opcionales mediante el sistema de
compras dentro de la app de Apple. Cuando haces una compra:

- Tu pago es procesado completamente por Apple
- Nosotros solo recibimos una señal anónima de que una compra se completó
- No recibimos tu nombre, correo electrónico, tarjeta de crédito ni
  Apple ID
- Todos los registros de compra se almacenan en tu cuenta de Apple,
  no con nosotros

Para el cumplimiento de la Categoría Kids (App Store Review Guideline
1.3), cada botón de compra está protegido por un desafío de verificación
parental (una simple operación aritmética). Los niños no pueden comprar
por accidente.

Para solicitudes de reembolso, contacta directamente con Apple:
https://reportaproblem.apple.com

---

## 8. Privacidad infantil (COPPA, GDPR-K)

Baku AI está explícitamente diseñado para niños y cumple plenamente
con la Ley de Protección de la Privacidad Infantil en Línea (COPPA)
de EE.UU. y las normas equivalentes europeas y del Reino Unido.

La única información personal que la app almacena es el **perfil del
niño opcional** (nombre/apodo, rango de edad, rasgos de personalidad,
compañero, temas a evitar) que los padres pueden crear en Ajustes →
Controles parentales para activar cuentos personalizados donde el
niño es el protagonista. Como se detalla en la Sección 3:

- El perfil del niño vive **solo en el sandbox de la app en tu
  dispositivo** — cifrado en reposo por iOS Data Protection, nunca se
  transmite, nunca se comparte con nosotros ni con terceros.
- Crear, editar o eliminar el perfil ocurre **detrás del control
  parental** (un desafío aritmético para adultos). Los niños no
  pueden crear ni modificar datos del perfil por sí mismos.
- Los padres pueden eliminar el perfil en cualquier momento vía
  Ajustes → Controles parentales → Perfil del niño, o desinstalando
  la app (que elimina todo).
- La app funciona completamente sin perfil — los perfiles son
  totalmente opcionales. Por defecto, no se almacena información
  alguna del niño.

Para todos los demás propósitos, no recopilamos información personal
de nadie, ni niño ni adulto. No hay servicio en línea que reciba
datos, por lo que no se necesita un flujo de consentimiento
verificable de terceros — el padre o tutor da consentimiento dentro
de la app al pasar el control parental antes de que se cree cualquier
dato del perfil.

Si eres padre, madre o tutor y quieres verificarlo tú mismo, puedes:

- Activar el Modo Avión en iOS y confirmar que la app funciona (menos
  la descarga única del modelo)
- Monitorear tu tráfico de red; observarás que Baku AI hace cero
  peticiones de red después de la descarga inicial del modelo
- Inspeccionar el código fuente — Baku AI está construido sobre
  frameworks abiertos

---

## 9. Retención y eliminación de datos

Como ningún dato sale de tu dispositivo, la eliminación de datos está
enteramente bajo tu control:

- Para eliminar todo de una vez, elimina la app Baku AI de tu dispositivo
- Para borrar solo el historial de escucha o las estadísticas de sueño,
  ve a Ajustes → Restablecer dentro de la app

No retenemos nada en servidores que no poseemos, porque no poseemos
ninguno.

---

## 10. Seguridad

Todos los datos de la app se almacenan dentro del sandbox de la
aplicación iOS, que Apple aísla de otras apps. iOS en sí cifra el
almacenamiento del dispositivo cuando se establece un código de acceso.
Confiamos en la arquitectura de seguridad de Apple para la protección
de datos en reposo; como no transmitimos datos, no hay riesgo de datos
en tránsito después de la descarga inicial del modelo.

---

## 11. Cambios en esta política

Si alguna vez cambiamos esta política de forma material, lo haremos
así:

- Actualizaremos la fecha de "Última actualización" en la parte superior
- Describiremos el cambio en las notas de lanzamiento de la app
- Si el cambio afecta qué datos se recopilan, te pediremos que
  consientas explícitamente antes de que el nuevo comportamiento
  entre en vigor

Nos comprometemos a no introducir nunca rastreo, análisis o
procesamiento de datos en la nube como una actualización silenciosa.

---

## 12. Contacto

Preguntas sobre esta política:

- Correo: Metaphoria1688@gmail.com

Respondemos a cada pregunta de privacidad en 7 días.
