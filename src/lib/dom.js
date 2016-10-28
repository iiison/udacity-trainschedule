/**
 * inserts a child textNode into the previous element, based on the current elements validationMessage and title properties
 * @method setPreviousElementError
 * @param  {HTMLElement} el an element with a validationMessage and title property
 */
export const setPreviousElementError = (el) =>
  el.previousSibling.firstElementChild.innerHTML = `${el.validationMessage}<br />${el.title}`;

/**
 * inserts a child textNode into an element, based on another elements validationMessage
 * @method clearPreviousElementError
 * @param  {[type]}                  el [description]
 * @return {[type]}                  [description]
 */
export const clearPreviousElementError = (el) =>
  el.previousSibling.firstElementChild.innerHTML = el.validationMessage;

export const setFirstChildElementError = (el, msg = false) =>
  el.querySelector('.error').innerHTML = msg || 'Please correct all errors before continuing';

export const clearFirstChildElementError = (el, msg = false) =>
  el.querySelector('.error').innerHTML = msg || '';

export const checkValidOnBlur = (e, setError = false) => {
  const el = e.currentTarget;
  if (el.willValidate && !el.validity.valid) {
    el.className = 'has-error';
    if (setError) setPreviousElementError(el);

    return false;
  }

  el.className = '';
  if (setError) clearPreviousElementError(el);

  return true;
};

/**
 * set innner html and data attribute
 * @method setNextInnerHtml
 * @param  {[type]}         el   [description]
 * @param  {[type]}         data [description]
 * @param  {[type]}         str  [description]
 */
export const setNextInnerHtml = (el, abbr, str) => {
  if (!el) return false;
  if (!abbr) {
    el.nextElementSibling.innerHTML = '';
    el.nextElementSibling.dataset.abbr = '';

    return false;
  }

  el.nextElementSibling.dataset.abbr = abbr;
  el.nextElementSibling.innerHTML = str || 'more';

  return el;
};
