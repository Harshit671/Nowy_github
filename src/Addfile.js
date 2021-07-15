import React from 'react'
import { Octogit } from "octogit";
import { promises as fsp } from "fs";
import { join } from "path";

const Addfile = () => {
    const add = async () => {
        const octogit = await Octogit.create({
            token: "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",
            owner: "harshit67",
            repo: "name1",
        });

        const branch = octogit.getBranch("some-branch");
        await branch.create();
        await fsp.writeFile(join(octogit.directory, 'some-file.txt'), 'some content');
        await branch.addAndCommit("Commit message...");
        await branch.push();

        const pr = await branch.createPullRequest({
            base: octogit.getBranch("main"),
            title: `Pull Request Title...`,
        });

        await pr.merge.merge();
    }
    return (
        <div>
            <button onClick={() => add()}>add</button>
        </div>
    )
}

export default Addfile
