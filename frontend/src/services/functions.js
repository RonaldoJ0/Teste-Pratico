import { toast } from "react-toastify";

export function ValidateBlanksSpace(value, element) {
  if (value.match(/^(\s)+$/)) {
    element.value = "";
    return toast.error("Não é permitido iniciar com espaços");
  }
}

export function CpfCnpjMask(value) {
  let aux = value.replace(/[^0-9]/g, "");
  if (aux.length < 12) {
    aux = aux.replace(/(\d{3})(\d)/, "$1.$2");
    aux = aux.replace(/(\d{3})(\d)/, "$1.$2");
    aux = aux.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  } else {
    aux = aux.replace(/^(\d{2})(\d)/, "$1.$2");
    aux = aux.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    aux = aux.replace(/\.(\d{3})(\d)/, ".$1/$2");
    aux = aux.replace(/(\d{4})(\d)/, "$1-$2");
  }
  return aux;
}

export function telAddMask(value) {
  let aux = value.replace(/[^0-9]/g, "");
  aux = aux.replace(/^(\d{2})(\d)/g, "($1) $2");
  aux = aux.replace(/(\d)(\d{4})$/, "$1-$2");
  return aux;
}

export function cepAddMask(value) {
  let aux = value.replace(/[^0-9]/g, "");
  aux = aux.replace(/^(\d{5})(\d)/g, "$1-$2");
  return aux;
}

export function RemoveMask(value) {
  return value?.replace(/[^0-9]/g, "");
}
