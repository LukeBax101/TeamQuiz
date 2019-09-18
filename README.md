## Initial Setup ##

1. Install nodejs
2. Install npm
3. Clone git repo
4. Open cmd (Windows) or terminal (mac/linux)
5. Navigate to /teamquiz directory (using ` cd ` command)
6. Run ` npm install `
7. Navigate to /teamquiz/dev
8. Run ` npm install ` again


## How to run/deploy ##

  Three ways to run/build/test/deploy changes: _(ordered from easiest to see changes/least similar to the cloud -> hardest to see changes/ most similar to the cloud)_

1.
    1. Open 2 cmd windows/terminals
    2. Navigate both to /teamquiz/dev
    3. Run ` npm run serve ` in one.
    4. Run `npm run express ` in the other.
    5. Go to localhost:8080 in browser to see app.


_(note: changes to code should take effect on save)_

2.
    1. Open a cmd window/terminal
    2. Navigate to /teamquiz/dev
    3. Run `npm run build `
    4. Navigate to /teamquiz (i.e run ``` cd .. ```)
    5. Run `npm run start`
    6. Go to localhost:1337 in browser to see app.


  _(note: This emulates what the cloud is doing locally)_

3.
    1. Open a cmd window/terminal
    2.  Navigate to /teamquiz/dev
    3. Run `npm run build `
    4. Commit and push the changes to GitHub
    5. Go to samandamywedding.com in browser to see app.


_(note: deployment can take a couple of minutes, log into Azure to see progress)_

_(note: If a new dependency has been introduced it will need to be installed from the Azure terminal separately)_
