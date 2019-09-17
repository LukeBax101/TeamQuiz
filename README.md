Initial Setup:

1. Install nodejs
2. Install npm
3. Clone git repo
4. Open cmd (Windows) or terminal (mac/linux)
5. Navigate to /teamquiz directory (using ``` cd ``` command)
6. Run ``` npm install ```
7. Navigate to /teamquiz/dev
8. Run ``` npm install ``` again


How to run/deploy:
  Three ways to run/build/test/deploy changes: (ordered from easiest to see changes/least similar to the cloud -> hardest to see changes/ most similar to the cloud )

  1.
    a. Open 2 cmd windows/terminals
    b. Navigate both to /teamquiz/dev
    c. Run ``` npm run serve ``` in one.
    d. Run ``` npm run express ``` in the other.
    e. Go to localhost:8080 in browser to see app.

        (note: changes to code should take effect on save)


  2.
    a. Open a cmd window/terminal
    b. Navigate to /teamquiz/dev
    c. Run ```npm run build ```
    d. Navigate to /teamquiz (i.e run ``` cd .. ```)
    e. Run ```npm run start```
    f. Go to localhost:1337 in browser to see app.

        (note: This emulates what the cloud is doing locally)

  3.
    a. Open a cmd window/terminal
    b. Navigate to /teamquiz/dev
    c. Run ```npm run build ```
    d. Commit and push the changes to GitHub
    e. Go to samandamywedding.com in browser to see app.

      (note: deployment can take a couple of minutes, log into Azure to see progress)
      (note: If a new dependency has been introduced it will need to be installed from the Azure terminal separately)
