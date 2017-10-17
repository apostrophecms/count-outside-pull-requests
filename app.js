const config = require('./config.js');
const Promise = require('bluebird');
const request = require('request-promise');
const _ = require('lodash');
const qs = require('qs');
const argv = require('boring')();
const fs = require('fs');
const results = {};

Promise.each(config.repos, processRepo)
.then(function() {
  let repos = _.keys(results);
  repos.sort(function(a, b) {
    if (results[a] > results[b]) {
      return -1;
    } else if (results[b] > results[a]) {
      return 1;
    } else {
      return 0;
    }
  });
  let grandTotal = 0;
  _.each(repos, function(repo) {
    const pulls = results[repo];
    console.log('* * * ' + repo + '\n');
    console.log('Total PRs: ' + pulls.length);
    grandTotal += pulls.length;
    pulls.sort(function(a, b) {
      var a = a.user && a.user.login;
      var b = b.user && b.user.login;
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    });
    _.each(pulls, function(pull) {
      console.log(pull.user && pull.user.login);
      console.log(pull.title);
      console.log(pull.created_at);
      console.log(pull.html_url);
      console.log();
    });
  });
  console.log('\nGRAND TOTAL: ' + grandTotal);
})
.catch(function(err) {
  console.error(err);
  process.exit(1);
});

function processRepo(repo) {
  return processRepoPage(repo, 1);
}

function processRepoPage(repo, page) {
  const params = {
    state: 'all',
    access_token: config.token,
    page: page
  }
  let url = 'https://api.github.com/repos/' + repo + '/pulls?' + qs.stringify(params);
  console.log(url);
  return request(url, { 
    json: true,
    headers: {
      'User-Agent': 'count-outside-pull-requests'
    },
  })
  .then(function(pulls) {
    pulls.forEach(function(pull) {
      if (argv.from) {
        if (pull.created_at < argv.from) {
          return;
        }
      }
      if (argv.to) {
        if (pull.created_at > argv.to) {
          return;
        }
      }
      if (!_.includes(config.team, pull.user && pull.user.login)) {
        results[repo] = results[repo] || [];
        results[repo].push(pull);
      }
    });
    if (pulls.length) {
      return processRepoPage(repo, page + 1);
    }
    return true;
  });
}

