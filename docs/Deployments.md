# Deployments

All deployments of this package must be done manually with NPM. In order to do this you will need to be added to our `@uktrade` NPM organisation (if you don't have this access, ask SRE).

## Deployment steps

1. Login to your NPM account in the terminal with ```npm login```.
2. Pull the latest `master` and run ```npm install``` to ensure dependencies are correct.
3. Run ```npm run build``` to prepare the release.
4. Update the version number in `package.json` and `package-lock.json`. Use the same numbering conventions as the FE (listed in the [FE deployment docs](https://github.com/uktrade/data-hub-frontend/blob/master/docs/Deployments.md#deploying-to-production)).
5. Run the commands ```git commit -am 'Bump to <your version number>``` and ```git tag v<your version number>```
6. Run ```npm publish --dry-run``` to ensure that the release is as you expect.
7. If you are happy with the above output, run ```npm publish```. The new version should now appear on the [NPM page](https://www.npmjs.com/package/@uktrade/datahub-header).
8. Publish the new release to GitHub with the commands ```git push``` and ```git push --tags```.
9. Create a GitHub release using your tag.

## Rolling out changes

After a deployment, this package will need to be updated in the [DH frontend](https://github.com/uktrade/data-hub-frontend) and [Find Exporters](https://github.com/uktrade/data-science-frontend). The version used in the [legacy MI Dashboards site](https://github.com/uktrade/export-wins-ui-mi) should **not** be changed.

Any changes to the header in Market Access projects have historically been carried out by their own developers, as they have a separate implementation of the global header. In order to facilitate these changes, notify their DM/PM outlining the changes (and if possible, provide a link to a live example of the latest header version).
