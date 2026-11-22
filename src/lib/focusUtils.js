export function focusableElements(container) {
  return [...(container?.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]') || [])]
    .filter((element) => !element.closest("[inert]") && element.getClientRects().length > 0);
}

export function cycleFocus(event, elements) {
  if (event.key !== "Tab" || !elements.length) return;
  event.preventDefault();
  const index = elements.indexOf(document.activeElement);
  const next = index === -1 ? (event.shiftKey ? elements.length - 1 : 0) : (index + (event.shiftKey ? -1 : 1) + elements.length) % elements.length;
  elements[next].focus();
}
