# Monthly planner

## Deployment
```npm run build``` creates a build directory with a production build of your app.

### Static Server
For environments using Node install `serve` 

```
npm install -g serve
serve -s build
```
The last command shown above will serve your static site on the port 3000. Like many of serve’s internal settings, the port can be adjusted using the -l or --listen flags:

```serve -s build -l 4000```