import React, {
  useRef,
  useState,
  useCallback,
  FormEvent,
  ChangeEvent,
} from "react";
import emailjs from "@emailjs/browser";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import "../assets/styles/Contact.scss";
import BrandIcon from "../assets/images/avatar.png";

// ---- Configuración desde variables de entorno (nunca hardcodeadas) ----
const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID ?? "";
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID ?? "";
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY ?? "";

// ---- Límites y constantes de validación ----
const MAX_NAME_LENGTH = 80;
const MAX_CONTACT_LENGTH = 100;
const MAX_LINK_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 2000;
const MIN_MESSAGE_LENGTH = 10;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Acepta teléfonos con dígitos, espacios, guiones, paréntesis y prefijo +
const PHONE_REGEX = /^\+?[\d\s\-()]{7,20}$/;

const SUBJECT_OPTIONS = [
  { value: "oferta", label: "Oferta de trabajo / colaboración" },
  { value: "proyecto", label: "Consulta sobre un proyecto" },
  { value: "networking", label: "Networking" },
  { value: "otro", label: "Otro" },
] as const;

type SubmitStatus = "idle" | "sending" | "success" | "error";

/**
 * Elimina caracteres de control y saltos de línea de un campo de una sola línea,
 * para evitar cualquier intento de inyección de cabeceras (header injection)
 * si el valor llegara a usarse como cabecera de email en algún punto de la cadena.
 */
function sanitizeSingleLine(value: string): string {
  return value.replace(/[\r\n\t]/g, " ").trim();
}

function isValidContact(value: string): boolean {
  return EMAIL_REGEX.test(value) || PHONE_REGEX.test(value);
}

