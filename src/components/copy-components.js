document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".copy").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      const parent = btn.closest(".component-wrapper");
      if (!parent) return;
      // Clone the parent and remove the button
      const clone = parent.cloneNode(true);
      const btnInClone = clone.querySelector(".copy");
      if (btnInClone) btnInClone.remove();
      // Get the HTML (inner part only)
      const html = clone.innerHTML.trim();
      // Copy to clipboard
      if (navigator.clipboard) {
        navigator.clipboard.writeText(html);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement("textarea");
        textarea.value = html;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
    });
  });
});
