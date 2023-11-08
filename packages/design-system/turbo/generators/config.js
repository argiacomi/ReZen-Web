const fs = require('fs');

// eslint-disable-next-line import/no-default-export -- Turbo generators require default export
module.exports = function generator(plop) {
  plop.setGenerator('react-component', {
    description: 'Adds a new react component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the component?'
      },
      {
        type: 'input',
        name: 'path',
        message: 'What is the directory path for the component?'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'components/{{path}}/{{pascalCase name}}/{{pascalCase name}}.jsx',
        templateFile: 'templates/component.hbs'
      },
      {
        type: 'add',
        path: 'components/{{path}}/{{pascalCase name}}/index.jsx',
        template:
          '"use client"\nexport { default as {{pascalCase name}} } from "./{{pascalCase name}}";\nexport * from "./{{pascalCase name}}";'
      },
      {
        type: 'add',
        path: 'components/{{path}}/index.jsx',
        template: 'export * from "./{{pascalCase name}}";',
        skipIfExists: true
      },
      function appendUniqueExport(answers) {
        const fullPath = `components/${answers.path}/index.jsx`;
        let fileContents = fs.readFileSync(fullPath, 'utf8');
        if (!fileContents.includes(`export * from "./${answers.name}";`)) {
          fileContents += `\nexport * from "./${answers.name}";`;
          fs.writeFileSync(fullPath, fileContents);
        }
        return;
      },
      {
        type: 'add',
        path: 'components/index.jsx',
        template: 'export * from "./{{path}}";',
        skipIfExists: true
      },
      function appendUniqueExport(answers) {
        const fullPath = 'components/index.jsx';
        let fileContents = fs.readFileSync(fullPath, 'utf8');
        if (!fileContents.includes(`export * from "./${answers.path}";`)) {
          fileContents += `\nexport * from "./${answers.path}";`;
          fs.writeFileSync(fullPath, fileContents);
        }
        return;
      }
    ]
  });
};