function isValidLink(value: string): boolean {
  if (value.trim() === "") return true; // opcional
  try {
    const url = new URL(value.trim());
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const lastSubmitRef = useRef<number>(0);

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [subject, setSubject] = useState("");
  const [link, setLink] = useState("");
  const [message, setMessage] = useState("");

  // Honeypot: campo invisible para humanos, atractivo para bots.
  const [honeypot, setHoneypot] = useState("");

  const [nameError, setNameError] = useState(false);
  const [contactError, setContactError] = useState(false);
  const [subjectError, setSubjectError] = useState(false);
  const [linkError, setLinkError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalResult, setModalResult] = useState<"success" | "error" | null>(
    null,
  );
  const [errorMessage, setErrorMessage] = useState("");

  const validate = useCallback((): boolean => {
    const trimmedName = name.trim();
    const trimmedContact = contact.trim();
    const trimmedMessage = message.trim();

    const isNameValid =
      trimmedName.length > 0 && trimmedName.length <= MAX_NAME_LENGTH;
    const isContactValid = isValidContact(trimmedContact);
    const isSubjectValid = subject !== "";
    const isLinkValid = isValidLink(link);
    const isMessageValid =
      trimmedMessage.length >= MIN_MESSAGE_LENGTH &&
      trimmedMessage.length <= MAX_MESSAGE_LENGTH;

    setNameError(!isNameValid);
    setContactError(!isContactValid);
    setSubjectError(!isSubjectValid);
    setLinkError(!isLinkValid);
    setMessageError(!isMessageValid);

    return (
      isNameValid &&
      isContactValid &&
      isSubjectValid &&
      isLinkValid &&
      isMessageValid
    );
  }, [name, contact, subject, link, message]);

  const resetForm = () => {
    setName("");
    setContact("");
    setSubject("");
    setLink("");
    setMessage("");
    setHoneypot("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Bot detectado por el honeypot: se simula éxito sin enviar nada.
    if (honeypot.trim() !== "") {
      resetForm();
      return;
    }

    if (!validate()) {
      return;
    }

    // Cortafuegos extra en el cliente: evita doble envío por doble click
    // o por reenvíos automatizados muy rápidos, además del limitRate de EmailJS.
    const now = Date.now();
    if (now - lastSubmitRef.current < 5000 || status === "sending") {
      return;
    }
    lastSubmitRef.current = now;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus("error");
      setErrorMessage(
        "El formulario no está configurado correctamente. Inténtalo más tarde.",
      );
      setModalResult("error");
      setModalOpen(true);
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    const subjectLabel =
      SUBJECT_OPTIONS.find((opt) => opt.value === subject)?.label ?? subject;

    const templateParams = {
      name: sanitizeSingleLine(name),
      contact: sanitizeSingleLine(contact),
      subject: subjectLabel,
      link: sanitizeSingleLine(link),
      message: message.trim().slice(0, MAX_MESSAGE_LENGTH),
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, {
        publicKey: PUBLIC_KEY,
        limitRate: {
          id: "contact-form",
          throttle: 15000,
        },
      });
      setStatus("success");
      setModalResult("success");
      setModalOpen(true);
      resetForm();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        "No se pudo enviar el mensaje. Inténtalo de nuevo en unos minutos.",
      );
      setModalResult("error");
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setStatus("idle");
  };

  const isSending = status === "sending";

  return (
    <div id="contact">
      <div className="items-container">
        <div className="contact_wrapper">
          <h1>Contacto</h1>
          <p>
            ¿Tienes algún proyecto en mente? ¡Contacta y hagámoslo realidad!
          </p>

          <Box
            ref={formRef}
            component="form"
            noValidate
            autoComplete="off"
            className="contact-form"
            onSubmit={handleSubmit}
          >
            {/* Honeypot: oculto visualmente y para lectores de pantalla */}
            <TextField
              name="company"
              value={honeypot}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setHoneypot(e.target.value)
              }
              sx={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div className="form-flex">
              <TextField
                required
                id="contact-name"
                label="Tu nombre"
                placeholder="¿Cuál es tu nombre?"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={nameError}
                helperText={nameError ? "Por favor, ingresa tu nombre" : ""}
                inputProps={{ maxLength: MAX_NAME_LENGTH }}
                disabled={isSending}
              />
              <TextField
                required
                id="contact-method"
                label="Email / Teléfono"
                placeholder="¿Cómo puedo contactarte?"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                error={contactError}
                helperText={
                  contactError ? "Ingresa un email o teléfono válido" : ""
                }
                inputProps={{ maxLength: MAX_CONTACT_LENGTH }}
                disabled={isSending}
              />
            </div>

            <div className="form-flex">
              <FormControl
                required
                error={subjectError}
                disabled={isSending}
                fullWidth
              >
                <InputLabel id="contact-subject-label">Asunto</InputLabel>
                <Select
                  labelId="contact-subject-label"
                  id="contact-subject"
                  value={subject}
                  label="Asunto"
                  onChange={(e: SelectChangeEvent) =>
                    setSubject(e.target.value)
                  }
                >
                  {SUBJECT_OPTIONS.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                id="contact-link"
                label="LinkedIn / Web (opcional)"
                placeholder="https://linkedin.com/in/tu-perfil"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                error={linkError}
                helperText={
                  linkError ? "Introduce una URL válida (https://...)" : ""
                }
                inputProps={{ maxLength: MAX_LINK_LENGTH }}
                disabled={isSending}
                fullWidth
              />
            </div>

            <TextField
              required
              id="contact-message"
              label="Mensaje"
              placeholder="Envíame cualquier consulta o propuesta que tengas en mente"
              multiline
              rows={10}
              className="body-form"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              error={messageError}
              helperText={
                messageError
                  ? `El mensaje debe tener entre ${MIN_MESSAGE_LENGTH} y ${MAX_MESSAGE_LENGTH} caracteres`
                  : `${message.length}/${MAX_MESSAGE_LENGTH}`
              }
              inputProps={{ maxLength: MAX_MESSAGE_LENGTH }}
              disabled={isSending}
            />

            <Button
              type="submit"
              variant="contained"
              endIcon={
                isSending ? (
                  <CircularProgress size={18} color="inherit" />
                ) : (
                  <SendIcon />
                )
              }
              disabled={isSending}
            >
              {isSending ? "Enviando..." : "Enviar"}
            </Button>
          </Box>

          <Dialog
            open={modalOpen}
            onClose={handleCloseModal}
            aria-labelledby="contact-dialog-title"
            aria-describedby="contact-dialog-description"
            TransitionProps={{ onExited: () => setModalResult(null) }}
          >
            <DialogTitle
              id="contact-dialog-title"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {modalResult === "success" ? (
                  <CheckCircleOutlineIcon color="success" fontSize="large" />
                ) : (
                  <ErrorOutlineIcon color="error" fontSize="large" />
                )}
                {modalResult === "success"
                  ? "¡Mensaje enviado!"
                  : "Algo salió mal"}
              </Box>

              <Box
                component="img"
                src={BrandIcon}
                alt="Vicente Codes"
                sx={{ height: 32, width: 32 }}
              />
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="contact-dialog-description">
                {modalResult === "success"
                  ? "Gracias por contactar. Te responderé lo antes posible."
                  : errorMessage}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal} autoFocus variant="contained">
                Cerrar
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default Contact;