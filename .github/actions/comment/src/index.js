const core = require('@actions/core');
const github = require('@actions/github');

const commentIssue = (octokit, context, message) => {
  if (context.payload.issue == null) {
    core.setFailed('No issue found.');
    return;
  }

  const issueNumber = context.payload.issue.number;

  octokit.issues.createComment({
    ...context.repo,
    issue_number: issueNumber,
    body: message,
  });
};

const commentPullRequest = (octokit, context, message) => {
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
};

const run = async () => {
  try {
    const token = core.getInput('token');
    const type = core.getInput('type');
    const message = core.getInput('message');

    if (!message) {
      core.setFailed('"message" input not found.');
      return;
    }

    // eslint-disable-next-line new-cap
    const octokit = new github.getOctokit(token);
    const context = github.context;

    if (type === 'issue') commentIssue(octokit, context, message);
    if (type === 'pr') commentPullRequest(octokit, context, message);
  } catch (error) {
    core.setFailed(error.message);
  }
};

run();
