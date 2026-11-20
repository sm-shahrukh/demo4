(() => {
  const form = document.getElementById('travellerForm');
  const modal = document.getElementById('reviewModal');
  if (!form || !modal) return;

  const fields = ['firstName', 'lastName', 'dob', 'nationality', 'passportNo', 'passportExpiry'];
  const saved = {
    saved1: { firstName: 'Ahsan', lastName: 'Khan', dob: '1990-04-12', nationality: 'PK', passportNo: 'AW7359282', passportExpiry: '2030-08-15' },
    saved2: { firstName: 'Sara', lastName: 'Khan', dob: '1992-06-20', nationality: 'PK', passportNo: 'BV4829173', passportExpiry: '2031-06-20' }
  };
  // Keep edits when switching between the saved travelers during this visit.
  let current = 'saved1';
  form.querySelectorAll('[name="savedTraveller"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      fields.forEach((id) => { saved[current][id] = document.getElementById(id).value; });
      current = radio.id;
      fields.forEach((id) => { document.getElementById(id).value = saved[current][id]; });
    });
  });

  modal.addEventListener('show.bs.modal', () => {
    const sections = modal.querySelectorAll('.td-review-traveller');
    if (sections.length) {
      fields.forEach((id) => { saved[current][id] = document.getElementById(id).value; });
      const nationality = document.getElementById('nationality');
      const date = (value) => value ? new Date(value + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Not provided';
      sections.forEach((section, index) => {
        const person = saved[index === 0 ? 'saved1' : 'saved2'];
        section.querySelector('.td-review-name span').textContent = [person.firstName, person.lastName].filter(Boolean).join(' ') || 'Traveller';
        const option = Array.from(nationality.options).find((item) => item.value === person.nationality);
        const values = [date(person.dob), option ? option.text : 'Not provided', person.passportNo || 'Not provided', date(person.passportExpiry)];
        section.querySelectorAll('.td-review-list dd').forEach((item, i) => { item.textContent = values[i]; });
      });
      return;
    }
    const value = (id) => document.getElementById(id).value;
    const date = (id) => value(id) ? new Date(value(id) + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Not provided';
    modal.querySelector('.td-review-name').textContent = [value('firstName'), value('lastName')].filter(Boolean).join(' ') || 'Traveller';
    const nationality = document.getElementById('nationality');
    const values = [date('dob'), nationality.value ? nationality.options[nationality.selectedIndex].text : 'Not provided', value('passportNo') || 'Not provided', date('passportExpiry')];
    modal.querySelectorAll('.td-review-list dd').forEach((item, index) => { item.textContent = values[index]; });
  });
})();
