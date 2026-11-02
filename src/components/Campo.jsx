// Etiqueta + input + mensaje de error. Se usa dentro de los formularios con React Hook Form:
// <Campo etiqueta="Usuario" error={errors.username?.message} {...register("username")} />
export default function Campo({ etiqueta, error, ...props }) {
  return (
    <label className="grid gap-1.5 font-medium">
      {etiqueta}
      <input
        {...props}
        aria-invalid={error ? true : undefined}
        className="rounded-lg border-2 border-borde bg-fondo px-3 py-2.5 font-normal text-texto focus:border-caramelo focus:outline-none aria-invalid:border-red-700 dark:aria-invalid:border-red-300"
      />
      {error && <span className="text-sm font-normal text-red-700 dark:text-red-300">{error}</span>}
    </label>
  );
}
