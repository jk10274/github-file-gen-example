const { Octokit } = require("@octokit/rest");
const { Base64 } = require("js-base64");
const fs = require("fs");

require("dotenv").config();

const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
});

export default (req, res) => {

    try {
        const content = "Lorem Ipsum Dolor";
        const contentEncoded = Base64.encode(content);

        const { data } = octokit.repos.createOrUpdateFileContents({
        // replace the owner and email with your own details
        owner: "jk10274",
        repo: "github-file-gen-example",
        path: "pages/posts/test-final.md",
        message: "Lorem ipsum",
        content: contentEncoded,
        committer: {
            name: `jk10274`,
            email: "account.jk@protonmail.com",
        },
        author: {
            name: "jk10274",
            email: "account.jk@protonmail.com",
        },
        });

        console.log(data);
    } catch (err) {
        console.error(err);
    }
    res.status(200).json({ name: 'generate.js' });
};