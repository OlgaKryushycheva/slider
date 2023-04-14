import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchInputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

searchInputEl.addEventListener(
  'input',
  debounce(onSearchCountry, DEBOUNCE_DELAY)
);
function onSearchCountry() {
  const searchQuery = searchInputEl.value.trim();

  if (searchQuery.length === 0) {
    clearRander();
    return;
  } else if (searchQuery.length > 0) {
    fetchCountries(searchQuery)
      .then(data => {
        if (data.length > 10) {
          clearRander();
          throw Notiflix.Notify.info(
            `Too many matches found. Please enter a more specific name.`
          );
        } else if (data.length > 1 && data.length <= 10) {
          countryInfoEl.innerHTML = '';

          let countryCollectionArr = [];
          let countryCollection;

          for (let i = 0; i < data.length; i++) {
            let name = data[i].name.official;
            let flag = data[i].flags.svg;

            const markupCountryList = ` <li class="country-item">
          <img
            src="${flag}"
            alt="flag"
            width="25"
            height="20"
          />
          <p class="country-name">${name}</p>
        </li>`;

            countryCollectionArr.push(markupCountryList);
            countryCollection = countryCollectionArr.join('');
          }

          countryListEl.innerHTML = countryCollection;
        } else {
          countryListEl.innerHTML = '';

          let dataSity = data[0];
          let name = dataSity.name.official;
          let flag = dataSity.flags.svg;
          let capital = dataSity.capital[0];
          let languages = Object.values(dataSity.languages).join(', ');
          let population = dataSity.population;

          const markupCountryInfo = `<div class="country-title">
          <img
            src="${flag}"
            alt="flag"
            width="30"
            height="25"
          />
          <p>${name}</p>
        </div>
        <p class="country-descr">
          <span class="country-field">Capital: </span>${capital}
        </p>
        <p class="country-descr">
          <span class="country-field">Population: </span>${population}
        </p>
        <p class="country-descr">
          <span class="country-field">Languages: </span>${languages}
        </p>`;

          countryInfoEl.innerHTML = markupCountryInfo;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
}

export function clearRander() {
  countryListEl.innerHTML = '';
  countryInfoEl.innerHTML = '';
}

console.log('TEST');

// ==========================================================
// спроба зробити окремі функції по створенню розмітки

// function makeCountryInfo(flag, name, capital, population, languages) {
//   countryInfoEl.innerHTML = ` <div class="country-title">
//         <img
//           src="${flag}"
//           alt="flag"
//           width="25"
//           height="20"
//         />
//         <p>${name}</p>
//       </div>

//       <p class="country-descr">
//         <span class="country-field">Capital: </span>${capital}
//       </p>
//       <p class="country-descr">
//         <span class="country-field">Population: </span>${population}
//       </p>
//       <p class="country-descr">
//         <span class="country-field">Languages: </span>${languages}
//       </p>`;

//   // countryInfoEl.innerHTML = markupCountryInfo;
// }

// const markup = ` <div class="country-title">
//         <img
//           src="${flag}"
//           alt="flag"
//           width="25"
//           height="20"
//         />
//         <p>${name}</p>
//       </div>

//       <p class="country-descr">
//         <span class="country-field">Capital: </span>${capital}
//       </p>
//       <p class="country-descr">
//         <span class="country-field">Population: </span>${population}
//       </p>
//       <p class="country-descr">
//         <span class="country-field">Languages: </span>${languages}
//       </p>`;

// // console.log(markup);
