# Data Hub header component
An npm module for the Data Hub header component. This provides a nunjucks macro that will take the `permitted_applications` from SSO and render the header. There are some additional options for more functionality.

This is published under the `@uktrade` scope in NPM. To install: ```npm install --save @uktrade/datahub-header```

## Nunjucks
If you add `node_modules/@uktrade` to the configure option of nunjucks:
```js
nunjucks.configure( [
	`${__dirname}/views`,
	`node_modules/@uktrade`,
] );
```

You can import into your template with `{% from 'datahub-header/component/header.njk' import datahubHeader %}` and call the macro to render the header:
```
{{ datahubHeader( user.permitted_applications ) }}
```

### Additional options for the macro
There are several options to control the items in the header.

- __active__ - The `key` to mark as the active nav item in the top level navigation
- __fluid__ - Stop the header from being fluid - fix to 960px wide and center
- __signout__ - Specify a different signout url
- __domains__ - Override the default domains for each app in the macro.
	- __datahub__ - The Data Hub CRM domain
	- __mi__ - The MI domain
	- __findExporters__ - The Find Exporters domain
	- __marketAccess__ - The Market Access domain
- __user__ - Specify some info about the user
	- __name__ - The name to display in the top right of the header
- __subNavigation__ - An array of items to display in the sub navigation
	- __text__ - The text to display for the item
	- __href__ - The url the text should link to
	- __active__ - (Bool) - Whether to mark the item as active
- __attributes__ - An array of attributes to add to the `<header>` element - GOVUK frontend style
- __navigationClasses__ - An space separated list of classes to add the top level navigation `<ul>` element


## SASS
After installation you need to add the CSS and JS to your app. If using SASS you should be able to `@import 'node_modules/@uktrade/datahub-header/component/header';`

## JS
Similarly, the path to the JS file for inclusion in your bundler should be `node_modules/@uktrade/datahub-header/component/header.js`


