module.exports = {

  // You can also give an "orgs" array, which will check *all*
  // repos belonging to those orgs.
  orgs: [ 'apostrophecms', 'punkave' ],
  
  // Automatically excludes all members of the above orgs, so we don't count
  // internal PRs
  
  // OR, enumerate your team members by hand
  // team: [ 'you', 'someotherperson' ],
  
  // This must be a github API access token.
  // See: https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/
  //
  // If you want to automatically exclude private members of your
  // organization from the list of PR authors, you will need to
  // grant the privilege of reading org membership, otherwise
  // no privileges are needed.
  token: 'abc'
};
