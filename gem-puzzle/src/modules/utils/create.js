export default function create(el, classNames, child, parent) {
  let elem = null;
  try {
    elem = document.createElement(el);
  } catch (e) {
    throw new Error('Unable to create HTMLElemnt! Wrong data');
  }

  if (classNames) elem.classList.add(...classNames.split(' '));

  if (child && Array.isArray(child)) {
    child.forEach((childElem) => childElem && elem.appendChild(childElem));
  } else if (child && typeof child === 'object') {
    elem.appendChild(child);
  } else if (child && typeof child === 'string') {
    elem.innerHTML = child;
  }

  if (parent) {
    parent.appendChild(elem);
  }
  return elem;
}
