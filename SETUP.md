---
yamlIgnored: true
key: 1234567
client_id: kjasfasdflkj
---

# Setup
Make sure you are in the root of the projects working directory.

> To run commands on a specific subrepo use the 'filter' flag:
> `pnpm --filter=docs add axios`



## Install All Dependencies
Clear the old `node_modules` and install deps for all packages within this monorepo

```bash
pnpm run clean
pnpm install
```




## Running in Development
Run the 'dev' script to watch for changes with nodemon and trigger a rebuild with turbo

```bash
pnpm run dev
```

## Testing the Packages (not implemented)
Run the 'test' script to test all packages

```bash
pnpm run test
```



## Creating and Releasing Tags

1. Create a new changeset (track the changes since last commit). 
   
Select the changed packages and the appropriate version bump, then provide a summary. 
This summary will appear in the changelog.

This command consumes all changesets and updates to the most appropriate semver version based on 
those changesets. It also writes changelog entries for each consumed changeset.

```bash
npx changeset
```

2. Bump package versions
   
Now that the packages have info about the next intended versions - bump them with:

```bash
npx changeset version
```

3. Commit the changes and changeset


```bash
git add .
git commit -m 'Ready to publish'
```
 
4. Create an annotated tag with a message. Try to match highest package version to release/tag version

```bash
git tag -a v1.2.3 -m "Release version 1.2.3"
```

5. Push the changes

```bash
git push origin main --follow-tags
```
