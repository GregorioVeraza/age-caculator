let dayUsed = false;
let monthUsed = false;
let yearUsed = false;

function calcular() {
  const inputDay = parseInt(document.getElementById('day').value, 10);
const inputMonth = parseInt(document.getElementById('month').value, 10);
const inputYear = parseInt(document.getElementById('year').value, 10);

    const yearText = document.getElementById('year-text');
    const monthText = document.getElementById('month-text');
    const dayText = document.getElementById('day-text');

    const today = new Date();// Obtener la fecha actual
    let years = today.getFullYear() - inputYear;// Calcular la diferencia de años
    let months = today.getMonth() + 1 - inputMonth; // getMonth() es 0-indexado
    let days = today.getDate() - inputDay;// Calcular la diferencia de días
    console.log(days);
    if (days < 0) {
      months--;
      // Obtener la cantidad de días del mes anterior
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0); // El mes anterior
      days += prevMonth.getDate(); // Días del mes anterior
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    yearText.firstChild.textContent = years;
    monthText.firstChild.textContent = months;
    dayText.firstChild.textContent = days;  
}

function estilarError(error) {
  error.style.fontSize = "10px";
    error.style.color = "hsl(0, 100%, 67%)";
    error.style.fontWeight = "100";
    error.style.fontFamily = "'Poppins', sans-serif";
    error.style.fontStyle = "italic";
    error.style.marginTop = "5px";

}

function falloVacio(dayField, texto) {
    dayField.children[0].style.color = "hsl(0, 100%, 67%)";
    dayField.children[1].style.border = "1px solid hsl(0, 100%, 67%)";  
    const error = document.createElement('span');
    error.textContent = texto;
    estilarError(error);
    

    dayField.appendChild(error);
}

function limpiar(field) {
  field.children[0].style.color = "hsl(0, 1%, 44%)";
  field.children[1].style.border = "1px solid hsl(0, 1%, 44%)";
  if (field.lastChild.tagName === 'SPAN') {
    field.removeChild(field.lastChild);
  }

}

function calcularEdad(event){
  if (event) event.preventDefault();

  // Obtén los valores actuales de los inputs aquí:
  const inpDay = document.getElementById('day').value;
  const inpMonth = document.getElementById('month').value;
  const inpYear = document.getElementById('year').value;

  const day = document.getElementById('day-field');
  const month = document.getElementById('month-field');
  const year = document.getElementById('year-field');
  const texto = 'This field is required';
  const texto2 = 'Must be a valid date';
  if (inpDay === "" &&  !dayUsed) {
    falloVacio(day, texto);
    dayUsed = true;
  } else if (checkBetweenDays(inpDay) && !dayUsed) {
    falloVacio(day, texto2);
    dayUsed = true;
  }
  if (inpMonth === "" && !monthUsed) {
    falloVacio(month, texto);
    monthUsed = true;
  } else if (checkBetweenMonths(inpMonth) && !monthUsed) {
    falloVacio(month, texto2);
    monthUsed = true;
  }
  if (inpYear === "" && !yearUsed) {
    falloVacio(year, texto);
    yearUsed = true;
  } else if (checkBetweenYears(inpYear) && !yearUsed) {
    falloVacio(year, texto2);
    yearUsed = true;
  }

  if ((inpDay !== "" && !checkBetweenDays(inpDay))
      && (inpMonth !== "" && !checkBetweenMonths(inpMonth))
      && inpYear !== "" && !checkBetweenYears(inpYear)) {
    calcular();
    if (dayUsed) {
      limpiar(document.getElementById('day-field'));
      dayUsed = false;
    }
    if (monthUsed) {
      limpiar(document.getElementById('month-field'));
      monthUsed = false;
    }
    if (yearUsed) {
      limpiar(document.getElementById('year-field'));
      yearUsed = false;
    }
  }
}

function checkBetweenDays(day) {
  return day < 1 || day > 31;
}

function checkBetweenMonths(month) {
  return month < 1 || month > 12;
}

function checkBetweenYears(year) {
  return year < 1900 || year > 2025;
}