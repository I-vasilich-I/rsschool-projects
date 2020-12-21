import {
  createCountryContainer,
  createDetailContainer,
  table,
  tableCountries,
} from './createTable';
import { createDomElement, sortByProperty } from './utils/helpers';
import createTableTabs from './createTableTabs';
import * as Constants from './Constants';
import { createListCountryContainer, listCountries } from './createList';

export function getPropertiesByType(type) {
  const obj = {};
  if (this) obj.Country = this.targetCountry.Country;
  let title = '';
  let property = '';
  let className = '';
  let typeForMap = Constants.TYPE_CASE;
  if (type === 'tab-confirmed') {
    property = 'TotalConfirmed';
    title = 'Total confirmed:';
    className = 'confirmed';
    typeForMap = Constants.TYPE_CASE;
  }
  if (type === 'tab-deaths') {
    property = 'TotalDeaths';
    title = 'Total deaths:';
    className = 'deaths';
    typeForMap = Constants.TYPE_DEATH;
  }
  if (type === 'tab-recovered') {
    property = 'TotalRecovered';
    title = 'Total recovered:';
    className = 'recovered';
    typeForMap = Constants.TYPE_RECOVERED;
  }
  if (type === 'tab-total') {
    obj.TotalConfirmed = this.targetCountry.TotalConfirmed;
    obj.TotalDeaths = this.targetCountry.TotalDeaths;
    obj.TotalRecovered = this.targetCountry.TotalRecovered;
    property = 'Total';
    title = 'Total cases:';
    className = 'confirmed';
  }
  if (type === 'tab-total100K') {
    obj.TotalConfirmed = this.targetCountry.TotalConfirmedPer100K;
    obj.TotalDeaths = this.targetCountry.TotalDeathsPer100K;
    obj.TotalRecovered = this.targetCountry.TotalRecoveredPer100K;
    property = 'TotalPer100K';
    title = 'Total cases per 100K:';
    className = 'confirmed';
  }
  if (type === 'tab-new') {
    obj.TotalConfirmed = this.targetCountry.NewConfirmed;
    obj.TotalDeaths = this.targetCountry.NewDeaths;
    obj.TotalRecovered = this.targetCountry.NewRecovered;
    property = 'New';
    title = 'New cases:';
    className = 'confirmed';
  }
  if (type === 'tab-new100K') {
    obj.TotalConfirmed = this.targetCountry.NewConfirmedPer100K;
    obj.TotalDeaths = this.targetCountry.NewDeathsPer100K;
    obj.TotalRecovered = this.targetCountry.NewRecoveredPer100K;
    property = 'NewPer100K';
    title = 'New cases per 100K:';
    className = 'confirmed';
  }
  return { property, countryTitle: title, className, obj, typeForMap };
}
export class Table {
  constructor(covidData) {
    this.countries = covidData.Countries;
    this.targetCountry = null;
    this.global = covidData.Global;
    this.date = covidData.Date;
    this.tableCountriesArray = [];
  }

  init() {
    const containerDiv = document.querySelector('.table1-container');
    const parent = createDomElement({
      elementName: 'div',
      className: 'table__container',
      parent: containerDiv,
    });
    sortByProperty(this.countries, 'TotalConfirmed', -1);

    createDetailContainer(this.global);
    this.countries.forEach((country) => {
      this.tableCountriesArray.push(createCountryContainer(country));
    });

    this.tabs = createTableTabs();
    parent.appendChild(this.tabs.tabsDetail);
    parent.appendChild(table);
    parent.appendChild(this.tabs.tabsCountry);
    return this;
  }

  deactivateButtons(buttons, className) {
    buttons.map((element) => element.classList.remove(className));
    return this;
  }

  hideDetailButtons() {
    const { detailBtns } = this.tabs;
    this.deactivateButtons(detailBtns, 'detail__button-active');
    detailBtns.map((element) => element.classList.add('detail__button-hidden'));
  }

  showDetailButtons() {
    const { detailBtns } = this.tabs;
    detailBtns.map((element, i) => {
      element.classList.remove('detail__button-hidden');
      if (!i) element.classList.add('detail__button-active');
      return element;
    });
  }

  tabsDetailEventHandler() {
    this.tabs.tabsDetail.addEventListener('click', (event) => {
      const button = event.target.closest('.detail__button');
      if (!button) return;
      const isActive = button.classList.contains('detail__button-active');
      if (isActive) return;
      const isHidden = button.classList.contains('detail__button-hidden');
      if (isHidden) return;
      const { detailBtns } = this.tabs;
      this.deactivateButtons(detailBtns, 'detail__button-active');
      button.classList.add('detail__button-active');
      const propertys = getPropertiesByType.call(this, button.id);
      createDetailContainer(propertys.obj, false, propertys.countryTitle);
    });
  }

  tabsCountryEventHandler() {
    this.tabs.tabsCountry.addEventListener('click', (event) => {
      const button = event.target.closest('.tabs__button');
      if (!button) return;
      const isActive = button.classList.contains('tabs__button-active');
      if (isActive) return;
      const { countryBtns } = this.tabs;
      this.deactivateButtons(countryBtns, 'tabs__button-active');
      this.hideDetailButtons();
      button.classList.add('tabs__button-active');
      const propertys = getPropertiesByType(button.id);
      sortByProperty(this.countries, propertys.property, -1);
      tableCountries.innerHTML = '';
      tableCountries.className = `table__countries ${propertys.className}`;
      listCountries.innerHTML = '';
      listCountries.className = `list__countries`;
      this.list.listCountriesArray.length = 0;
      this.countries.forEach((country) => {
        this.tableCountriesArray.push(createCountryContainer(country, propertys));
        this.list.listCountriesArray.push(createListCountryContainer(country, propertys.property));
      });
      this.list.select.value = propertys.property;
      createDetailContainer(this.global);
      this.targetCountry = null;
      tableCountries.scrollTop = 0;
      this.map.changeMarkersColor(propertys.typeForMap);
    });
  }

  tabsEventHandler() {
    this.tabsCountryEventHandler();
    this.tabsDetailEventHandler();
  }

  tableCountriesEventHandler() {
    tableCountries.addEventListener('click', (event) => {
      const target = event.target.closest('.country__container');
      if (!target) return;
      const { country } = target;
      this.tableCountriesArray.forEach((element) =>
        element.classList.remove('country__container-active')
      );
      target.classList.add('country__container-active');
      this.targetCountry = country;
      createDetailContainer(country, false);
      this.list.activateListCoutnry(country);
      const { detailBtns } = this.tabs;
      this.deactivateButtons(detailBtns, 'detail__button-active');
      this.showDetailButtons();
      this.map.setPointByCountry(country.Country);
    });
    return this;
  }

  static handleListFromMap() {
    this.select.value = '';
  }

  eventHandler(blocks) {
    this.map = blocks.map;
    this.list = blocks.list;
    this.tabsEventHandler();
    this.tableCountriesEventHandler();
    return this;
  }
}
