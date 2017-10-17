"Hey cool, people are contributing PRs to our projects!"

"How many PRs aren't from our team?"

```
git clone https://github.com/punkave/count-outside-pull-requests
npm install
cp config-example.js config.js
# edit that jawn, then...
node app
```

"How about in the last quarter?"

```
node app --from=2017-07-01 --to=2017-10-01
```

*The `--to` option is "up to but not including," so this is correct.*
