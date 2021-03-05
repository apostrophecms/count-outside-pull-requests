"Hey cool, people are contributing PRs to our projects!"

"How many PRs aren't from our team?"

```
git clone https://github.com/apostrophecms/count-outside-pull-requests
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

## Changelog

1.2.0: automatically excludes org members unless `team` is explicitly configured. To use this option effectively your token must have read access to the members list.

1.1.0: `orgs` config option to check all repos in those orgs.
