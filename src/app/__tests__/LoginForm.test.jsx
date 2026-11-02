import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import LoginForm from "@/components/LoginForm";

// La acción real llama a la API y guarda la cookie: acá se reemplaza por una función falsa
const mockLogin = vi.fn();
vi.mock("@/app/actions", () => ({
  login: (datos) => mockLogin(datos),
}));

describe("Prueba de integración para: LoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debe mostrar los errores de Zod y no llamar a la API si los campos están vacíos", async () => {
    render(<LoginForm />);

    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(() => {
      expect(screen.getByText("Ingresá tu usuario")).toBeInTheDocument();
      expect(screen.getByText("Ingresá tu contraseña")).toBeInTheDocument();
    });
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it("debe mandar los datos a la acción y mostrar el error que devuelve la API", async () => {
    mockLogin.mockResolvedValue({ error: "Usuario o contraseña incorrectos." });
    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText("Usuario"), { target: { value: "lucia" } });
    fireEvent.change(screen.getByLabelText("Contraseña"), { target: { value: "claveincorrecta" } });
    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("Usuario o contraseña incorrectos.");
    });
    expect(mockLogin).toHaveBeenCalledWith({ username: "lucia", password: "claveincorrecta" });
  });
});
