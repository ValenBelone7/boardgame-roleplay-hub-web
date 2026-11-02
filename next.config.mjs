/** @type {import('next').NextConfig} */
const nextConfig = {
  // Sin cacheComponents: el layout raíz lee la cookie de sesión y con esa opción
  // cada lectura de cookies tendría que ir dentro de un <Suspense>
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
