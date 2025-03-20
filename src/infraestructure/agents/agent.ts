/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/ban-types */
import axios, { AxiosResponse } from "axios";
import messages from "../../util/messages";
import responses from "../../util/responses";

axios.interceptors.response.use(
  async (response) => {
    // Validar si el campo `success` es falso
    if (response.data && response.data.success === false) {
      response.data.message = messages.serverError;
      const error = new Error(JSON.stringify(response.data));

      throw error;
    }

    // Si `success` es verdadero, simplemente retorna la respuesta
    return response;
  },
  async (error) => {
    if (error.message === "Network Error" && !error.response) {
      throw new Error(JSON.stringify({ Message: messages.networkError }));
    }

    const { status } = error?.response;

    if (status === responses.forbidden) {
      throw new Error(JSON.stringify({ Message: messages.forbidden }));
    }

    if (status === responses.internalServerError) {
      throw new Error(JSON.stringify({ Message: messages.serverError }));
    }

    if (status === responses.gatewayTimeout) {
      throw new Error(JSON.stringify({ Message: messages.timeout }));
    }

    if (error.response.request.responseType === "blob") {
      const text = await new Response(error.response.data).text();
      const json = JSON.parse(text);
      error.response.data = json;
    }

    throw error.response;
  }
);

const responseBody = (response: AxiosResponse) => response?.data;
const responseB = (response: AxiosResponse) => response;
axios.defaults.withCredentials = true; // Esto permitirá enviar cookies con todas las peticiones
//export const baseURL = process.env.VUE_APP_BASE_URL;
export const baseURL = "https://localhost:44388/";
export const coreBaseURL = process.env.VUE_APP_CORE_URL;
const requests = {
  get: (url: string, api = "base") =>
    axios
      .get(url, {
        baseURL: api == "base" ? baseURL : coreBaseURL,
      })
      .then(responseBody),
  getfull: (url: string, api = "base") =>
    axios
      .get(url, {
        baseURL: api == "base" ? baseURL : coreBaseURL,
      })
      .then(responseB),
  post: (url: string, data: {} | FormData, api = "base") =>
    axios
      .post(url, data, {
        baseURL: api == "base" ? baseURL : coreBaseURL,
        headers:
          data instanceof FormData
            ? { "Content-Type": "multipart/form-data" }
            : { "Content-Type": "application/json" },
      })
      .then(responseBody),
  put: (url: string, data: {} | FormData, api = "base") =>
    axios
      .put(url, data, {
        baseURL: api == "base" ? baseURL : coreBaseURL,
        headers:
          data instanceof FormData
            ? { "Content-Type": "multipart/form-data" }
            : { "Content-Type": "application/json" },
      })
      .then(responseBody),
  delete: (url: string, api = "base") =>
    axios
      .delete(url, {
        baseURL: api == "base" ? baseURL : coreBaseURL,
      })
      .then(responseBody),
  download: (url: string, data?: object | FormData, api = "base") =>
    axios
      .post(url, data ?? {}, {
        baseURL: url.startsWith("http")
          ? undefined
          : api == "base"
          ? baseURL
          : coreBaseURL,
        responseType: "blob",
        headers:
          {} instanceof FormData
            ? { "Content-Type": "multipart/form-data" }
            : { "Content-Type": "application/json" },
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;

        let name = "file.txt";

        const contentDisposition = response.headers["content-disposition"];
        if (contentDisposition) {
          if (contentDisposition.includes("filename*=UTF-8''")) {
            name = decodeURI(
              contentDisposition.split("filename*=UTF-8''")[1].split(";")[0]
            );
          }
        }

        link.setAttribute("download", name);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }),

  print: (
    urlbase: string,
    data?: Object | FormData,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    api = "base"
  ): Promise<void> =>
    new Promise<void>((resolve, reject) => {
      // Abrir la URL en una nueva pestaña
      try {
        let link = document.createElement("a");
        link.href = urlbase;
        link.target = "_blank"; // Abre en una nueva pestaña
        document.body.appendChild(link); // Agregar el enlace al DOM
        link.click(); // Hacer clic programáticamente en el enlace
        document.body.removeChild(link); // Eliminar el enlace del DOM
        
        let iframe = document.createElement("iframe");
        iframe.style.display = "none"; // Hace que el iframe sea invisible
        iframe.src = urlbase;
        document.body.appendChild(iframe);

        // Intentar abrir la URL en una nueva pestaña
        //let newTab = window.open(urlbase, "_blank", "noopener,noreferrer");
        //if (!newTab) {
          // Si no se puede abrir la nueva pestaña, rechazar la promesa
          //  reject(new Error("No se pudo abrir la pestaña nueva. Verifica las configuraciones del navegador."));
          /*          setTimeout(() => {
            newTab = window.open(urlbase, "_blank","rel=noopener");
            if (!newTab) {
              requests.print(urlbase);
            }
          }, 500); */
        //}

        // Aquí iría el resto de la lógica si la pestaña se abre correctamente
        resolve();
      } catch (error: any) {
        // Si ocurre un error, mostrarlo en un alert

        reject(error); // Rechazar la promesa
      }
    }),
  getFileUrl: (
    url: string,
    contentType: string,
    data?: Object | FormData,
    api = "base"
  ) =>
    axios
      .post(url, data ?? {}, {
        baseURL: api == "base" ? baseURL : coreBaseURL,
        responseType: "blob",
        headers:
          {} instanceof FormData
            ? { "Content-Type": "multipart/form-data" }
            : { "Content-Type": "application/json" },
      })
      .then((response) => {
        const url = window.URL.createObjectURL(
          new Blob([response.data], { type: contentType })
        );

        return url;
      }),
};

export default requests;
