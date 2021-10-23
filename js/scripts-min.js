(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _isMobile = require("./modules/isMobile");

// (()=>{
//   const access = localStorage.getItem('access')
//   const lang =localStorage.getItem('lang')
//   if (access && lang){
//     if(lang==='es') location.href='/es'
//     if(lang==='en') location.href='/en'
//   }
// })();
var exReg = "^[0-9]";
var textEs = {
  year: "año",
  month: "mes",
  day: "día",
  title: "Bienvenido al sitio oficial de destiladora agave azul",
  subTitle: "Antes de ingresar al maravilloso mundo de Distiladora Agave Azul por favor confirma que eres mayor de edad.",
  buttonText: "entrar",
  checkText: "¿Desea mantener sus informacion en esta computadora?",
  footerText: "Entra a este sitio solo si tienes la edad legal para ingerir bebidas alcoholicas, presionando el boton entrar, estas de acuerdo con los téminos y políticas de privacidad del sitio."
};
var textEn = {
  year: "year",
  month: "moth",
  day: "day",
  title: "welcome to agave azul official website",
  subTitle: "Before you see our unique and delicious products, please confirm than you are 18 years old or older",
  buttonText: "enter",
  checkText: "Do you want to keep your information on this computer?",
  footerText: 'Enter this site only you are of legal drinking age.by clicking "enter", you agree to the terms of use & the privacy policy of this site'
};
var isIphone = /(iPhone)/i.test(navigator.userAgent);
var isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);

if (isIphone && isSafari) {
  document.body.classList.add("safari");
}
/*eduardo.gutierrez.montiel@gmail.com

inotek2019*/


var container = document.getElementById("container");
var lang = sessionStorage.getItem("language");
var access = sessionStorage.getItem("access");

var actionLang = function actionLang(container) {
  var flags = Array.from(container.querySelectorAll("a"));
  var data;
  flags.map(function (img) {
    img.addEventListener("click", function (e) {
      e.preventDefault();
      lang = e.target.dataset.lang;
      showScreenAgeGate(container, lang);
    });
  });
};

var showScreenLanguage = function showScreenLanguage(container, lang) {
  var languageContainer = document.createElement("div");
  languageContainer.id = "languageContainer";
  languageContainer.className = "languageContainer";
  languageContainer.innerHTML = "\n    <p class=\"textCenter textUppercase language\">Por favor seleccione un idioma  /  please select a Language</p>\n    <div class=\"flags-container\">\n        <a href=\"/es\" data-lang=\"es\">Espa\xF1ol</a>\n        <a href=\"/en\" data-lang=\"en\">English</a>\n    </div>\n  ";
  container.appendChild(languageContainer);
  actionLang(container);
};

var showScreenAgeGate = function showScreenAgeGate(container, lang) {
  var flagScreen = document.querySelector("#languageContainer");
  var text;
  if (lang === "es") text = textEs;
  if (lang === "en") text = textEn;
  var ageGateElement = document.createElement("div");
  ageGateElement.id = "ageContainer";
  ageGateElement.className = "ageContainer";
  ageGateElement.innerHTML = "\n    <h1 class=\"title\">".concat(text.title, "</h1>\n    <p class=\"subTitle\">").concat(text.subTitle, "</p>\n    <form action=\"#\" id=\"form\" class=\"form\">\n        <div class=\"form-container\">\n            <div class=\"input-group four\">\n                <label for=\"year\">").concat(text.year, "</label>\n                <div class=\"input-container space-4\">\n                    <input type=\"text\" max=\"2020\" maxlength=\"4\" name=\"year\" id=\"year\">\n                </div>\n            </div>\n            <div class=\"input-group space-2 tow\"\">\n                <label for=\"month\">").concat(text.month, "</label>\n                <div class=\"input-container\">\n                    <input class=\"moth-input\" type=\"text\" max=\"12\" maxlength=\"2\" name=\"moth\"  id=\"month\">\n                </div>\n            </div>\n            <div class=\"input-group space-2 tow\">\n                <label for=\"day\">").concat(text.day, "</label>\n                <div class=\"input-container\">\n                    <input class=\"day-input\" type=\"text\" max=\"31\" maxlength=\"2\" name=\"day\"  id=\"day\">\n                </div>\n            </div>\n        </div>\n        <div class=\"check-group\">\n            <input type=\"checkbox\" id=\"checkBox\">\n            <label for=\"checkBox\">").concat(text.checkText, "</label>            \n        </div>\n        <button type=\"submit\" id=\"enter\" class=\"btn\">").concat(text.buttonText, "</button>\n    </form>\n    <p class=\"textFooter\">").concat(text.footerText, "</p>\n  ");
  flagScreen.remove();
  container.appendChild(ageGateElement);
  ageScreenActions(container, lang, ageGateElement);
};

var ageScreenActions = function ageScreenActions(container, lang, ageGateScreen) {
  var form = ageGateScreen.querySelector("form");
  var inputs = Array.from(form.querySelectorAll("input"));
  var dateInput = [];
  var total;
  inputs.forEach(function (input, i) {
    input.addEventListener("keyup", function (e) {
      i > 0 ? total = 2 : total = 4;

      if (input.value.length === total) {
        if (i === 2) {
          inputs[i].blur();
          dateInput.push(parseInt(input.value));
        } else {
          inputs[i + 1].focus();
          dateInput.push(parseInt(input.value));
        }
      }

      if (!/^([0-9])*$/.test(input.value)) {
        input.value = "";
        input.focus();
      }
    });
  });
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (dateInput.length === 3) {
      if (dateInput[1] > 12 || dateInput[2] > 31) {
        inputs.map(function (inp) {
          return inp.value = "";
        });
        inputs[0].focus();
      } else {
        verifyAge(lang, dateInput, inputs);
      }
    }
  });
};

var verifyAge = function verifyAge(lang, dateInput, inputs) {
  // console.log(lang)
  var now = new Date();
  var birdDay = new Date(dateInput[0], dateInput[1] - 1, dateInput[2]);
  console.log(getYears(now - birdDay));

  if (getYears(now - birdDay) > 18) {
    var form = document.querySelector('form');
    var checkBoxIn = form.querySelector('#checkBox');
    console.log(checkBoxIn.checked);

    if (checkBoxIn.checked) {
      localStorage.setItem("access", "true");
      localStorage.setItem("lang", lang);
    } else {
      sessionStorage.setItem("access", "true");
    }

    if (lang === "es") location.href = "/es";
    if (lang === "en") location.href = "/en";
  }
};

showScreenLanguage(container); // if (!lang) {
// }else{
//   showScreenAgeGate(lang)
// }

var getSecond = function getSecond(ms) {
  return Math.round(ms / 1000);
};

var getMinutes = function getMinutes(ms) {
  return getSecond(ms) / 60;
};

var getHours = function getHours(ms) {
  return getMinutes(ms) / 60;
};

var getDays = function getDays(ms) {
  return getHours(ms) / 24;
};

var getYears = function getYears(ms) {
  return getDays(ms) / 365;
};

},{"./modules/isMobile":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMobile = void 0;
var isMobile = {
  mobilecheck: function mobilecheck() {
    return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|android|ipad|playbook|silk/i.test(navigator.userAgent || navigator.vendor || window.opera) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test((navigator.userAgent || navigator.vendor || window.opera).substr(0, 4));
  }
};
exports.isMobile = isMobile;

},{}]},{},[1]);

//# sourceMappingURL=scripts-min.js.map
