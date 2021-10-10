const core = require('@actions/core');
const github = require('@actions/github');

const commentIssue = (context, token, message) => {
  if (context.payload.issue == null) {
    core.setFailed('No issue found.');
    return;
  }

  const issueNumber = context.payload.issue.number;
  const octokit = new github.getOctokit(token);

  octokit.issues.createComment({
    ...context.repo,
    issue_number: issueNumber,
    body: message,
  });
};

// const commentPullRequest = (context, token, message) => {
//   if (context.payload.pull_request == null) {
//     core.setFailed('No pull_request found.');
//     return;
//   }

//   const octokit = new github.getOctokit(token);
//   const prNumber = context.payload.pull_request.number;

//   octokit.issues.createComment({
//     ...context.repo,
//     issue_number: prNumber,
//     body: message
//   });
// };

const run = async () => {
  try {
    const context = github.context;
    const token = core.getInput('token');
    const type = core.getInput('type');
    const message = core.getInput('message');
    const octokit = new github.getOctokit(token);

    if (!message) {
      core.setFailed('"message" input not found.');
      return;
    }

    // if (type === 'issue') commentIssue(context, token, message);
    // if (type === 'pr') commentPullRequest(context, token, message);

    if (type === 'pr') {
      if (context.payload.pull_request == null) {
        core.setFailed('No pull_request found.');
        return;
      }

      const prNumber = context.payload.pull_request.number;
      octokit.issues.createComment({
        ...context.repo,
        issue_number: prNumber,
        body: message
      });
    }
  } catch (error) {
    core.setFailed(error.message);
  }
};

run();
