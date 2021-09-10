export default (req, res) => {
    const { Octokit } = require("@octokit/rest");
    const { Base64 } = require("js-base64");
    const fs = require("fs");

    require("dotenv").config();

    const octokit = new Octokit({
    auth: process.env.GITHUB_ACCESS_TOKEN,
    });

    const main = async () => {
    try {
        const content = fs.readFileSync("../../input.txt", "utf-8");
        const contentEncoded = Base64.encode(content);

        const { data } = await octokit.repos.createOrUpdateFileContents({
        // replace the owner and email with your own details
        owner: "apuembot",
        repo: "github-file-gen-example",
        path: "g/OUTPUT.md",
        message: "feat: Added OUTPUT.md programatically",
        content: contentEncoded,
        committer: {
            name: `apuembot`,
            email: "apuembot@protonmail.com",
        },
        author: {
            name: "apuembot",
            email: "apuembot@protonmail.com",
        },
        });

        console.log(data);
    } catch (err) {
        console.error(err);
    }
    };

    main();
    res.status(200).json({ name: 'generate.js' });
};