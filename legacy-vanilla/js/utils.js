export const DOMUtils = {
  /**
   * Creates an HTML element with classes and attributes
   */
  createElement: (tag, className = '', attributes = {}) => {
    const el = document.createElement(tag);
    if (className) {
      el.className = className;
    }
    for (const [key, value] of Object.entries(attributes)) {
      el.setAttribute(key, value);
    }
    return el;
  },

  /**
   * Clears all child nodes from an element
   */
  clearContainer: (container) => {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }
};

export const formatDuration = (minutes) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
};
