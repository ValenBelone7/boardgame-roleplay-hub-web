import { renderHook, act } from "@testing-library/react";
import { TemaProvider, useTema } from "@/app/context/TemaContext";

const wrapper = ({ children }) => <TemaProvider>{children}</TemaProvider>;

describe("TemaContext", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = "";
  });

  it("debe arrancar en claro si no hay tema guardado", () => {
    const { result } = renderHook(() => useTema(), { wrapper });

    expect(result.current.tema).toBe("claro");
  });

  it("debe arrancar en oscuro si el script del head ya puso la clase dark", () => {
    document.documentElement.classList.add("dark");

    const { result } = renderHook(() => useTema(), { wrapper });

    expect(result.current.tema).toBe("oscuro");
  });

  it("debe pasar a oscuro, poner la clase dark y guardarlo", () => {
    const { result } = renderHook(() => useTema(), { wrapper });

    act(() => result.current.alternarTema());

    expect(result.current.tema).toBe("oscuro");
    expect(document.documentElement).toHaveClass("dark");
    expect(localStorage.getItem("tema")).toBe("oscuro");
  });

  it("debe volver a claro y sacar la clase dark al alternar dos veces", () => {
    const { result } = renderHook(() => useTema(), { wrapper });

    act(() => result.current.alternarTema());
    act(() => result.current.alternarTema());

    expect(result.current.tema).toBe("claro");
    expect(document.documentElement).not.toHaveClass("dark");
    expect(localStorage.getItem("tema")).toBe("claro");
  });
});
