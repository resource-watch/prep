export const STATE_DEFAULT = {
  step: 1,
  stepLength: 1,
  submitting: false,
  loading: false,
  partners: [],
  form: {
    // STEP 1
    title: '',
    slug: '',
    template_type: 0,
    summary: '',
    content: '',
    image: '',
    content_url: '',
    partner: {},
    partner_id: null,
    attribution: false,
    published: false,
    embeddable: false
  }
};

export const FORM_ELEMENTS = {
  elements: {
  },
  validate() {
    const elements = this.elements;
    Object.keys(elements).forEach((k) => {
      elements[k].validate();
    });
  },
  isValid() {
    const elements = this.elements;
    const valid = Object.keys(elements)
      .map(k => elements[k].isValid())
      .filter(v => v !== null)
      .every(element => element);

    return valid;
  }
};

export const TEMPLATE_TYPES = [
  { label: 'Custom', value: 0 },
  { label: 'Template 1', value: 1 },
  { label: 'Template 2', value: 2 }
];
