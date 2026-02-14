// src/components/GoogleLoginBtn.jsx
import { useEffect } from "react";

export default function GoogleLoginBtn({
  endpoint = "/api/auth/google-login/",
  onSuccess,
  onError,
  renderId = "g_id_signin",
}) {
  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) {
      console.error("VITE_GOOGLE_CLIENT_ID not set. Add it to .env with VITE_ prefix.");
      onError?.({ message: "Google Client ID missing" });
      return;
    }

    // ensure unique element exists
    let container = document.getElementById(renderId);
    if (!container) {
      container = document.createElement("div");
      container.id = renderId;
      // append near end of body so styles don't shift layout; adapt if needed
      document.body.appendChild(container);
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    const onLoad = () => {
      if (!window.google || !window.google.accounts) {
        onError?.({ message: "Google Identity script not available" });
        return;
      }

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: async (resp) => {
          const id_token = resp?.credential;
          if (!id_token) {
            onError?.({ message: "No credential from Google" });
            return;
          }

          try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE || ""}${endpoint}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({ id_token }),
            });
            const data = await res.json();
            if (!res.ok) throw data;
            onSuccess?.(data);
          } catch (err) {
            console.error("Google auth error", err);
            onError?.(err);
          }
        },
        auto_select: false, // safer when multiple buttons present
      });

      // render button (customize theme/size)
      window.google.accounts.id.renderButton(
        container,
        { theme: "outline", size: "large" }
      );
    };

    script.addEventListener("load", onLoad);
    script.addEventListener("error", () => onError?.({ message: "Failed to load Google script" }));

    return () => {
      script.removeEventListener("load", onLoad);
      try { script.remove(); } catch {}
      // remove container only if we appended it
      if (container && container.parentNode === document.body && !document.getElementById(renderId + "_keep")) {
        container.remove();
      }
    };
  }, [endpoint, onSuccess, onError, renderId]);

  return <div id={renderId}></div>;
}
