// TravelDeals - Booking confirmed: copy reference + "Ticket downloaded" toast
document.addEventListener('DOMContentLoaded', function () {
  var copyBtn = document.getElementById('copyRef');
  var downloadBtn = document.getElementById('downloadTicket');
  var toastEl = document.getElementById('ticketToast');

  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var ref = copyBtn.getAttribute('data-ref');
      var mark = function () {
        copyBtn.classList.add('is-copied');
        copyBtn.setAttribute('aria-label', 'Booking reference copied');
        setTimeout(function () {
          copyBtn.classList.remove('is-copied');
          copyBtn.setAttribute('aria-label', 'Copy booking reference');
        }, 1500);
      };
      if (navigator.clipboard) {
        navigator.clipboard.writeText(ref).then(mark, function () {});
      }
    });
  }

  if (downloadBtn && toastEl && window.bootstrap) {
    downloadBtn.addEventListener('click', function (e) {
      if (downloadBtn.getAttribute('href') === '#') { e.preventDefault(); }
      bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 4000 }).show();
    });
  }
});
