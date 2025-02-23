# Usar una imagen base de Node.js
FROM node:18-alpine AS build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de tu proyecto (solo el package.json y yarn.lock primero para optimizar caché)
COPY package.json yarn.lock ./

# Instalar las dependencias con Yarn
RUN yarn install

# Copiar todos los archivos del proyecto al contenedor
COPY . .

# Construir la aplicación
RUN yarn build

# Usar una imagen base ligera de Nginx para servir la aplicación
FROM nginx:alpine

# Copiar los archivos de la carpeta dist al servidor Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
