'use babel';
import SelectListView from 'atom-select-list'

/**
 * Dialog for selecting a single option in a list of options
 */
export default class SelectDialog {

  /**
   * Creates the dialog
   *
   * @param {array} items
   * @param {function} mapFunction
   */
  constructor(items, mapFunction) {
    this.items = items;
    this.mapFunction = mapFunction != undefined ? mapFunction : (item) => item;
  }

  /**
   * Shows the dialog
   *
   * @return {Promise} promise
   */
  show() {
    let confirmPromise = new Promise((resolve, reject) => {
      let selectListView = new SelectListView({
        items: this.mapItems(),
        maxResults: 10,
        emptyMessage: "No items",
        didCancelSelection: () => this.cancel(reject),
        didConfirmSelection: (item) => this.confirm(resolve, item.original),
        didConfirmEmptySelection: () => this.cancel(reject),
        elementForItem: (item) => this.buildElementForItem(item)
      });
      this.bottomPanel = atom.workspace.addModalPanel({
        item: selectListView.element
      });
      selectListView.focus();
    });
    return confirmPromise;
  }

  /**
   * Maps the array of items using the mapping function
   *
   * @return {array} mapped items
   */
  mapItems() {
    return this.items.map((item) =>  {
      let mapped = this.mapFunction(item);
      mapped.original = item;
      return mapped;
    })
  }

  /**
   * Builds the DOM element for the item
   *
   * @param {object} item
   * @return {Element} element
   */
  buildElementForItem(item) {
    const li = document.createElement('li')
    li.classList.add('two-lines')
    const primaryLine = document.createElement('div')
    primaryLine.classList.add('primary-line', 'file', 'icon', item.icon)
    primaryLine.appendChild(document.createTextNode(item.name))
    li.appendChild(primaryLine)
    const secondaryLine = document.createElement('div')
    secondaryLine.classList.add('secondary-line', 'path', 'no-icon')
    secondaryLine.appendChild(document.createTextNode(item.description))
    li.appendChild(secondaryLine)
    return li;
  }

  /**
   * Confirms the selection
   *
   * @param {function} resolve
   * @param {object} item
   */
  confirm(resolve, item) {
    this.bottomPanel.hide();
    resolve(item);
  }

  /**
   * Cancels the selection
   *
   * @param {function} reject
   */
  cancel(reject) {
    this.bottomPanel.hide();
    reject();
  }

}
