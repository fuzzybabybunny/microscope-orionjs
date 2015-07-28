orion.dictionary.addDefinition('title', 'mainPage', {
    type: String,
    label: 'Site Title',
    optional: false,
    min: 1,
    max: 40
});

orion.dictionary.addDefinition('description', 'mainPage', orion.attribute('summernote', {
    label: 'Site Description',
    optional: true
  })
);

orion.dictionary.addDefinition('termsAndConditions', 'submitPostPage', orion.attribute('summernote', {
    label: 'Terms and Conditions',
    optional: true
  })
);