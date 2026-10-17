# Autonomous GitHub Push & LinkedIn DevLog Rule

Whenever the user requests to "ship it", "push to github", "post on linkedin", "publish updates", or wrap up a completed feature:

## 1. GitHub Autonomous Execution
1. **Audit Changes**: Inspect `git status` to ensure only intended, clean files are staged. Never stage `.env`, build caches, or sensitive artifacts.
2. **Stage**: Run `git add <files>`.
3. **Commit**: Create a professional Conventional Commit message:
   - Format: `<type>(<scope>): <concise summary>` (e.g., `feat(ui)`, `fix(api)`, `perf(render)`)
   - Include 2–4 descriptive bullet points highlighting key decisions and improvements.
4. **Push**: Execute `git push origin <active-branch>` directly in the shell so the user doesn't have to touch the terminal.
5. **Report**: Return the commit summary and push status clearly to the user.

## 2. LinkedIn Showcase & DevLog Kit
1. **Visual Asset**:
   - Capture a high-resolution, clean screenshot of the live component/page or relevant execution.
   - Save the image to the project workspace (e.g., `./public/showcase/` or `./screenshots/`).
2. **Draft the Post**:
   - **The Hook**: Strong 1–2 line opener that grabs attention without being overly cliché.
   - **Technical Deep-Dive**: Explain the problem solved, architectural choices, and technical trade-offs.
   - **Learnings & Growth**: Show engineering mindset and curiosity (tailored for recruiters and peers).
   - **Call-to-Action (CTA)**: Invite feedback, share the GitHub repo and live demo link.
   - **Strategic Hashtags**: Relevant industry and technology tags (e.g., `#BuildInPublic`, `#NextJS`, `#SoftwareEngineering`, `#WebDevelopment`).
3. **Delivery**:
   - Present the exact caption in a clean copyable code block.
   - Provide the exact saved path to the screenshot image so the user can drag-and-drop or upload it to LinkedIn in seconds.
